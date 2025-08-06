"use client";

import { useState } from "react";
import { Geist } from "next/font/google";
import Sidebar from '@/components/Sidebar';
const geist = Geist({ subsets: ["latin"] });

export default function PointsPage() {
  const [activeTab, setActiveTab] = useState("OAU");

  return (
    <Sidebar>
    <div 
      className={`w-full min-h-screen p-8 bg-white/80 backdrop-blur-sm ${geist.className}`}
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        fontFamily: "'Lexend', 'Noto Sans', sans-serif"
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Points Breakdown Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Your Points Breakdown
          </h2>
          <div className="space-y-4">
            {/* Explanation Card */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white rounded-full p-2">
                  <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.43,169.45l-80-56a8,8,0,0,0-8.86,0l-80,56A8,8,0,0,0,48,176v40a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V176A8,8,0,0,0,224.43,169.45ZM64,184.76l64-44.79,64,44.79V208H64Z"></path>
                    <path d="M128,144,32,80,45.31,70.16,128,124.51,210.69,70.16,224,80Z"></path>
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">Explanation (Video)</p>
              </div>
              <p className="text-lg font-bold text-green-500">+50 pts</p>
            </div>
            
            {/* Connection Card */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229.66,114.34l-80-80a8,8,0,0,0-11.32,0l-80,80a8,8,0,0,0,11.32,11.32L112,83.31V208a8,8,0,0,0,16,0V83.31l42.34,42.35a8,8,0,0,0,11.32-11.32Z"></path>
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">Connection (Research)</p>
              </div>
              <p className="text-lg font-bold text-green-500">+200 pts</p>
            </div>
            
            {/* Solution Card */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 text-white rounded-full p-2">
                  <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M239.3,95.07,175.45,86.3,145,28.43a15.93,15.93,0,0,0-28.06,0L86.55,86.3,22.7,95.07a16,16,0,0,0-8.83,27.32l46.2,45-10.92,63.48a16,16,0,0,0,23.22,16.88L128,218.4l55.62,29.25a16,16,0,0,0,23.22-16.88L196.13,167.4l46.2-45A16,16,0,0,0,239.3,95.07Zm-16,14.6-46.2,45a16,16,0,0,0-4.6,14.1l10.92,63.48-55.62-29.25a16,16,0,0,0-14.6,0L57.58,232.25l10.92-63.48a16,16,0,0,0-4.6-14.1l-46.2-45,63.75-9.28a16,16,0,0,0,12-8.7L128,40.15l34.85,59.54a16,16,0,0,0,12,8.7Z"></path>
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">Solution (Real Implementation)</p>
              </div>
              <p className="text-lg font-bold text-green-500">+500 pts</p>
            </div>
          </div>
        </div>
        
        {/* Leaderboard Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Leaderboard</h2>
            <div className="mt-4">
              <div className="flex border-b border-gray-200">
                <button 
                  className={`flex-1 py-3 text-center text-sm font-bold border-b-2 ${activeTab === "OAU" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}
                  onClick={() => setActiveTab("OAU")}
                >
                  OAU
                </button>
                <button 
                  className={`flex-1 py-3 text-center text-sm font-medium border-b-2 ${activeTab === "UNILAG" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}
                  onClick={() => setActiveTab("UNILAG")}
                >
                  UNILAG
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-bold" scope="col">Rank</th>
                  <th className="px-6 py-3 font-bold" scope="col">Student</th>
                  <th className="px-6 py-3 font-bold text-right" scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-yellow-500 text-lg">1</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Aisha Adebayo</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">1250</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-400 text-lg">2</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Chukwudi Okoro</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">1100</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-yellow-600 text-lg">3</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Fatima Hassan</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">1050</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-500">4</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Emeka Nwosu</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">980</td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-500">5</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Ngozi Eze</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 text-right">920</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Sidebar>
  );
}


