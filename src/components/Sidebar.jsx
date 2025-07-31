"use client";
import React from 'react';
import { useUser } from '@/context/UserContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = ({ children }) => {
  const { user, loading } = useUser();
  const pathname = usePathname();

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
  

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-50 p-6 flex flex-col z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center size-10 bg-[#4677b8] rounded-full text-white font-bold text-lg">
            <span>DL</span>
          </div>
          <span className="text-xl font-bold text-gray-900">DeepLearn</span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          <Link 
            href="/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === '/dashboard'
                ? 'bg-[#4677b8]/10 text-[#4677b8]'
                : 'text-gray-500 hover:bg-[#4677b8]/5'
            }`}
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
            </svg>
            <span className="text-sm font-medium">Home</span>
          </Link>
          
          <Link 
            href="/ai"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === '/ai-tutor'
                ? 'bg-[#4677b8]/10 text-[#4677b8]'
                : 'text-gray-500 hover:bg-[#4677b8]/5'
            }`}
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
            </svg>
            <span className="text-sm font-medium">AI Tutor</span>
          </Link>
          
          <Link 
            href="/tasks"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === '/tasks'
                ? 'bg-[#4677b8]/10 text-[#4677b8]'
                : 'text-gray-500 hover:bg-[#4677b8]/5'
            }`}
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
            </svg>
            <span className="text-sm font-medium">Tasks</span>
          </Link>
          
          <Link 
            href="/rewards"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === '/rewards'
                ? 'bg-[#4677b8]/10 text-[#4677b8]'
                : 'text-gray-500 hover:bg-[#4677b8]/5'
            }`}
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
            </svg>
            <span className="text-sm font-medium">Points</span>
          </Link>
          
          <Link 
            href="/marketplace"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === '/marketplace'
                ? 'bg-[#4677b8]/10 text-[#4677b8]'
                : 'text-gray-500 hover:bg-[#4677b8]/5'
            }`}
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-48,0v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm-8-72a24,24,0,0,1-24-24v-8h48v8A24,24,0,0,1,192,136Z"></path>
            </svg>
            <span className="text-sm font-medium">Marketplace</span>
          </Link>
        </nav>
        
        {/* Profile Section */}
        <div className="mt-auto pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-amber-500" 
                  style={{ backgroundImage: `url(${user.profileImage || '/default-avatar.png'})` }}
                ></div>
                <div className="flex flex-col">
                  <h3 className="text-gray-900 text-sm font-medium">{user.name}</h3>
                  <p className="text-gray-500 text-xs capitalize">{user.role}</p>
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-sm">Loading profile...</div>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen bg-white adinkra-bg">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;