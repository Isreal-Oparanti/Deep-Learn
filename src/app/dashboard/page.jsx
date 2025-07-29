"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFetchUser = async () => {
    try {
      const res = await fetch("/api/login");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
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

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {user ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Matric Number: {user.matricNumber}</p>
          {user.session && <p>Session: {user.session}</p>}
          {user.course && <p>Course: {user.course}</p>}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Page;
