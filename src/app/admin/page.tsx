"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Toaster } from "react-hot-toast"; // Import Toaster
import EscalatedReports from "../admin/escalatedReports";
import ResolvedReports from "../admin/resolvedReports";

interface Report {
  id: number;
  date: string;
  message: string;
  status: "Pending" | "Resolved";
  studentName: string;
  studentPhone: string;
}

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      date: "2025-02-16 10:30 AM",
      message: "🚨 Urgent: Student experiencing severe anxiety",
      status: "Pending",
      studentName: "Alice Johnson",
      studentPhone: "+1-555-123-4567",
    },
    {
      id: 2,
      date: "2025-02-16 11:00 AM",
      message: "🤖 Student reporting issues with response accuracy",
      status: "Pending",
      studentName: "Bob Smith",
      studentPhone: "+1-555-987-6543",
    },
    {
      id: 3,
      date: "2025-02-16 5:00 PM",
      message: "🤖 student reporting issues with family problems",
      status: "Pending",
      studentName: "Charlie Davis",
      studentPhone: "+1-555-555-5555",
    },
  ]);

  const markAsResolved = (id: number) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: "Resolved" } : report
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <AlertCircle className="text-red-600 w-6 h-6 sm:w-8 sm:h-8" /> Admin Dashboard
      </h1>
      <div className="flex flex-col w-full gap-6 md:flex-row md:gap-10 md:px-10">
        <div className="w-full md:w-1/2">
          <EscalatedReports reports={reports} onResolve={markAsResolved} />
        </div>
        <div className="w-full md:w-1/2">
          <ResolvedReports reports={reports} onResolve={markAsResolved} />
        </div>
      </div>
      <Toaster position="top-right" /> {/* Add Toaster here */}
    </div>
  );
}