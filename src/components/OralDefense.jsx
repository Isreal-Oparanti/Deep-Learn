"use client";
import { useState, useEffect, useCallback } from 'react';

export default function OralDefense({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [score, setScore] = useState(null);
  
  // Initialize answers when questions change
  useEffect(() => {
    setAnswers(Array(questions.length).fill(''));
    setCurrentQuestionIndex(0);
    setScore(null);
  }, [questions]);

  // Automatically speak questions when they load or change
  useEffect(() => {
    if (questions.length > 0 && !isSpeaking) {
      speakCurrentQuestion();
    }
  }, [currentQuestionIndex, questions]);

  const speakCurrentQuestion = useCallback(() => {
    if (questions[currentQuestionIndex] && !isSpeaking) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.error('Speech synthesis error');
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestionIndex, questions, isSpeaking]);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsEvaluating(true);
    try {
      // Filter out empty answers
      const filteredAnswers = answers.filter(a => a?.trim() !== '');
      
      // Call the onSubmit prop from DefensePage
      const result = await onSubmit(filteredAnswers);
      
      // Set the score from the API response
      setScore(result.score);
    } catch (error) {
      console.error('Evaluation failed:', error);
      alert(error.message || 'Failed to submit answers. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Cancel speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {score !== null ? (
        <div className="text-center py-8">
          <div className="text-5xl font-bold text-emerald-600 mb-4">
            {score}%
          </div>
          <p className="text-lg mb-6">
            {score >= 80
              ? "Excellent understanding! Full points awarded."
              : score >= 50
              ? "Good effort! Partial points awarded."
              : "Needs more understanding. Please review the material."}
          </p>
          <button
            onClick={() => window.location.href = '/rewards'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Rewards
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Oral Defense</h2>
          
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              {isSpeaking ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-5 bg-blue-500 rounded animate-bounce"></div>
                  <div className="w-2 h-7 bg-blue-500 rounded animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-4 bg-blue-500 rounded animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              ) : (
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
              <p className="ml-2 font-medium text-blue-700">
                {isSpeaking 
                  ? "AI is asking a question..." 
                  : "Question ready"}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded border border-blue-200 min-h-[60px] flex items-center">
              {questions[currentQuestionIndex]}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your response:
            </label>
            <textarea
              value={answers[currentQuestionIndex] || ""}
              onChange={handleAnswerChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Explain your approach..."
            />
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={speakCurrentQuestion}
              disabled={isSpeaking}
              className={`px-4 py-2 rounded-md transition-colors ${
                isSpeaking
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSpeaking ? "Asking..." : "Re-ask Question"}
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={isEvaluating || !answers[currentQuestionIndex]?.trim()}
              className={`px-4 py-2 rounded-md transition-colors ${
                isEvaluating || !answers[currentQuestionIndex]?.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : isEvaluating
                ? "Evaluating..."
                : "Submit Answers"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}