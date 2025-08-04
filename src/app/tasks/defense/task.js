"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import OralDefense from '@/components/OralDefense';

export default function DefensePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get('attemptId');
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/tasks/defense?attemptId=${attemptId}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        // Fallback questions
        setQuestions([
          "Explain your approach to solving this problem?",
          "What alternative methods did you consider?",
          "How would you extend this solution?"
        ]);
      }
    };
    
    if (attemptId) fetchQuestions();
  }, [attemptId]);

  const submitAnswers = async (answers) => {
    try {
      const response = await fetch('/api/tasks/defense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          answers,
          userId: session.user.id
        })
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to submit answers');
    }
  };

  return (
    <Sidebar>
      <div className="p-2">
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <main className="container mx-auto px-2 py-8">
            <OralDefense 
              questions={questions} 
              onSubmit={submitAnswers} 
            />
          </main>
        </div>
      </div>
    </Sidebar>
  );
}