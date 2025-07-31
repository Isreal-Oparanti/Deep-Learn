"use client";
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useUser } from '@/context/UserContext.jsx';

export default function AITutorPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Initial greeting when user loads the page
  useEffect(() => {
    if (user && messages.length === 0) {
      const greeting = {
        id: Date.now(),
        sender: 'ai',
        text: `Hey ${user.name.split(' ')[0]}, what would you like to learn today? I can help explain concepts, generate practice questions, or create personalized learning paths.`,
      };
      setMessages([greeting]);
    }
  }, [user, messages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'd be happy to help with that! Here's an explanation...",
        // Could include additional data like graphs, resources, etc.
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Sidebar>
        <div className="p-8">

    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
          >
            {message.sender === 'ai' && (
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center border-2 border-green-500 flex-shrink-0">
                <span className="text-green-800 font-bold">AI</span>
              </div>
            )}
            
            <div
              className={`max-w-[80%] md:max-w-lg rounded-2xl px-4 py-3 shadow-md ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-900 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              
              {/* Example of additional AI content */}
              {message.sender === 'ai' && message.id !== messages[0]?.id && (
                <div className="mt-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Visual Explanation</h3>
                    <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center text-gray-500">
                      Interactive Graph Placeholder
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-gray-600">
                      <button className="text-blue-600 hover:text-blue-800">
                        Show more
                      </button>
                      <button className="flex items-center gap-1 text-amber-600">
                        <span>Earn 5 points</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {message.sender === 'user' && user && (
              <div 
                className="w-10 h-10 rounded-full bg-cover border-2 border-blue-500 flex-shrink-0"
                style={{ backgroundImage: `url(${user.profileImage || '/default-avatar.png'})` }}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about machine learning..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md"
          >
            Send
          </button>
        </form>
        
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100">
            Explain neural networks
          </button>
          <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100">
            Give me a practice problem
          </button>
          <button className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100">
            Create a study plan
          </button>
        </div>
      </div>
    </div>
    
    </div>
    </Sidebar>    
  );
}