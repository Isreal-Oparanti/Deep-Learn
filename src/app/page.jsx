"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section for scroll indicator
      const sections = ['home', 'features', 'rewards'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY < element.offsetTop + element.offsetHeight / 2) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-[#343a40] min-h-screen relative overflow-x-hidden">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

     
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-300" 
           style={{ width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}>
      </div>

     
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-[#001f3f] text-2xl font-bold tracking-tighter">DeepLearn Points</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['About', 'How it Works', 'Rewards', 'Contact'].map((item) => (
              <a 
                key={item}
                className="text-base font-medium hover:text-blue-600 transition-colors relative group" 
                href="#"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="group relative flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-transparent text-[#001f3f] text-base font-bold leading-normal tracking-wide border-3 border-[#001f3f] transition-all duration-300">
              <a href="/login">
                <span className="relative z-10 truncate">Login</span>
                {/* <span className="absolute inset-0 bg-[#001f3f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span> */}
                {/* <span className="absolute inset-0 text-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left truncate">Login</span> */}
              </a>
            </button>
            <button className="relative flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base font-bold leading-normal tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <a href="/register">
                <span className="truncate">Sign Up</span>
                {/* <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></span> */}
              </a>
            </button>
          </div>
        </div>
      </header>

      
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-white overflow-hidden">
      
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9OKFwxgvOGuvonCap0iaHBWgYaSW2X5SwFwx7e-JwS4AuDYwza9mv19aefMDgaMSf-WCso1CmQrZbikWlhVKXfs9iRoUtMVc2nOd3NpiO7hXx6kEf-xyP80aAsyUsHVu-84GOAms2KDHiUzOBWIkrv7QGm0StkRJRkWp-R6z4ommRRq8fP-sUy0veQjc8Enh2pWW4FkEbWTvc9zLoQkj-FOC7r1JrdWF33hIP8V9sbrvmXqm7EVpGe6oE4wWMWjCICxWbhAZ1lco")` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
          
         
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 py-20 flex flex-col items-center max-w-5xl">
          <div className="mb-6 inline-block px-7 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide animate-pulse">
             NEW: AI-Powered Learning Rewards Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 animate-fade-in">
            Where Knowledge Becomes
            <span className="block mt-2">
              <span className="relative">
                <span className="absolute inset-0 bg-yellow-400 transform -rotate-2 z-0"></span>
                <span className="relative z-10 text-blue-900">Currency</span>
              </span>
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-2xl md:text-xl font-light mb-10 text-blue-100 animate-fade-in-up">
            Earn verifiable learning points by applying your skills to real-world challenges. Powered by AI, designed for impact.
          </p>
          
          <div className="flex flex-wrap gap-5 justify-center mb-12">
            <button className="group relative flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold leading-normal tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 truncate">Start Earning</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
            <button className="group relative flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent text-white text-lg font-bold leading-normal tracking-wide border-2 border-white/30 hover:border-white transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 truncate">Learn More</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
          
          <div className="flex items-center gap-8 text-blue-200 text-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>AI-powered</span>
            </div>
          </div>
        </div>
        
       
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50 relative">
         
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-blue-50 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-7 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#001f3f] mb-4">
              Unlock Your Potential
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              DeepLearn Points transforms your learning journey into a rewarding experience with these powerful features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
           
            <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative mb-5 p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001f3f] mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">Leverage cutting-edge AI to personalize your learning path and maximize your skill development.</p>
              <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
            
           
            <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative mb-5 p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001f3f] mb-2">Real-World Task Application</h3>
              <p className="text-gray-600">Apply your knowledge to solve real-world problems, gaining practical experience and making a tangible impact.</p>
              <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
            
           
            <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative mb-5 p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001f3f] mb-2">Redeemable Rewards</h3>
              <p className="text-gray-600">Convert your learning points into exciting rewards, from educational resources to exclusive experiences.</p>
              <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10K+", label: "Active Learners" },
              { value: "50+", label: "Expert Mentors" },
              { value: "500+", label: "Learning Tasks" },
              { value: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="rewards" className="py-20 md:py-32 relative overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] bg-repeat"></div>
        </div>
       
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block px-7 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
              JOIN THE REVOLUTION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
              Join the DeepLearn Points Community
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Embark on a journey where your knowledge is valued and your contributions make a difference.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-10 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Free forever for learners</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-white/30"></div>
                <div className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>AI-powered recommendations</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-white/30"></div>
                <div className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Real rewards for real skills</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-bold leading-normal tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 truncate">Get Started for Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </button>
              <button className="group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent text-white text-lg font-bold leading-normal tracking-wide border-2 border-white/30 hover:border-white transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 truncate">View Rewards</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-7 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#001f3f] mb-4">
              What Our Learners Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of learners who are already earning rewards for their knowledge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Data Science Student",
                content: "DeepLearn Points transformed my learning journey. I've earned enough points to get a premium data science course while building my portfolio!",
                avatar: "AJ"
              },
              {
                name: "Samira Khan",
                role: "UX Designer",
                content: "The real-world tasks helped me bridge the gap between theory and practice. Plus, redeeming points for design tools was a game-changer!",
                avatar: "SK"
              },
              {
                name: "Michael Chen",
                role: "Software Developer",
                content: "I've learned more in 3 months with DeepLearn Points than in a year of traditional courses. The AI recommendations are spot-on!",
                avatar: "MC"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[#001f3f]">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="text-gray-600 italic">
                  "{testimonial.content}"
                </div>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001f3f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold tracking-tighter">DeepLearn Points</h2>
              </div>
              <p className="text-blue-200 mb-6 max-w-md">
                Transform your knowledge into currency. Earn points by learning, apply skills to real-world challenges, and redeem exciting rewards.
              </p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <div className="w-5 h-5 bg-blue-300 rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Rewards', 'Blog', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-blue-800/50 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-blue-300">© 2025 DeepLearn Points. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a className="text-sm text-blue-300 hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-blue-300 hover:text-white transition-colors" href="#">Terms of Service</a>
              <a className="text-sm text-blue-300 hover:text-white transition-colors" href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}