
"use client";

import { useState } from "react";
import {
  Radar,
  AlertTriangle,
  Activity,
  Clock,
  Search,
  Plus,
  Filter,
  ShieldAlert,
  X,
  Eye,
} from "lucide-react";

const initialIndicators = [
  {
    id: "IOC-001",
    type: "IP Address",
    value: "192.0.2.45",
    severity: "Critical",
    confidence: 95,
    status: "Active",
    source: "Manual Entry",
  },
  {
    id: "IOC-002",
    type: "Domain",
    value: "malicious-example.test",
    severity: "High",
    confidence: 88,
    status: "Active",
    source: "Threat Feed",
  },
  {
    id: "IOC-003",
    type: "File Hash",
    value: "a1b2c3d4e5f67890",
    severity: "Medium",
    confidence: 76,
    status: "Active",
    source: "Manual Entry",
  },
  {
    id: "IOC-004",
    type: "URL",
    value: "https://example.test/login",
    severity: "High",
    confidence: 91,
    status: "Inactive",
    source: "Investigation",
  },
];

const severityStyles = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function ThreatsPage() {
  const [indicators, setIndicators] = useState(initialIndicators);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    type: "IP Address",
    value: "",
    severity: "Medium",
    confidence: "80",
    source: "Manual Entry",
  });

  const filtered = indicators.filter((item) => {
    const matchesSearch =
      item.value.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || item.type === typeFilter;

    const matchesSeverity =
      severityFilter === "All" || item.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const addIndicator = (e) => {
    e.preventDefault();

    if (!form.value.trim()) return;

    const newIndicator = {
      ...form,
      id: `IOC-${String(indicators.length + 1).padStart(3, "0")}`,
      confidence: Number(form.confidence),
      status: "Active",
    };

    setIndicators((prev) => [newIndicator, ...prev]);

    setForm({
      type: "IP Address",
      value: "",
      severity: "Medium",
      confidence: "80",
      source: "Manual Entry",
    });

    setShowForm(false);
  };

  const stats = [
    {
      title: "Total Indicators",
      value: indicators.length,
      icon: Radar,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Critical Threats",
      value: indicators.filter((i) => i.severity === "Critical").length,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Active Indicators",
      value: indicators.filter((i) => i.status === "Active").length,
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Added Today",
      value: indicators.length,
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <section className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <p className="text-sm text-blue-400 mb-2">
            SECURITY INTELLIGENCE
          </p>

          <h1 className="text-2xl md:text-3xl font-bold">
            Threat Intelligence
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Discover, track and manage indicators of compromise.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={17} />
          Add Indicator
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.title} className="surface p-5">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-5">
                {stat.value}
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Current recorded indicators
              </p>
            </div>
          );
        })}
      </section>

      {/* IOC Table */}
      <section className="surface overflow-hidden">

        <div className="p-5">
          <h2 className="font-semibold">
            Indicators of Compromise
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Manage suspicious IPs, domains, URLs and file hashes.
          </p>
        </div>

        {/* Filters */}
        <div className="px-5 pb-5 flex flex-wrap gap-3">

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 flex-1 min-w-[180px]">
            <Search size={16} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search indicators..."
              className="bg-transparent outline-none text-sm py-2 w-full"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3">
            <Filter size={15} className="text-slate-400" />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-300 py-2 outline-none"
            >
              <option value="All">All Types</option>
              <option value="IP Address">IP Address</option>
              <option value="Domain">Domain</option>
              <option value="URL">URL</option>
              <option value="File Hash">File Hash</option>
            </select>
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead className="bg-slate-900/70 border-y border-slate-800">
              <tr className="text-xs text-slate-500">
                <th className="px-5 py-4">INDICATOR ID</th>
                <th className="px-5 py-4">TYPE</th>
                <th className="px-5 py-4">INDICATOR VALUE</th>
                <th className="px-5 py-4">SEVERITY</th>
                <th className="px-5 py-4">CONFIDENCE</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">SOURCE</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-blue-400">
                    {item.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {item.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-200 font-mono">
                    {item.value}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md border ${severityStyles[item.severity]}`}>
                      {item.severity}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {item.confidence}%
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs ${item.status === "Active" ? "text-green-400" : "text-slate-500"}`}>
                      ● {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {item.source}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-slate-500">
                    No matching indicators found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500">
          Showing {filtered.length} of {indicators.length} indicators
        </div>
      </section>

      {/* Add Indicator Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="surface w-full max-w-lg p-6">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  Add Threat Indicator
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Register a new indicator of compromise.
                </p>
              </div>

              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={addIndicator} className="space-y-4">

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Indicator Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) => setForm({...form, type: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                >
                  <option>IP Address</option>
                  <option>Domain</option>
                  <option>URL</option>
                  <option>File Hash</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Indicator Value
                </label>

                <input
                  required
                  value={form.value}
                  onChange={(e) => setForm({...form, value: e.target.value})}
                  placeholder="Enter IP, domain, URL or hash"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Severity
                  </label>

                  <select
                    value={form.severity}
                    onChange={(e) => setForm({...form, severity: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  >
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Confidence (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={form.confidence}
                    onChange={(e) => setForm({...form, confidence: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Source
                </label>

                <select
                  value={form.source}
                  onChange={(e) => setForm({...form, source: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                >
                  <option>Manual Entry</option>
                  <option>Threat Feed</option>
                  <option>Investigation</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium"
                >
                  Save Indicator
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
