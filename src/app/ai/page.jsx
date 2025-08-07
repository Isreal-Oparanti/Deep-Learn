"use client";
import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/context/AuthContext';
import { FiSend, FiBookOpen, FiAlertCircle, FiArrowUp } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';

export default function AITutorPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (user && messages.length === 0) {
      const greeting = {
        id: Date.now(),
        sender: 'ai',
        text: `Welcome ${user.name.split(' ')[0]}! I'm your AI Tutor at DeepLearn Points. 🎓\n\nWhat would you like to explore today? I can help with:\n- Understanding complex concepts\n- Solving practice problems\n- Preparing for exams\n- Creating study plans\n\nAsk me anything!`,
        resources: []
      };
      setMessages([greeting]);
    }
  }, [user, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setError('');
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      resources: []
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.details || data.error);
      
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.response,
        resources: data.resources
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || "I'm having trouble with that request. Please try again.");
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'm having some technical difficulties. Could you please rephrase your question or try again later?",
        resources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    setTimeout(() => {
      if (document.getElementById('chat-form')) {
        document.getElementById('chat-form').dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true })
        );
      }
    }, 100);
  };

  return (
    <Sidebar>
      <div
        className={`w-full min-h-screen p-8 bg-white/80 backdrop-blur-sm`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          fontFamily: "'Lexend', 'Noto Sans', sans-serif",
        }}
      >
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              {message.sender === 'ai' && (
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-300 flex-shrink-0">
                  <span className="text-blue-700 font-bold text-sm">AI</span>
                </div>
              )}
              
              <div
                className={`max-w-[90%] md:max-w-2xl rounded-2xl px-4 py-3 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-gray-50 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.sender === 'ai' ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        h1: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                        h2: ({node, ...props}) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />,
                        h3: ({node, ...props}) => <h5 className="text-sm font-bold mt-2 mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}) => <em className="italic" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3" {...props} />,
                        code: ({node, inline, ...props}) => inline ?
                          <code className="bg-gray-200 px-1.5 py-0.5 rounded font-mono text-sm" {...props} /> :
                          <pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto text-sm my-3" {...props} />,
                        table: ({node, ...props}) => <div className="overflow-x-auto"><table className="min-w-full border-collapse" {...props} /></div>,
                        th: ({node, ...props}) => <th className="border px-4 py-2 text-left bg-gray-100" {...props} />,
                        td: ({node, ...props}) => <td className="border px-4 py-2" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{message.text}</div>
                )}

                {message.sender === 'ai' && message.resources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FiBookOpen className="text-blue-500" />
                      <span>Learning Resources</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {message.resources.map((resource, index) => (
                        <li key={index} className="flex">
                          <div className="bg-blue-100 rounded-full p-1.5 mr-2 flex items-center justify-center">
                            <div className="bg-blue-500 rounded-full w-1.5 h-1.5"></div>
                          </div>
                          <a 
                            href={resource.startsWith('http') ? resource : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate"
                          >
                            {resource}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {message.sender === 'user' && user && (
                <div 
                  className="w-10 h-10 rounded-full bg-cover border-2 border-blue-500 flex-shrink-0"
                  style={{ 
                    backgroundImage: `url(${user.profileImage || '/default-avatar.png'})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-300 flex-shrink-0">
                <span className="text-blue-700 font-bold text-sm">AI</span>
              </div>
              <div className="max-w-[90%] md:max-w-2xl rounded-2xl rounded-tl-none px-4 py-3 bg-gray-50">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100 max-w-md">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-inner">
          <form id="chat-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-3xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about machine learning, statistics, or data science..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-2 rounded-full transition-all shadow disabled:opacity-70"
              >
                <FiArrowUp className="text-xl" />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {[
                "Explain multicollinearity using Nigeria's inflation data.",
                "Create a practice problem about linear regression with Nigerian economic data.",
                "Create a study plan for learning machine learning fundamentals in 4 weeks."
              ].map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(text)}
                  className="text-xs bg-white text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
                >
                  {text.split('.')[0]}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}
