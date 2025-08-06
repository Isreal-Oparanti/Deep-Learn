"use client";
import { useState } from "react";
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function TasksPage() {
  // Sample tasks - in real app these would come from your database
  const tasks = [
    { id: 1, title: "Linear Regression", difficulty: "Medium", points: 100 },
    { id: 2, title: "Neural Networks", difficulty: "Hard", points: 200 },
    { id: 3, title: "Data Preprocessing", difficulty: "Easy", points: 50 },
  ];

  return (
    <Sidebar>
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Tasks</h1>
          <p className="text-gray-600 mb-8">
            Select a task to demonstrate your understanding and earn points. 
            Each task requires verification through dual camera recording and oral defense.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-800' 
                        : task.difficulty === 'Medium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {task.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-2 font-bold">{task.points} pts</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    Demonstrate your understanding of {task.title} through a recorded explanation and oral defense.
                  </p>
                  
                  <Link 
                    href={`/tasks/verification?taskId=${task.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
                  >
                    Start Task
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}