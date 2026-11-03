
"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Activity,
  CheckCircle,
  Search,
  Plus,
  Filter,
  X,
  Siren,
  Pencil,
  Trash2,
} from "lucide-react";

const initialIncidents = [
  {
    id: "INC-001",
    title: "Phishing Campaign Detected",
    category: "Phishing",
    severity: "Critical",
    status: "Open",
    assignee: "Raffay",
    date: "Nov 03, 2026",
    description: "Suspicious phishing emails detected targeting employees.",
  },
  {
    id: "INC-002",
    title: "Suspicious Login Attempt",
    category: "Unauthorized Access",
    severity: "High",
    status: "Investigating",
    assignee: "Ahmed",
    date: "Nov 03, 2026",
    description: "Multiple failed login attempts detected.",
  },
  {
    id: "INC-003",
    title: "Malware Detection",
    category: "Malware",
    severity: "Medium",
    status: "Resolved",
    assignee: "Ali",
    date: "Nov 02, 2026",
    description: "Malicious file detected on a monitored endpoint.",
  },
  {
    id: "INC-004",
    title: "Unusual Network Traffic",
    category: "Network Anomaly",
    severity: "High",
    status: "Investigating",
    assignee: "Raffay",
    date: "Nov 02, 2026",
    description: "Unexpected outbound traffic detected.",
  },
  {
    id: "INC-005",
    title: "Suspicious Domain Activity",
    category: "Malicious Domain",
    severity: "Low",
    status: "Open",
    assignee: "Sara",
    date: "Nov 01, 2026",
    description: "Suspicious domain communication reported.",
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

const emptyForm = {
  title: "",
  category: "Phishing",
  severity: "Medium",
  status: "Open",
  assignee: "Raffay",
  description: "",
};

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Search and filters
  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(search.toLowerCase()) ||
      incident.id.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "All" ||
      incident.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      incident.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Open create modal
  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // Open edit modal
  const openEditForm = (incident) => {
    setEditingId(incident.id);

    setForm({
      title: incident.title,
      category: incident.category,
      severity: incident.severity,
      status: incident.status,
      assignee: incident.assignee,
      description: incident.description,
    });

    setShowForm(true);
  };

  // Create or update incident
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === editingId
            ? { ...incident, ...form }
            : incident
        )
      );
    } else {
      const nextNumber =
        Math.max(
          0,
          ...incidents.map((item) =>
            Number(item.id.split("-")[1])
          )
        ) + 1;

      const newIncident = {
        ...form,
        id: `INC-${String(nextNumber).padStart(3, "0")}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setIncidents((prev) => [newIncident, ...prev]);
    }

    closeForm();
  };

  // Delete incident
  const deleteIncident = (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${id}?`
    );

    if (!confirmed) return;

    setIncidents((prev) =>
      prev.filter((incident) => incident.id !== id)
    );
  };

  // Close modal
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const stats = [
    {
      title: "Total Incidents",
      value: incidents.length,
      icon: Siren,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Open Incidents",
      value: incidents.filter((i) => i.status === "Open").length,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Investigating",
      value: incidents.filter((i) => i.status === "Investigating").length,
      icon: Activity,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Resolved",
      value: incidents.filter((i) => i.status === "Resolved").length,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}
      <section className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <p className="text-sm text-blue-400 mb-2">
            SECURITY OPERATIONS CENTER
          </p>

          <h1 className="text-2xl md:text-3xl font-bold">
            Incident Management
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Monitor, assign and manage security incidents.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={17} />
          Create Incident
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
                Current incident records
              </p>
            </div>
          );
        })}
      </section>

      {/* Incident Table */}
      <section className="surface overflow-hidden">

        <div className="p-5">
          <h2 className="font-semibold">
            Security Incidents
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Review and manage reported security events.
          </p>
        </div>

        {/* Filters */}
        <div className="px-5 pb-5 flex flex-wrap gap-3">

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 flex-1 min-w-[180px]">
            <Search size={16} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incidents..."
              className="bg-transparent outline-none text-sm py-2 w-full"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3">
            <Filter size={15} className="text-slate-400" />

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-300 py-2 outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead className="bg-slate-900/70 border-y border-slate-800">
              <tr className="text-xs text-slate-500">
                <th className="px-5 py-4">INCIDENT ID</th>
                <th className="px-5 py-4">INCIDENT</th>
                <th className="px-5 py-4">SEVERITY</th>
                <th className="px-5 py-4">ASSIGNED TO</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">DATE</th>
                <th className="px-5 py-4">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-blue-400">
                    {incident.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-200">
                      {incident.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {incident.category}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md border ${severityStyles[incident.severity]}`}>
                      {incident.severity}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {incident.assignee}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md ${statusStyles[incident.status]}`}>
                      {incident.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {incident.date}
                  </td>

                  {/* CRUD Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(incident)}
                        className="text-blue-400 hover:text-blue-300 transition"
                        title="Edit incident"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => deleteIncident(incident.id)}
                        className="text-red-400 hover:text-red-300 transition"
                        title="Delete incident"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredIncidents.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-slate-500">
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

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="surface w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit Security Incident" : "Create Security Incident"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editingId
                    ? `Update details for ${editingId}.`
                    : "Register a new security event."}
                </p>
              </div>

              <button onClick={closeForm}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Incident Title
                </label>

                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter incident title"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Incident Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                >
                  <option>Phishing</option>
                  <option>Malware</option>
                  <option>Unauthorized Access</option>
                  <option>Network Anomaly</option>
                  <option>Data Breach</option>
                  <option>Malicious Domain</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Severity
                  </label>

                  <select
                    value={form.severity}
                    onChange={(e) => setForm({ ...form, severity: e.target.value })}
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
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  >
                    <option>Open</option>
                    <option>Investigating</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Assign Analyst
                </label>

                <select
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                >
                  <option>Raffay</option>
                  <option>Ahmed</option>
                  <option>Ali</option>
                  <option>Sara</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Incident Description
                </label>

                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what happened..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium"
                >
                  {editingId ? "Save Changes" : "Create Incident"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
