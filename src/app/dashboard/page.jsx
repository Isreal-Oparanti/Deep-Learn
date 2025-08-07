"use client";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const newChart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: [
            "Problem Solving",
            "Critical Thinking", 
            "Data Analysis",
            "Communication",
            "Project Management",
            "UI/UX Design",
          ],
          datasets: [
            {
              label: "Skill Mastery",
              data: [85, 70, 90, 75, 60, 80],
              backgroundColor: "hsl(var(--primary) / 0.2)",
              borderColor: "hsl(var(--primary))",
              pointBackgroundColor: "hsl(var(--primary))",
              pointBorderColor: "hsl(var(--background))",
              pointHoverBackgroundColor: "hsl(var(--background))",
              pointHoverBorderColor: "hsl(var(--primary))",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 3,
            },
          },
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                backdropColor: "transparent",
                stepSize: 25,
              },
              pointLabels: {
                font: {
                  size: 12,
                  family: "system-ui, sans-serif",
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      chartInstanceRef.current = newChart;
    }
   
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []); 

  return (
    
      <Sidebar>
        <div
        className={`w-full min-h-screen p-8 bg-white/80 backdrop-blur-sm `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          fontFamily: "'Lexend', 'Noto Sans', sans-serif",
        }}
      >
      <div className="flex-1 overflow-y-auto">
         
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Welcome Banner */}
              <div className=" p-6 rounded-2xl flex items-center gap-6 shadow-sm border border-slate-200">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 shrink-0" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDvWPt7JrEkh0jPnYSj1eI910Xs-vJW8MxFTl-O7eiIOaEWTbrNcvu5hU7idcGClgCissYwn4-agUrArlYzYk4__dke6lCFjX0BMcz7MSpITyWtuL8WK0QpTjgw0NpT1d1Ji1Fewl0lu0CWWQNXqBqJdpgk5HbSThRrpHjjZxp8RkGo3EuY_IRNoaDsL85GDzMsUWSk_m9OPa_HzCPiag3npEaZcyIu2X5cWvu8WuLwAKbYRkjckB2BapMrXKo_xBoi3MLfy2gpU8')" }}
                ></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, Isreal!</h2>
                  <p className="text-gray-500">University of Lagos</p>
                  <div className="mt-4 bg-[#4677b8]/10 p-4 rounded-xl">
                    <p className="text-sm font-medium text-[#4677b8]">Total DeepLearn Points</p>
                    <p className="text-3xl font-bold text-[#4677b8]">50</p>
                  </div>
                </div>
              </div>
              
              {/* Learning Progress */}
              <div className="p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Progress</h3>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold text-gray-900">75%</p>
                  <div className="flex items-center text-[#07883b]">
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,164.69V40a8,8,0,0,1,16,0V164.69l42.34-42.35a8,8,0,0,1,11.32,11.32Z" transform="scale(1, -1) translate(0, -256)"></path>
                    </svg>
                    <span className="text-base font-medium">+10%</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-2">in the last 30 days</p>
                </div>
                <div className="mt-4 h-48">
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
              
              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="#" 
                  className="bg-green-100/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border-2 border-dashed border-green-200 hover:border-green-400 transition-colors"
                >
                  <div className="p-3 bg-green-200 rounded-full mb-3">
                    <svg className="text-green-700" fill="none" height="32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                  </div>
                  <h4 className="font-bold text-green-800">Submit a Task</h4>
                  <p className="text-sm text-green-700">Showcase your skills</p>
                </a>
                
                <a 
                  href="#" 
                  className="bg-blue-100/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors"
                >
                  <div className="p-3 bg-blue-200 rounded-full mb-3">
                    <svg className="text-blue-700" fill="none" height="32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m12 14 4-4"></path>
                      <path d="m18 10-4 4"></path>
                      <path d="M12 2a3.5 3.5 0 0 0-3.5 3.5v0a3.5 3.5 0 0 0 2 3.23"></path>
                      <path d="M12 2a3.5 3.5 0 0 1 3.5 3.5v0a3.5 3.5 0 0 1-2 3.23"></path>
                      <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z"></path>
                      <path d="M12 18v2"></path>
                      <path d="M6 18v2"></path>
                      <path d="M18 18v2"></path>
                    </svg>
                  </div>
                  <h4 className="font-bold text-blue-800">Chat with AI Tutor</h4>
                  <p className="text-sm text-blue-700">Get instant help</p>
                </a>
              </div>
            </div>
            
            {/* Right Column (1/3 width on large screens) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Recent Activity */}
              <div className="p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-green-100 shrink-0 size-12 text-green-600">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Data Analysis Project</p>
                      <p className="text-sm text-gray-500">Completed Task</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-purple-100 shrink-0 size-12 text-purple-600">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Gift Card</p>
                      <p className="text-sm text-gray-500">Redeemed Points</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-yellow-100 shrink-0 size-12 text-yellow-600">
                      <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Problem Solving Challenge</p>
                      <p className="text-sm text-gray-500">Earned Points</p>
                    </div>
                  </div>
                </div>
              </div>  
              
              {/* Inspiration Card */}
              {/* <div 
                className="p-6 rounded-2xl bg-cover bg-center min-h-[200px] flex items-end" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5YI0mhD56v3Z3wiGtEM0OompiTY4tBKrZg0GzMQsR9BA09H_s3UPAZxjQS8ZcY7L19KwtiQFGWus_0wdgHYUS2HXb5xE-p9mWh_SL54M4AtmHAg6e00efaWoIYso4a0g8nQWtr_7RL4F1Tk46squZCdIiPNhq5u61eRJZB-WVjKY2xQb7T7Fbf2ZVvtPqbhbH3-BZeX3ozslXzhQ2HqQaUwDxEXQSQ8zjbu_Bwqkg6Ne_BhzVK742Qzt7Aqg8dhrdMcj5xhztEC4')" }}
              >
                <div className="bg-black/50 p-6 rounded-xl text-white w-full">
                  <h3 className="font-bold text-lg">Nigerian Design Inspiration</h3>
                  <p className="text-sm mt-1">This design subtly incorporates patterns and textures inspired by Nigerian art and textiles, creating a unique and culturally rich user experience.</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
 
    </Sidebar>
  );
}