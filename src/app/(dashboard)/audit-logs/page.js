"use client";

import { useState } from "react";
import {
  ClipboardList, Search, PlusCircle, Pencil, Trash2,
  LogIn, Filter,
} from "lucide-react";

const logs = [
  { id: 1, user: "Alex Morgan", action: "Create", module: "Threats", details: "Added Phishing Attack", date: "2026-11-03", time: "10:42 AM" },
  { id: 2, user: "Sarah Khan", action: "Update", module: "Incidents", details: "Updated INC-002 status", date: "2026-11-03", time: "10:18 AM" },
  { id: 3, user: "John Smith", action: "Create", module: "Assets", details: "Added Web Server", date: "2026-11-02", time: "04:30 PM" },
  { id: 4, user: "Alex Morgan", action: "Delete", module: "Team", details: "Removed a team member", date: "2026-11-02", time: "02:15 PM" },
  { id: 5, user: "Emma Wilson", action: "Login", module: "Authentication", details: "User logged into ThreatTrace", date: "2026-11-02", time: "09:05 AM" },
  { id: 6, user: "Sarah Khan", action: "Update", module: "Investigations", details: "Updated INV-001", date: "2026-11-01", time: "11:20 AM" },
  { id: 7, user: "John Smith", action: "Create", module: "Reports", details: "Submitted a threat report", date: "2026-11-01", time: "10:10 AM" },
];

const actionStyles = {
  Create: "bg-emerald-500/10 text-emerald-400",
  Update: "bg-blue-500/10 text-blue-400",
  Delete: "bg-red-500/10 text-red-400",
  Login: "bg-purple-500/10 text-purple-400",
};

const actionIcons = {
  Create: PlusCircle,
  Update: Pencil,
  Delete: Trash2,
  Login: LogIn,
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesAction =
      actionFilter === "All" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const createCount = logs.filter((log) => log.action === "Create").length;
  const updateCount = logs.filter((log) => log.action === "Update").length;
  const deleteCount = logs.filter((log) => log.action === "Delete").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Audit Logs</h1>
        <p className="mt-1 text-sm text-gray-400">
          Track user activities and changes across ThreatTrace.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface rounded-xl border border-white/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total Activities</p>
            <ClipboardList size={19} className="text-blue-400" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{logs.length}</p>
        </div>

        {[
          { label: "Created Records", value: createCount, color: "text-emerald-400" },
          { label: "Updated Records", value: updateCount, color: "text-blue-400" },
          { label: "Deleted Records", value: deleteCount, color: "text-red-400" },
        ].map((item) => (
          <div key={item.label} className="surface rounded-xl border border-white/5 p-5">
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className={`mt-3 text-2xl font-semibold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Activity Table */}
      <div className="surface overflow-hidden rounded-xl border border-white/5">
        <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, module or activity..."
              className="w-full rounded-lg border border-white/10 bg-[#111827] py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-gray-300 outline-none"
            >
              <option>All</option>
              <option>Create</option>
              <option>Update</option>
              <option>Delete</option>
              <option>Login</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Action</th>
                <th className="px-5 py-4">Module</th>
                <th className="px-5 py-4">Details</th>
                <th className="px-5 py-4">Date & Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => {
                const Icon = actionIcons[log.action];

                return (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-medium text-white">{log.user}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${actionStyles[log.action]}`}>
                        <Icon size={13} />
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-300">{log.module}</td>
                    <td className="px-5 py-4 text-gray-400">{log.details}</td>
                    <td className="px-5 py-4">
                      <p className="text-gray-300">{log.date}</p>
                      <p className="mt-1 text-xs text-gray-500">{log.time}</p>
                    </td>
                  </tr>
                );
              })}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-gray-500">
                    No activity records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/5 px-5 py-3 text-xs text-gray-500">
          Showing {filteredLogs.length} of {logs.length} activity records
        </div>
      </div>
    </div>
  );
}