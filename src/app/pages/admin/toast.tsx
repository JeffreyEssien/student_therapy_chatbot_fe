"use client";

import { PhoneCall, X } from "lucide-react";

interface ToastProps {
  studentName: string;
  studentPhone: string;
  onConfirm: () => void;
  onDismiss: () => void; // Added for manual dismissal
}

export default function Toast({ studentName, studentPhone, onConfirm, onDismiss }: ToastProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg border max-w-xs">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Student Details</h3>
        <button onClick={onDismiss} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-700">Name: {studentName}</p>
      <p className="text-gray-700">Phone: {studentPhone}</p>
      <button
        onClick={onConfirm}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
      >
        <PhoneCall className="w-5 h-5" /> Confirm Resolved
      </button>
    </div>
  );
}