"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courseOptions } from "@/utils/courseOptions";

export default function SurveyPage() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [customCourse, setCustomCourse] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleFetchUser = async () => {
    try {
      const res = await fetch("/api/login");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);

        const mainCourse = data.user.course?.toLowerCase();
        const recommended = courseOptions.filter((course) =>
          course.toLowerCase().includes(mainCourse.split(" ")[0])
        );

        setFilteredCourses(
          recommended.length > 0 ? recommended : courseOptions.slice(0, 20)
        );
      } else {
        console.warn("User fetch failed:", data.message);
      }
    } catch (error) {
      console.error("Unable to fetch user", error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  function toggleCourse(course) {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const coursesToSave = customCourse
        ? [...selectedCourses, customCourse.toUpperCase()]
        : selectedCourses;

      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedCourses: coursesToSave }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        alert(data.message || "Failed to save courses");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Select Your Courses</h1>

      {user && (
        <p className="mb-4 text-gray-600">
          Recommended courses based on your program:{" "}
          <span className="font-semibold">{user.course}</span>
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto mb-4 border p-2 rounded">
        {filteredCourses.map((course) => (
          <button
            key={course}
            onClick={() => toggleCourse(course)}
            className={`p-2 rounded border ${
              selectedCourses.includes(course)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {course}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="customCourse" className="block mb-1 font-medium">
          Add Custom Course Code
        </label>
        <input
          type="text"
          id="customCourse"
          value={customCourse}
          onChange={(e) => setCustomCourse(e.target.value)}
          placeholder="e.g. NEW101"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        disabled={loading || (selectedCourses.length === 0 && !customCourse)}
        onClick={handleSubmit}
        className={`w-full py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Saving..." : "Save Courses"}
      </button>
    </div>
  );
}
