"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...form, 
          rememberMe 
        }),
      });

      const data = await res.json();
      if (data.success) {
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
                <svg
                  className="h-10 w-10 text-blue-600"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4C12.95 4 4 7.25 4 11.27C4 14.01 8.16 16.4 14.31 17.64C8.16 18.88 4 21.26 4 24C4 26.74 8.16 29.12 14.31 30.36C8.16 31.6 4 33.99 4 36.73C4 40.75 12.95 44 24 44C35.05 44 44 40.75 44 36.73C44 33.99 39.84 31.6 33.69 30.36C39.84 29.12 44 26.74 44 24C44 21.26 39.84 18.88 33.69 17.64C39.84 16.4 44 14.01 44 11.27C44 7.25 35.05 4 24 4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M24 18C28.42 18 32 16.21 32 14C32 11.79 28.42 10 24 10C19.58 10 16 11.79 16 14C16 16.21 19.58 18 24 18Z"
                    fill="#10b981"
                  ></path>
                  <path
                    d="M24 30C28.42 30 32 28.21 32 26C32 23.79 28.42 22 24 22C19.58 22 16 23.79 16 26C16 28.21 19.58 30 24 30Z"
                    fill="#f59e0b"
                  ></path>
                </svg>
                <h1 className="ml-3 text-2xl font-bold tracking-tighter text-gray-900">
                  DeepLearn Points
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