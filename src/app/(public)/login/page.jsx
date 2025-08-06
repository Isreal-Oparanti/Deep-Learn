"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useUser();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...form, 
          rememberMe 
        }),
      });

      const data = await res.json();
      if (data.success) {
        login(data.user); // Store user in context
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center mb-4">
              <svg className="text-blue-600" fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
                <h1 className="ml-3 text-blue-400 text-2xl font-bold tracking-tighter text-gray-900">
                  DeepLearn 
                </h1>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
              <p className="mt-2 text-base text-gray-500">
                Login to access your learning dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="identifier"
                >
                  Email or Student ID
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="e.g., student@university.edu.ng"
                  value={form.identifier}
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                  required
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                />
              </div>
              
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label
                    className="ml-2 block text-sm text-gray-500"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    className="font-medium text-blue-600 hover:text-blue-700"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm font-medium p-2 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 px-5 bg-blue-600 text-white font-bold text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a
                  className="font-medium text-emerald-500 hover:text-emerald-700"
                  href="/register"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 DeepLearn Points. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}