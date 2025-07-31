"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    matricNumber: "",
    course: "",
    organization: "", // New field for guest users
    position: "",    // New field for guest users
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Password validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Role-specific validation
      if (formData.role === "student") {
        if (!formData.matricNumber || !formData.course) {
          throw new Error("Matric number and course are required for students");
        }
      } else if (formData.role === "guest") {
        if (!formData.organization) {
          throw new Error("Organization is required for guests");
        }
      }

      // API call to register user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Redirect after successful registration
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
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
              />
              <path
                d="M24 18C28.42 18 32 16.21 32 14C32 11.79 28.42 10 24 10C19.58 10 16 11.79 16 14C16 16.21 19.58 18 24 18Z"
                fill="#10b981"
              />
              <path
                d="M24 30C28.42 30 32 28.21 32 26C32 23.79 28.42 22 24 22C19.58 22 16 23.79 16 26C16 28.21 19.58 30 24 30Z"
                fill="#f59e0b"
              />
            </svg>
            <h1 className="ml-3 text-2xl font-bold tracking-tighter text-gray-900">
              DeepLearn Points
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your Account</h2>
          <p className="mt-2 text-base text-gray-500">
            Where Knowledge Becomes Currency
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            minLength={6}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
          >
            <option value="student">Student</option>
            <option value="guest">Guest (Educator/Professional)</option>
          </select>

          {formData.role === "student" ? (
            <>
              <input
                name="matricNumber"
                placeholder="Matric Number"
                value={formData.matricNumber}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
              />
              <input
                name="course"
                placeholder="Course of Study"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
              />
            </>
          ) : (
            <>
              <input
                name="organization"
                placeholder="Organization/Institution"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
              />
              <input
                name="position"
                placeholder="Position/Role (Optional)"
                value={formData.position}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
              />
            </>
          )}

          {error && (
            <div className="text-red-500 text-sm font-medium p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 px-5 bg-blue-600 text-white font-bold text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              className="font-medium text-emerald-500 hover:text-emerald-700"
              href="/login"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}