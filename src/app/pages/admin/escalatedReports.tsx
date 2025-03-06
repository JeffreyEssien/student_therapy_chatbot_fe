"use client";

import ReportCard from "../admin/reportCard";

interface Report {
  id: number;
  date: string;
  message: string;
  status: "Pending" | "Resolved";
  studentName: string;
  studentPhone: string;
}

interface EscalatedReportsProps {
  reports: Report[];
  onResolve: (id: number) => void;
}

export default function EscalatedReports({ reports, onResolve }: EscalatedReportsProps) {
  const pendingReports = reports.filter((report) => report.status === "Pending");

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg border mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Escalated Reports</h2>
      {pendingReports.length === 0 ? (
        <p className="text-gray-500 text-center">No escalated reports available</p>
      ) : (
        <div className="space-y-4">
          {pendingReports.map((report) => (
            <ReportCard key={report.id} report={report} onResolve={onResolve} />
          ))}
        </div>
      )}
    </div>
  );
}