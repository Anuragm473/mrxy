"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const { setCart, refreshAuthStatus } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, guestCart }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      refreshAuthStatus();
      localStorage.removeItem("cart");

      setCart(data.cart);
      alert("Signup successful!");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-6 
                 bg-white text-black shadow rounded 
                 dark:bg-gray-900 dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="First Name"
        className="w-full border p-2 mb-3 rounded 
                   bg-gray-50 text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        className="w-full border p-2 mb-3 rounded 
                   bg-gray-50 text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded 
                   bg-gray-50 text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-3 rounded 
                   bg-gray-50 text-black 
                   dark:bg-gray-800 dark:text-white dark:border-gray-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 
                   dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black"
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
