"use client";
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function OralDefense({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [score, setScore] = useState(null);
  const { speak, cancel } = useSpeechSynthesis();

  const speakQuestion = () => {
    if (questions[currentQuestionIndex]) {
      setIsSpeaking(true);
      speak({
        text: questions[currentQuestionIndex],
        onEnd: () => setIsSpeaking(false)
      });
    }
  };

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const submitAnswers = async () => {
    setIsEvaluating(true);
    try {
      const response = await onSubmit(
        Object.values(answers).filter(a => a !== undefined)
      );
      setScore(response.score);
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Cancel speech when component unmounts
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

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
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
                {isSpeaking ? "AI is asking a question..." : "Question ready"}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded border border-blue-200">
              {questions[currentQuestionIndex] || "Loading question..."}
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
              onClick={speakQuestion}
              disabled={isSpeaking || !questions[currentQuestionIndex]}
              className={`px-4 py-2 rounded-md ${
                isSpeaking || !questions[currentQuestionIndex]
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSpeaking ? "Asking..." : "Ask Question"}
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={isEvaluating}
              className={`px-4 py-2 rounded-md ${
                isEvaluating
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