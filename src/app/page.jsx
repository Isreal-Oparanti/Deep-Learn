import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans bg-[#f8f9fa] text-[#343a40] min-h-screen relative overflow-x-hidden">
      {/* Background Pattern - Defined in globals.css */}
      <div className="adinkra-bg">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-[#001f3f]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
              </svg>
              <h2 className="text-[#001f3f] text-2xl font-bold tracking-tighter">DeepLearn Points</h2>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-base font-medium hover:text-[#2ecc71] transition-colors" href="#">About</a>
              <a className="text-base font-medium hover:text-[#2ecc71] transition-colors" href="#">How it Works</a>
              <a className="text-base font-medium hover:text-[#2ecc71] transition-colors" href="#">Rewards</a>
              <a className="text-base font-medium hover:text-[#2ecc71] transition-colors" href="#">Contact</a>
            </nav>
            
            <div className="flex items-center gap-3">
              <button className="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-transparent text-[#001f3f] text-base font-bold leading-normal tracking-wide border-2 border-[#001f3f] hover:bg-[#001f3f] hover:text-white transition-all duration-300">
                <a href="/login"><span className="truncate">Login</span></a>
              </button>
              <button className="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-5 bg-[#4677B8] text-white text-base font-bold leading-normal tracking-wide shadow-lg hover:shadow-xl hover:bg-[#ffd700] hover:text-[#001f3f] transition-all duration-300">
                <a href="/register"><span className="truncate">Sign Up</span></a>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9OKFwxgvOGuvonCap0iaHBWgYaSW2X5SwFwx7e-JwS4AuDYwza9mv19aefMDgaMSf-WCso1CmQrZbikWlhVKXfs9iRoUtMVc2nOd3NpiO7hXx6kEf-xyP80aAsyUsHVu-84GOAms2KDHiUzOBWIkrv7QGm0StkRJRkWp-R6z4ommRRq8fP-sUy0veQjc8Enh2pWW4FkEbWTvc9zLoQkj-FOC7r1JrdWF33hIP8V9sbrvmXqm7EVpGe6oE4wWMWjCICxWbhAZ1lco")` }}
          ></div>
          <div className="absolute inset-0 bg-[#001f3f] opacity-70"></div>
          
          <div className="relative z-10 text-center px-4 py-20 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
              Where Knowledge Becomes
              <span className="text-[#ffd700]"> Currency</span>.
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl font-light mb-8 text-gray-200">
              Earn verifiable learning points by applying your skills to real-world challenges. Powered by AI, designed for impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-[#4677B8] text-[#fff] text-lg font-bold leading-normal tracking-wide shadow-lg hover:shadow-xl hover:bg-[#ffd700] transition-all duration-300 transform hover:scale-105">
                <span className="truncate">Start Earning</span>
              </button>
              <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-transparent text-white text-lg font-bold leading-normal tracking-wide border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#001f3f] transition-all duration-300 transform hover:scale-105">
                <span className="truncate">Learn More</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#001f3f] mb-4">
                Unlock Your Potential
              </h2>
              <p className="text-lg text-gray-600">DeepLearn Points transforms your learning journey into a rewarding experience.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="mb-5 p-4 rounded-full bg-[#2ecc71] text-white">
                  <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">AI-Powered Learning</h3>
                <p className="text-gray-600">Leverage cutting-edge AI to personalize your learning path and maximize your skill development.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="mb-5 p-4 rounded-full bg-[#2ecc71] text-white">
                  <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Real-World Task Application</h3>
                <p className="text-gray-600">Apply your knowledge to solve real-world problems, gaining practical experience and making a tangible impact.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="mb-5 p-4 rounded-full bg-[#2ecc71] text-white">
                  <svg fill="currentColor" height="36px" viewBox="0 0 256 256" width="36px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#001f3f] mb-2">Redeemable Rewards</h3>
                <p className="text-gray-600">Convert your learning points into exciting rewards, from educational resources to exclusive experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 adinkra-bg">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#001f3f] mb-4">
                Join the DeepLearn Points Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Embark on a journey where your knowledge is valued and your contributions make a difference.
              </p>
              <button className="flex mx-auto min-w-[150px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-[#2ecc71] text-[#001f3f] text-lg font-bold leading-normal tracking-wide shadow-lg hover:shadow-xl hover:bg-[#ffd700] transition-all duration-300 transform hover:scale-105">
                <span className="truncate">Get Started for Free</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#001f3f] text-white">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <p className="text-lg font-bold">DeepLearn Points</p>
                <p className="text-sm text-gray-400">© 2024. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <a className="text-base font-medium text-gray-300 hover:text-[#ffd700] transition-colors" href="#">Privacy Policy</a>
                <a className="text-base font-medium text-gray-300 hover:text-[#ffd700] transition-colors" href="#">Terms of Service</a>
                <a className="text-base font-medium text-gray-300 hover:text-[#ffd700] transition-colors" href="#">Contact Us</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}