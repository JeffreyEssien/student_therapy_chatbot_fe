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

interface ResolvedReportsProps {
  reports: Report[];
  onResolve: (id: number) => void;
}

export default function ResolvedReports({ reports, onResolve }: ResolvedReportsProps) {
  const resolvedReports = reports.filter((report) => report.status === "Resolved");

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Resolved Reports</h2>
      {resolvedReports.length === 0 ? (
        <p className="text-gray-500 text-center">No resolved reports available</p>
      ) : (
        <div className="space-y-4">
          {resolvedReports.map((report) => (
            <ReportCard key={report.id} report={report} onResolve={onResolve} />
          ))}
        </div>
      )}
    </div>
  );
}