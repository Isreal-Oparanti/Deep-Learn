// app/rewards/page.jsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RewardsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const rewards = [
    {
      id: 1,
      category: 'academic',
      title: 'Meet VC for Mentorship',
      description: 'Gain invaluable insights from a top university leader.',
      points: 1000,
      image: '/images/vc-mentorship.jpg',
      popular: true
    },
    {
      id: 2,
      category: 'career',
      title: 'PwC Nigeria Shadow Day',
      description: 'Experience a day in the life at a leading professional services firm.',
      points: 2500,
      image: '/images/pwc-shadow.jpg'
    },
    {
      id: 3,
      category: 'funding',
      title: '₦100k Research Grant',
      description: 'Secure funding for your innovative research project.',
      points: 5000,
      image: '/images/research-grant.jpg',
      popular: true
    },
    {
      id: 4,
      category: 'academic',
      title: 'Exclusive Library Access',
      description: 'Get premium access to academic journals and research papers.',
      points: 800,
      image: '/images/library-access.jpg'
    },
    {
      id: 5,
      category: 'career',
      title: 'Tech Industry Networking Event',
      description: 'Connect with top tech professionals and recruiters.',
      points: 1800,
      image: '/images/networking-event.jpg'
    },
    {
      id: 6,
      category: 'funding',
      title: 'Startup Seed Funding',
      description: 'Get initial funding for your innovative startup idea.',
      points: 7500,
      image: '/images/startup-funding.jpg'
    }
  ];

  const filteredRewards = activeFilter === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="text-white" fill="none" height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tighter text-slate-900">DeepLearn Points</h1>
              <p className="text-xs font-medium text-slate-500 -mt-1">Where Knowledge Becomes Currency</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-blue-600">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cover bg-center bg-gray-200 border-2 border-blue-500"></div>
              <div className="hidden flex-col text-right sm:flex">
                <span className="text-sm font-semibold">Tunde Adebayo</span>
                <span className="text-xs text-amber-500 font-bold">12,345 pts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Rewards Marketplace
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Redeem your DeepLearn Points for exclusive opportunities and experiences
          </motion.p>
          
          <div className="mt-8 flex justify-center">
            <div className="relative bg-white rounded-xl p-1 inline-flex shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl -z-10 blur-md opacity-30"></div>
              <div className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-white">
                <span className="material-symbols-outlined mr-2">workspace_premium</span>
                <span className="font-bold">12,345 Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 pb-4">
          <span className="text-sm font-medium text-slate-500">Filter by:</span>
          {['all', 'academic', 'career', 'funding'].map((filter) => (
            <motion.button
              key={filter}
              className={`flex h-10 items-center justify-center gap-x-2 rounded-lg px-4 shadow-sm transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:shadow-md'
              }`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-sm font-medium capitalize">
                {filter === 'all' ? 'All Categories' : filter}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Rewards Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredRewards.map((reward) => (
              <motion.div
                key={reward.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -10 }}
                layout
              >
                {reward.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${reward.image})` }}
                  ></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white px-2 py-1 bg-blue-600 rounded">
                      {reward.category}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white">{reward.title}</h3>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-slate-600 flex-1">{reward.description}</p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-amber-500 mr-1">star</span>
                      <span className="text-lg font-bold text-amber-500">
                        {reward.points.toLocaleString()} pts
                      </span>
                    </div>
                    
                    <motion.button 
                      className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Redeem
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredRewards.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center text-gray-400">
              <span className="material-symbols-outlined text-3xl">inventory</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No rewards found</h3>
            <p className="mt-2 text-gray-500">Try selecting a different category</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setActiveFilter('all')}
            >
              View All Rewards
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="text-white" fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold">DeepLearn Points</h2>
                <p className="text-xs text-slate-500">Where Knowledge Becomes Currency</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-slate-600 hover:text-blue-600">Terms</a>
              <a href="#" className="text-slate-600 hover:text-blue-600">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-blue-600">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} DeepLearn Points. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RewardsPage;