"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { setCart, refreshAuthStatus } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, guestCart }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      refreshAuthStatus();
      localStorage.removeItem("cart");

      setCart(data.cart);
      alert("Login successful!");
      const isAdmin = data.user.role === "admin";
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-white rounded-full">
            {/* <svg
              viewBox="0 0 100 100"
              className="w-12 h-12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="50"
                y="65"
                textAnchor="middle"
                className="text-4xl font-bold"
                fill="black"
              >
                XY
              </text>
            </svg> */}
            <img src="logo.png" className="rounded-2xl"/>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wider mb-1">
            Mr. Xy Caps
          </h1>
          <p className="text-gray-400 text-sm">Welcome back</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                         bg-white text-black placeholder-gray-400
                         focus:border-black focus:outline-none focus:ring-0
                         transition-colors duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                         bg-white text-black placeholder-gray-400
                         focus:border-black focus:outline-none focus:ring-0
                         transition-colors duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin(e);
                  }
                }}
                required
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-6 bg-black text-white py-3.5 rounded-lg font-semibold
                     hover:bg-gray-800 active:scale-[0.98]
                     transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-black font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8">
          © 2024 Mr. Xy Caps. All rights reserved.
        </p>
      </div>
    </div>
  );
}