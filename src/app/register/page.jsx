"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "guest",
    matricNumber: "",
    course: "",
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
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (
        formData.role === "student" &&
        (!formData.matricNumber || !formData.course)
      ) {
        throw new Error("Matric number and course are required for students");
      }

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

      window.location.href = "/survey";
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          minLength={6}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          minLength={6}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="guest">Guest</option>
          <option value="student">Student</option>
        </select>
      </div>

      {formData.role === "student" && (
        <>
          <div className="space-y-2">
            <label htmlFor="matricNumber" className="block text-sm font-medium">
              Matric Number
            </label>
            <input
              id="matricNumber"
              name="matricNumber"
              value={formData.matricNumber}
              onChange={handleChange}
              placeholder="Enter your matric number"
              required={formData.role === "student"}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="block text-sm font-medium">
              Course of Study
            </label>
            <input
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter your course (e.g., Computer Science)"
              required={formData.role === "student"}
              className="w-full p-2 border rounded"
            />
          </div>
        </>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded text-white ${
          isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
