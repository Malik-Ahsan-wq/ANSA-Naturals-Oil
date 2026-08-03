"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-zinc-100">
        <div className="flex justify-center mb-6">
          <div className="bg-zinc-100 p-4 rounded-full">
            <FaLock className="text-3xl text-zinc-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-zinc-900 mb-2">Admin Access</h1>
        <p className="text-center text-zinc-500 mb-6">Please enter the password to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
              placeholder="Enter password"
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
