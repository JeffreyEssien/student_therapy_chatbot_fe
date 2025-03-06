"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.email.includes("@") || formData.password.length < 6) {
      setError("Please enter a valid email and a password with at least 6 characters.");
      setIsLoading(false);
      return;
    }

    // Simulate an API call (replace with actual authentication logic)
    try {
      console.log("Logging in with:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      router.push("/pages/chatbot");
    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fade-in">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105 animate-slide-up">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-text-pop">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center animate-fade-in">{error}</p>
          )}
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed animate-bounce-slow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span> Logging in...
              </>
            ) : (
              <>
                Login <span className="animate-arrow-move">➔</span>
              </>
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 animate-fade-in-delay">
          Don’t have an account?{" "}
          <a href="/pages/signup" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}