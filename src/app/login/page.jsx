"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    session: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/dashboard");
    } else {
      setError(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Email or Matric Number"
        value={form.identifier}
        onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        required
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
        className="w-full border p-2"
      />
      <input
        type="text"
        placeholder="Session (e.g. 2021/22)"
        value={form.session}
        onChange={(e) => setForm({ ...form, session: e.target.value })}
        required
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
