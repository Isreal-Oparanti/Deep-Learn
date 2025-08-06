"use client";

import { useState } from "react";
import { Geist } from "next/font/google";
import Sidebar from "@/components/Sidebar";
const geist = Geist({ subsets: ["latin"] });

export default function PointsPage() {
  const [activeTab, setActiveTab] = useState("OAU");

  return (
    <Sidebar>
 
 <div
        className={`w-full min-h-screen p-8 bg-white/80 backdrop-blur-sm ${geist.className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          fontFamily: "'Lexend', 'Noto Sans', sans-serif",
        }}
      >
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
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 border-t border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-bold" scope="col">Rank</th>
                    <th className="px-6 py-3 font-bold" scope="col">Student</th>
                    <th className="px-6 py-3 font-bold text-right" scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Aisha Adebayo", 1250, "text-yellow-500 text-lg"],
                    ["2", "Chukwudi Okoro", 1100, "text-gray-400 text-lg"],
                    ["3", "Fatima Hassan", 1050, "text-yellow-600 text-lg"],
                    ["4", "Emeka Nwosu", 980, "text-gray-500"],
                    ["5", "Ngozi Eze", 920, "text-gray-500"],
                  ].map(([rank, name, points, rankClass], i) => (
                    <tr key={i} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <td className={`px-6 py-4 font-bold ${rankClass}`}>{rank}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{name}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-right">{points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

    </Sidebar>
  );
}
