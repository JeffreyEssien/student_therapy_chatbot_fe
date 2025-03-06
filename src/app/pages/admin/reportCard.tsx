"use client";

import { CheckCircle, Clock, MessageCircle, PhoneCall } from "lucide-react";
import { toast } from "react-hot-toast";
import Toast from "../admin/toast"; // Adjust path as needed

interface Report {
  id: number;
  date: string;
  message: string;
  status: "Pending" | "Resolved";
  studentName: string;
  studentPhone: string;
}

interface ReportCardProps {
  report: Report;
  onResolve: (id: number) => void;
}

export default function ReportCard({ report, onResolve }: ReportCardProps) {
  const handleResolveClick = () => {
    toast(
      (t) => (
        <Toast
          studentName={report.studentName}
          studentPhone={report.studentPhone}
          onConfirm={() => {
            onResolve(report.id);
            toast.dismiss(t.id);
            toast.success("Student contacted successfully!");
          }}
          onDismiss={() => toast.dismiss(t.id)} // Dismiss without resolving
        />
      ),
      {
        duration: Infinity, // Stays open until explicitly dismissed
        position: "top-center", // Center for visibility, adjust as needed
      }
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-50 flex items-center gap-4">
      <MessageCircle className="text-blue-500 w-6 h-6" />
      <div className="flex-1">
        <p className="text-gray-800 font-semibold">{report.message}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" /> {report.date}
        </p>
        <p
          className={`text-sm font-medium flex items-center gap-1 ${
            report.status === "Pending" ? "text-red-600" : "text-green-600"
          }`}
        >
          <CheckCircle
            className={report.status === "Pending" ? "text-red-600" : "text-green-600"}
          />
          Status: {report.status}
        </p>
      </div>
      {report.status === "Pending" && (
        <button
          onClick={handleResolveClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <PhoneCall className="w-5 h-5" /> Resolve Problem
        </button>
      )}
    </div>
  );
}