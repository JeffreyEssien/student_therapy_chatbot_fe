"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Calendar, Book, Hash, ArrowRight } from "lucide-react";
import Toast from "../signup/toast"; // Adjust the path based on your file structure

interface SignupFormData {
  fullName: string;
  studentEmail: string;
  phoneNumber: string;
  dateOfBirth: string;
  department: string;
  matricNumber: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    studentEmail: "",
    phoneNumber: "",
    dateOfBirth: "",
    department: "",
    matricNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@student\.babcock\.edu\.ng$/; // Regex for @student.babcock.edu.ng emails

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setToast(null); // Clear toast on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

    // Validation
    if (!emailRegex.test(formData.studentEmail)) {
      setToast({ message: "Please use a valid @student.babcock.edu.ng email.", type: "error" });
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: "Passwords do not match.", type: "error" });
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setToast({ message: "Password must be at least 8 characters long.", type: "error" });
      setIsLoading(false);
      return;
    }
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      setToast({ message: "Phone number must be 11 digits.", type: "error" });
      setIsLoading(false);
      return;
    }
    if (!formData.fullName.trim() || !formData.department.trim() || !formData.matricNumber.trim()) {
      setToast({ message: "All fields are required.", type: "error" });
      setIsLoading(false);
      return;
    }

    // Simulate API call (replace with actual signup logic)
    try {
      console.log("Signing up with:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setToast({ message: "Signup successful! Redirecting to login...", type: "success" });
      setTimeout(() => router.push("/pages/login"), 1500); // Delay redirect to show toast
    } catch (err) {
      setToast({ message: "Signup failed. Please try again.", type: "error" });
      setIsLoading(false);
    }
  };

  const handleToastClose = () => {
    setToast(null);
    setIsLoading(false); // Ensure loading state resets after toast closes
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-fade-in">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 animate-slide-up">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-text-pop">
          Join Chatmate!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="studentEmail"
              placeholder="Student Email (e.g., name@student.babcock.edu.ng)"
              value={formData.studentEmail}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (e.g., 08012345678)"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="matricNumber"
              placeholder="Matric Number"
              value={formData.matricNumber}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 animate-input-focus"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed animate-bounce-slow"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span> Signing up...
              </>
            ) : (
              <>
                Sign Up <ArrowRight className="w-5 h-5 animate-arrow-move" />
              </>
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 animate-fade-in-delay">
          Already have an account?{" "}
          <a href="/pages/login" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200">
            Login
          </a>
        </p>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
}