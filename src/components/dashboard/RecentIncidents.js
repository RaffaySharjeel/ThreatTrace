
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  ExternalLink,
  Filter,
} from "lucide-react";

const incidents = [
  {
    id: "INC-001",
    title: "Phishing Campaign Detected",
    category: "Phishing",
    severity: "Critical",
    assignee: "Raffay",
    status: "Open",
    date: "Nov 03, 2026",
  },
  {
    id: "INC-002",
    title: "Suspicious Login Attempt",
    category: "Unauthorized Access",
    severity: "High",
    assignee: "Ahmed",
    status: "Investigating",
    date: "Nov 03, 2026",
  },
  {
    id: "INC-003",
    title: "Malware Detection",
    category: "Malware",
    severity: "Medium",
    assignee: "Ali",
    status: "Resolved",
    date: "Nov 02, 2026",
  },
  {
    id: "INC-004",
    title: "Unusual Network Traffic",
    category: "Network Anomaly",
    severity: "High",
    assignee: "Raffay",
    status: "Investigating",
    date: "Nov 02, 2026",
  },
  {
    id: "INC-005",
    title: "Suspicious Domain Activity",
    category: "Malicious Domain",
    severity: "Low",
    assignee: "Sara",
    status: "Open",
    date: "Nov 01, 2026",
  },
];

const severityStyles = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

const statusStyles = {
  Open: "bg-blue-500/10 text-blue-400",
  Investigating: "bg-purple-500/10 text-purple-400",
  Resolved: "bg-green-500/10 text-green-400",
};

export default function RecentIncidents() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(search.toLowerCase()) ||
      incident.id.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity =
      severity === "All" || incident.severity === severity;

    return matchesSearch && matchesSeverity;
  });

  return (
    <section className="surface overflow-hidden">
      {/* Header */}
      <div className="p-5 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="font-semibold text-base">Recent Security Incidents</h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor and manage recently detected incidents
          </p>
        </div>

        <Link
          href="/incidents"
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          View all incidents
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Filters */}
      <div className="px-5 pb-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 flex-1 min-w-[180px]">
          <Search size={16} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm py-2 w-full text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-3 bg-slate-900">
          <Filter size={15} className="text-slate-400" />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="bg-transparent text-sm text-slate-300 py-2 outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-900/70 border-y border-slate-800">
            <tr className="text-xs text-slate-500">
              <th className="px-5 py-4 font-medium">INCIDENT</th>
              <th className="px-5 py-4 font-medium">SEVERITY</th>
              <th className="px-5 py-4 font-medium">ASSIGNED TO</th>
              <th className="px-5 py-4 font-medium">STATUS</th>
              <th className="px-5 py-4 font-medium">DATE</th>
              <th className="px-5 py-4 font-medium">ACTION</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {filteredIncidents.map((incident) => (
              <tr
                key={incident.id}
                className="hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-200">
                    {incident.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {incident.id} · {incident.category}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md border ${
                      severityStyles[incident.severity]
                    }`}
                  >
                    {incident.severity}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-400">
                  {incident.assignee}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md ${
                      statusStyles[incident.status]
                    }`}
                  >
                    {incident.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-xs text-slate-400">
                  {incident.date}
                </td>

                <td className="px-5 py-4">
                  <Link
                    href={`/incidents/${incident.id}`}
                    className="text-blue-400 hover:text-blue-300"
                    title="View incident"
                  >
                    <ExternalLink size={16} />
                  </Link>
                </td>
              </tr>
            ))}

            {filteredIncidents.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-sm text-slate-500">
                  No matching incidents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500">
        Showing {filteredIncidents.length} of {incidents.length} incidents
      </div>
    </section>
  );
}
