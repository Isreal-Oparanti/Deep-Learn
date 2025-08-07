"use client";
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Gift,
  Target,
  Bell,
  Search,
  Settings,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/AuthContext';

export default function Sidebar({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useUser();
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
          Where Knowledge Becomes Currency 
        </p>
      </div>
    );
  }

  const navigationItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
        icon: MessageSquare,
        label: 'AI Tutor',
        href: '/ai'
      },
      {
        icon: Target,
        label: 'Challenges',
        href: '/tasks',
        // badge: 'New'
      },
      {
        icon: Gift,
        label: 'Rewards',
        href: '/rewards',
        badge: '3'
      },
      {
        icon: Trophy,
        label: 'Leaderboard',
        href: '/leaderboard'
      },
      {
        icon: Users,
        label: 'Community',
        href: '/community'
      },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-3 rounded-full">
              <div className="size-5 rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-bold">P</div>
              </div>
              
            </div>
            
            <div className="size-10 rounded-full bg-cover bg-center" 
                 style={{ backgroundImage: `url(${user?.profileImage || '/default-avatar.png'})` }}>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                    <div className="text-white font-bold text-lg">DL</div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-gray-900">DeepLearn Points</h1>
                    <p className="text-xs text-gray-500 -mt-1">Knowledge is Currency</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="p-4">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="size-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.badge === 'New' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
              
              {/* User Profile */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 rounded-full bg-cover bg-center ring-2 ring-blue-300" 
                       style={{ backgroundImage: `url(${user?.profileImage || '/default-avatar.png'})` }}>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user?.name || 'Guest'}</h3>
                    <p className="text-xs text-gray-500">{user?.matricNumber || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                    <span>Level {user?.level || 1}</span>
                  </div>
                  <span className="font-semibold">#{user?.rank || 'N/A'}</span>
                </div>
              </div>
              
              {/* Weekly Goal */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Weekly Goal</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points Earned</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {Math.min(2000, points).toLocaleString()}/2,000
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2 rounded-full"
                      style={{ width: `${Math.min(100, points / 2000 * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {points < 2000 
                      ? `${(2000 - points).toLocaleString()} points to go!` 
                      : 'Goal achieved! 🎉'}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <div className="mt-6">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="size-5" />
                  <span className="flex-1">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar - Changed background to white */}
        <div className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-gray-900">
              <svg className="text-blue-600" fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <div>
                <h1 className="text-blue-600 text-xl font-bold">DeepLearn</h1>
                <p className="text-xs text-gray-500 font-medium">Where Knowledge Becomes Currency</p>
              </div>
            </div>
              </div>
            </div>
            
            {/* User Profile - Using actual user data */}
            <div className="mt-8 px-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="relative">
                  <div className="size-12 rounded-full bg-cover bg-center ring-2 ring-blue-300" 
                       style={{ backgroundImage: `url(${user?.profileImage || '/default-avatar.png'})` }}>
                  </div>
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{user?.name || 'Guest'}</h3>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.matricNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="size-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.badge === 'New' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
            
            {/* Weekly Goal */}
            <div className="mt-auto px-6 py-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Weekly Goal</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points Earned</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {Math.min(1000, user?.points).toLocaleString()}/1,000
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2 rounded-full"
                      style={{ width: `${Math.min(100, user?.points / 1000 * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {user?.points < 1000 
                      ? `${(1000 - user?.points).toLocaleString()} points to go!` 
                      : 'Goal achieved! 🎉'}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <div className="mt-4 ">
                <button
                  onClick={logout}
                  className="flex cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 items-left justify-left gap-3 w-full px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  
                  <span className="flex-1 text-left">Logout</span>
                  <LogOut className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Updated margin to match new sidebar width */}
        <div className="flex-1 md:ml-80">
          {/* Desktop Header */}
          <header className="sticky p-3 top-0 z-40 hidden md:flex w-full bg-white border-b border-gray-200">
            <div className="flex-1 px-6">
              <div className="flex items-center justify-between h-16">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search courses, challenges, rewards..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="ml-4 flex items-center gap-4">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                  </button>
                  
                  <div className="flex items-center gap-2 bg-blue-100 px-4 py-3 rounded-full">
                    <div className="size-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                      <div className="text-white text-xs font-bold">P</div>
                    </div>
                    <span className="text-sm font-semibold text-blue-800">
                      {user.points +" pts"}
                    </span>
                  </div>
                  
                  <div className="ml-3 relative">
                    <div>
                      <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span className="sr-only">Open user menu</span>
                        <div className="size-8 rounded-full bg-cover bg-center" 
                             style={{ backgroundImage: `url(${user?.profileImage || '/default-avatar.png'})` }}>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}