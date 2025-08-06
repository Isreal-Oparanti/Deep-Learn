"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";

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
      image: '/images/research-grant.jpg'
    }
  ];

  return (
    <Sidebar>
      <div className="bg-[#f8f9fb] text-[#0e131b] min-h-screen">
        {/* Background pattern - Fixed to prevent blocking clicks */}
        <div className="fixed inset-0 z-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10">
          <main className="container mx-auto flex-1 px-4 py-8 md:px-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Rewards Marketplace</h2>
              <p className="text-lg text-[#4a5568]">Redeem your DeepLearn Points for exclusive opportunities.</p>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-[#e8ebf3] pb-4">
              <span className="text-sm font-medium text-[#4a5568]">Filter by:</span>
              <button 
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white px-4 shadow-sm transition-all ${
                  activeFilter === 'all' 
                    ? 'shadow-md -translate-y-0.5' 
                    : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                <p className={`text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'font-semibold text-[#2563eb]' 
                    : 'text-[#4a5568]'
                }`}>All Categories</p>
              </button>
              <button 
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white px-4 shadow-sm transition-all ${
                  activeFilter === 'academic' 
                    ? 'shadow-md -translate-y-0.5' 
                    : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={() => setActiveFilter('academic')}
              >
                <p className={`text-sm font-medium ${
                  activeFilter === 'academic' 
                    ? 'font-semibold text-[#2563eb]' 
                    : 'text-[#4a5568]'
                }`}>Academic</p>
              </button>
              <button 
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white px-4 shadow-sm transition-all ${
                  activeFilter === 'career' 
                    ? 'shadow-md -translate-y-0.5' 
                    : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={() => setActiveFilter('career')}
              >
                <p className={`text-sm font-medium ${
                  activeFilter === 'career' 
                    ? 'font-semibold text-[#2563eb]' 
                    : 'text-[#4a5568]'
                }`}>Career</p>
              </button>
              <button 
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white px-4 shadow-sm transition-all ${
                  activeFilter === 'funding' 
                    ? 'shadow-md -translate-y-0.5' 
                    : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={() => setActiveFilter('funding')}
              >
                <p className={`text-sm font-medium ${
                  activeFilter === 'funding' 
                    ? 'font-semibold text-[#2563eb]' 
                    : 'text-[#4a5568]'
                }`}>Funding</p>
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Academic Reward */}
              <div className="flex transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="h-48 w-full bg-cover bg-center" style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCVxZfuPGxXw2teZw6VD9xwvDpQ7ybLaiWR6jbuNdD2Y41eqh7x5qaZW0eBFL_JkCuVII20R5tD5raJuvBWXjRfBpLAHNjSPuJYlgfTIZFnR25ctFX2aXXUo_VBUN0qIcWQP1owtxe61666unNlEU6C4F8NDYPuCu_JFBh_U_Fif9gatQQuAQU_rzRjVRuEnXS5cjzM_hbpsY0Tb-Ns_Uy4HF6gCeuDtIKTWRTfJSzmTKwoXJrOmpcvhI-QI1H-ix8UStigUnA6Kk")`
                }}></div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Academic</span>
                  <h3 className="mt-2 text-xl font-bold">Meet VC for Mentorship</h3>
                  <p className="mt-2 flex-1 text-sm text-[#4a5568]">Gain invaluable insights from a top university leader.</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#f59e0b]">1,000 pts</span>
                    <button className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-500">Redeem</button>
                  </div>
                </div>
              </div>
              
              {/* Career Reward */}
              <div className="flex transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="h-48 w-full bg-cover bg-center" style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBLEP9dxQMfGU9T5qTG_YScXQswPixdufdAgXymZoGqDuq-Vs1tMOCz7PZMsi3vEPifkFRRh6-b53XPf4_b2I9e9fbuztYD_qAtfT_47Fz9Hm-rFio5G8TM-Hk8AdqQgERBMP3ft2SyXd5ZzCOBHlOc5PiDdFVrZpy90H6H0L1YrFgKRWJIAYGV0eorw97P5Bit-_ZDwbUCBSt2fnWcs8T_QWrla0UNkyAK-1Yv9HzZw8kngqP_ay_6m1QK7ztya0aaWl9uucpRcw")`
                }}></div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Career</span>
                  <h3 className="mt-2 text-xl font-bold">PwC Nigeria Shadow Day</h3>
                  <p className="mt-2 flex-1 text-sm text-[#4a5568]">Experience a day in the life at a leading professional services firm.</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#f59e0b]">2,500 pts</span>
                    <button className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-500">Redeem</button>
                  </div>
                </div>
              </div>
              
              {/* Funding Reward */}
              <div className="flex transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="h-48 w-full bg-cover bg-center" style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9STiJr_Yd6NQ4o8zT-mfyGN_wB2tXhJS0XmTRnkD5_7Bf5wiql_yb7BbJQdNfuB_etuxtrfvAw7CzeOQqI7CKAPvD0FDV3wZz23abVrPIgre22o7Fy_mk3ayXbq8y5EoheYy3aG7jnoa4L048-UflESOZCmXEKdDeKoB-j11gVtJhQDqM60jKyUSCBM7dP-akOzQ_oZQsiejju1ZkuuEhTx2GBWrBfHy_TqL20NSf2iOTe9p7OVqXtDIOGV6XNpCed4vEIrkeCM4")`
                }}></div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Funding</span>
                  <h3 className="mt-2 text-xl font-bold">₦100k Research Grant</h3>
                  <p className="mt-2 flex-1 text-sm text-[#4a5568]">Secure funding for your innovative research project.</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#f59e0b]">5,000 pts</span>
                    <button className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-500">Redeem</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Sidebar>
  );
};

export default RewardsPage;