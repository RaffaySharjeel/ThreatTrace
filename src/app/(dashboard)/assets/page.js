
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  X,
  Pencil,
  Trash2,
  Server,
  Monitor,
  Database,
  Cloud,
} from "lucide-react";

const initialAssets = [
  {
    id: "AST-001",
    name: "Main Web Server",
    type: "Server",
    ipAddress: "192.168.1.10",
    owner: "Raffay",
    status: "Active",
    risk: "Critical",
    date: "Nov 03, 2026",
  },
  {
    id: "AST-002",
    name: "Employee Workstation",
    type: "Endpoint",
    ipAddress: "192.168.1.15",
    owner: "Ahmed",
    status: "Active",
    risk: "Medium",
    date: "Nov 03, 2026",
  },
  {
    id: "AST-003",
    name: "Company Database",
    type: "Database",
    ipAddress: "192.168.1.20",
    owner: "Ali",
    status: "Active",
    risk: "High",
    date: "Nov 02, 2026",
  },
  {
    id: "AST-004",
    name: "Cloud Storage",
    type: "Cloud",
    ipAddress: "10.0.0.5",
    owner: "Sara",
    status: "Inactive",
    risk: "Low",
    date: "Nov 02, 2026",
  },
  {
    id: "AST-005",
    name: "Office Router",
    type: "Network",
    ipAddress: "192.168.1.1",
    owner: "Raffay",
    status: "Active",
    risk: "High",
    date: "Nov 01, 2026",
  },
];

const riskStyles = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

const statusStyles = {
  Active: "bg-green-500/10 text-green-400",
  Inactive: "bg-slate-500/10 text-slate-400",
};

const emptyForm = {
  name: "",
  type: "Server",
  ipAddress: "",
  owner: "Raffay",
  status: "Active",
  risk: "Medium",
};

export default function AssetsPage() {
  const [assets, setAssets] = useState(initialAssets);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Search and filters
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.id.toLowerCase().includes(search.toLowerCase()) ||
      asset.ipAddress.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || asset.type === typeFilter;

    const matchesStatus =
      statusFilter === "All" || asset.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (asset) => {
    setEditingId(asset.id);

    setForm({
      name: asset.name,
      type: asset.type,
      ipAddress: asset.ipAddress,
      owner: asset.owner,
      status: asset.status,
      risk: asset.risk,
    });

    setShowForm(true);
  };

  // Create or update asset
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === editingId
            ? { ...asset, ...form }
            : asset
        )
      );
    } else {
      const nextNumber =
        Math.max(
          0,
          ...assets.map((asset) =>
            Number(asset.id.split("-")[1])
          )
        ) + 1;

      const newAsset = {
        ...form,
        id: `AST-${String(nextNumber).padStart(3, "0")}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setAssets((prev) => [newAsset, ...prev]);
    }

    closeForm();
  };

  // Delete asset
  const deleteAsset = (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${id}?`
    );

    if (!confirmed) return;

    setAssets((prev) =>
      prev.filter((asset) => asset.id !== id)
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
      title: "Total Assets",
      value: assets.length,
      icon: Server,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Assets",
      value: assets.filter((a) => a.status === "Active").length,
      icon: Monitor,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Critical Risk",
      value: assets.filter((a) => a.risk === "Critical").length,
      icon: Database,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Cloud Assets",
      value: assets.filter((a) => a.type === "Cloud").length,
      icon: Cloud,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
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
            Asset Management
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Manage and monitor organizational assets.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <Plus size={17} />
          Add Asset
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
                Current asset records
              </p>
            </div>
          );
        })}
      </section>

      {/* Asset Table */}
      <section className="surface overflow-hidden">

        <div className="p-5">
          <h2 className="font-semibold">
            Asset Inventory
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Review and manage registered assets.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="px-5 pb-5 flex flex-wrap gap-3">

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 flex-1 min-w-[180px]">
            <Search size={16} className="text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
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
              <option value="Server">Server</option>
              <option value="Endpoint">Endpoint</option>
              <option value="Network">Network</option>
              <option value="Database">Database</option>
              <option value="Cloud">Cloud</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead className="bg-slate-900/70 border-y border-slate-800">
              <tr className="text-xs text-slate-500">
                <th className="px-5 py-4">ASSET ID</th>
                <th className="px-5 py-4">ASSET NAME</th>
                <th className="px-5 py-4">TYPE</th>
                <th className="px-5 py-4">IP ADDRESS</th>
                <th className="px-5 py-4">OWNER</th>
                <th className="px-5 py-4">RISK</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-blue-400">
                    {asset.id}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-200">
                    {asset.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {asset.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {asset.ipAddress}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {asset.owner}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md border ${riskStyles[asset.risk]}`}>
                      {asset.risk}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-md ${statusStyles[asset.status]}`}>
                      {asset.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(asset)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Edit asset"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete asset"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-sm text-slate-500">
                    No matching assets found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-800 text-xs text-slate-500">
          Showing {filteredAssets.length} of {assets.length} assets
        </div>
      </section>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="surface w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit Asset" : "Add New Asset"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editingId
                    ? `Update details for ${editingId}.`
                    : "Register a new organizational asset."}
                </p>
              </div>

              <button onClick={closeForm}>
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Asset Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Enter asset name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Asset Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  >
                    <option>Server</option>
                    <option>Endpoint</option>
                    <option>Network</option>
                    <option>Database</option>
                    <option>Cloud</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    IP Address
                  </label>

                  <input
                    value={form.ipAddress}
                    onChange={(e) =>
                      setForm({ ...form, ipAddress: e.target.value })
                    }
                    placeholder="192.168.1.1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-2">
                  Asset Owner
                </label>

                <select
                  value={form.owner}
                  onChange={(e) =>
                    setForm({ ...form, owner: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                >
                  <option>Raffay</option>
                  <option>Ahmed</option>
                  <option>Ali</option>
                  <option>Sara</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-2">
                    Risk Level
                  </label>

                  <select
                    value={form.risk}
                    onChange={(e) =>
                      setForm({ ...form, risk: e.target.value })
                    }
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
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
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
                  {editingId ? "Save Changes" : "Add Asset"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
