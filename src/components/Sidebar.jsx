"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiMessageSquare, FiList, FiAward, FiShoppingBag, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ children }) => {
  const { user, loading, logout } = useUser();
  console.log(user)
  const pathname = usePathname();
  const [points, setPoints] = useState(0);

  // Initialize points from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPoints = localStorage.getItem('userPoints');
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      }
    }
  }, []);

   if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
        <div className="relative w-16 h-16">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-16 w-16 bg-blue-600"></span>
        </div>
        <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">
          Loading DeepLearn...
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Where Knowledge Becomes Currency 💡
        </p>
      </div>
    );
  }


  const navigation = [
    { href: '/dashboard', label: 'Home', icon: <FiHome size={20} /> },
    { href: '/ai', label: 'AI Tutor', icon: <FiMessageSquare size={20} /> },
    { href: '/tasks', label: 'Tasks', icon: <FiList size={20} /> },
    { href: '/rewards', label: 'Points', icon: <FiAward size={20} /> },
    { href: '/community', label: 'Community', icon: <FiShoppingBag size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              DL
            </div>
            <span className="text-xl font-bold text-gray-900">DeepLearn</span>
          </div>
          
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Points Display */}
        <div className="mt-auto p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Your Points</span>
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 px-2.5 py-1 rounded-full">
              <FiAward className="text-amber-600" size={16} />
              <span className="text-amber-800 font-bold">{points}</span>
            </div>
          </div>
          
          {/* Profile Section */}
           {/* Profile Section */}
           <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-cover border-2 border-amber-500"
              style={{ 
                backgroundImage: `url(${user?.profileImage || '/default-avatar.png'})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 text-sm font-medium truncate">{user?.name || 'Guest'}</h3>
              <p className="text-gray-500 text-xs truncate capitalize">{user?.role || 'User'}</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden adinkra-bg">

        {children}
      </main>
    </div>
  );
};

export default Sidebar;