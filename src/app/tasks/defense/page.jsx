"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import OralDefense from '@/components/OralDefense';
import { useUser } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const FALLBACK_QUESTIONS = [
  "Explain your approach to solving this problem?",
  "What alternative methods did you consider?",
  "How would you extend this solution?"
];

export default function DefensePage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get attemptId from URL or localStorage
    const urlAttemptId = searchParams.get('attemptId');
    const storedAttemptId = localStorage.getItem('currentAttemptId');
    
    const id = urlAttemptId || storedAttemptId;
    
    if (!id) {
      console.error("No attemptId provided - redirecting");
      router.push('/tasks');
      return;
    }
    
    setAttemptId(id);
    localStorage.setItem('currentAttemptId', id); // Persist for refresh
    
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/tasks/defense?attemptId=${id}`);
        if (!response.ok) throw new Error('API response error');
        
        const data = await response.json();
        if (data?.questions?.length > 0) {
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setQuestions(FALLBACK_QUESTIONS);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [searchParams, router]);

  const submitAnswers = async (answers) => {
    try {
      console.log("Submitting with attemptId:", attemptId);
      
      if (!attemptId || !user?._id) {
        throw new Error(`Missing required data: ${!attemptId ? 'attemptId' : 'userId'}`);
      }
      
      const response = await fetch('/api/tasks/defense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          answers,
          userId: user._id
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }
      
      // Clear stored attemptId after successful submission
      localStorage.removeItem('currentAttemptId');
      
      return await response.json();
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  if (!attemptId || loading) {
    return (
      <Sidebar>
        <div className="p-2">
          <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-lg">
                {!attemptId ? "Loading task information..." : "Loading questions..."}
              </p>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }

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