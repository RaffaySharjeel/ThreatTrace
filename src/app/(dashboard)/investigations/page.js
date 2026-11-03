
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  X,
  Pencil,
  Trash2,
  FolderSearch,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";

const initialInvestigations = [
  {
    id: "INV-001",
    title: "Phishing Email Investigation",
    incidentId: "INC-001",
    assignee: "Raffay",
    status: "In Progress",
    date: "Nov 03, 2026",
    description: "Investigating suspicious emails targeting employees.",
  },
  {
    id: "INV-002",
    title: "Unauthorized Login Investigation",
    incidentId: "INC-002",
    assignee: "Ahmed",
    status: "Open",
    date: "Nov 03, 2026",
    description: "Reviewing repeated failed login attempts.",
  },
  {
    id: "INV-003",
    title: "Malware Analysis",
    incidentId: "INC-003",
    assignee: "Ali",
    status: "Completed",
    date: "Nov 02, 2026",
    description: "Investigating a malicious file found on an endpoint.",
  },
];

const statusStyles = {
  Open: "bg-blue-500/10 text-blue-400",
  "In Progress": "bg-purple-500/10 text-purple-400",
  Completed: "bg-green-500/10 text-green-400",
};

const emptyForm = {
  title: "",
  incidentId: "",
  assignee: "Raffay",
  status: "Open",
  description: "",
};

export default function InvestigationsPage() {
  const [investigations, setInvestigations] = useState(
    initialInvestigations
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Search and filter
  const filteredInvestigations = investigations.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.incidentId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Open create modal
  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // Open edit modal
  const openEditForm = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      incidentId: item.incidentId,
      assignee: item.assignee,
      status: item.status,
      description: item.description,
    });

    setShowForm(true);
  };

  // Create or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setInvestigations((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      const nextNumber =
        Math.max(
          0,
          ...investigations.map((item) =>
            Number(item.id.split("-")[1])
          )
        ) + 1;

      const newInvestigation = {
        ...form,
        id: `INV-${String(nextNumber).padStart(3, "0")}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setInvestigations((prev) => [
        newInvestigation,
        ...prev,
      ]);
    }

    closeForm();
  };

  // Delete
  const deleteInvestigation = (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${id}?`
    );

    if (!confirmed) return;

    setInvestigations((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Close modal
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Statistics
  const stats = [
    {
      title: "Total Investigations",
      value: investigations.length,
      icon: FolderSearch,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Open",
      value: investigations.filter(
        (item) => item.status === "Open"
      ).length,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "In Progress",
      value: investigations.filter(
        (item) => item.status === "In Progress"
      ).length,
      icon: Activity,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Completed",
      value: investigations.filter(
        (item) => item.status === "Completed"
      ).length,
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
            Investigation Management
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Create and manage security investigations.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={17} />
          Create Investigation
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
                Current investigation records
              </p>
            </div>
          );
        })}
      </section>

      {/* Investigation Table */}
      <section className="surface overflow-hidden">

        <div className="p-5">
          <h2 className="font-semibold">
            Security Investigations
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Review and manage investigation records.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="px-5 pb-5 flex flex-wrap gap-3">

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 flex-1 min-w-[180px]">
            <Search size={16} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search investigations..."
              className="bg-transparent outline-none text-sm py-2 w-full"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3">
            <Filter size={15} className="text-slate-400" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-300 py-2 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead className="bg-slate-900/70 border-y border-slate-800">
              <tr className="text-xs text-slate-500">
                <th className="px-5 py-4">INVESTIGATION ID</th>
                <th className="px-5 py-4">TITLE</th>
                <th className="px-5 py-4">INCIDENT ID</th>
                <th className="px-5 py-4">ASSIGNED TO</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">DATE</th>
                <th className="px-5 py-4">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredInvestigations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-blue-400">
                    {item.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-200">
                      {item.title}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {item.incidentId || "N/A"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {item.assignee}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {item.date}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(item)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Edit investigation"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => deleteInvestigation(item.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete investigation"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvestigations.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-sm text-slate-500">
                    No matching investigations found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500">
          Showing {filteredInvestigations.length} of {investigations.length} investigations
        </div>
      </section>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="surface w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {editingId
                    ? "Edit Investigation"
                    : "Create Investigation"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editingId
                    ? `Update ${editingId} details.`
                    : "Register a new investigation."}
                </p>
              </div>

              <button onClick={closeForm}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Investigation Title
                </label>

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter investigation title"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Related Incident ID
                </label>

                <input
                  value={form.incidentId}
                  onChange={(e) =>
                    setForm({ ...form, incidentId: e.target.value })
                  }
                  placeholder="e.g. INC-001"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Assign Analyst
                  </label>

                  <select
                    value={form.assignee}
                    onChange={(e) =>
                      setForm({ ...form, assignee: e.target.value })
                    }
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
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Description
                </label>

                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the investigation..."
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
                  {editingId ? "Save Changes" : "Create Investigation"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
    