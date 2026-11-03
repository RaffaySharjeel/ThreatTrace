"use client";

import { useState } from "react";
import {
  Users, UserPlus, Search, Pencil, Trash2, X,
  ShieldCheck, UserRound, Mail, CheckCircle2,
} from "lucide-react";

const initialMembers = [
  { id: "USR-001", name: "Alex Morgan", email: "alex@threattrace.com", role: "Admin", status: "Active" },
  { id: "USR-002", name: "Sarah Khan", email: "sarah@threattrace.com", role: "Analyst", status: "Active" },
  { id: "USR-003", name: "John Smith", email: "john@threattrace.com", role: "Reporter", status: "Active" },
  { id: "USR-004", name: "Emma Wilson", email: "emma@threattrace.com", role: "Analyst", status: "Inactive" },
];

const emptyForm = {
  name: "",
  email: "",
  role: "Analyst",
  status: "Active",
};

export default function TeamPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const activeCount = members.filter((m) => m.status === "Active").length;
  const adminCount = members.filter((m) => m.role === "Admin").length;

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.id.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(member) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === editingId ? { ...member, ...form } : member
        )
      );
    } else {
      setMembers((prev) => [
        ...prev,
        {
          id: `USR-${String(Date.now()).slice(-4)}`,
          ...form,
        },
      ]);
    }

    setModalOpen(false);
    setForm(emptyForm);
  }

  function deleteMember(id) {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers((prev) => prev.filter((member) => member.id !== id));
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">Team Management</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage users and their roles within ThreatTrace.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <UserPlus size={17} />
          Add Member
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Members", value: members.length, icon: Users },
          { label: "Active Members", value: activeCount, icon: CheckCircle2 },
          { label: "Administrators", value: adminCount, icon: ShieldCheck },
        ].map((item) => (
          <div key={item.label} className="surface rounded-xl border border-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{item.label}</p>
              <item.icon size={19} className="text-blue-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="surface overflow-hidden rounded-xl border border-white/5">
        <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full rounded-lg border border-white/10 bg-[#111827] py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-gray-300 outline-none"
          >
            <option>All</option>
            <option>Admin</option>
            <option>Analyst</option>
            <option>Reporter</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Member</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        <UserRound size={19} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{member.email}</p>
                        <p className="mt-1 text-xs text-gray-600">{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-300">{member.role}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${
                      member.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(member)} className="rounded-lg p-2 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteMember(member.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-5 py-10 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#151d2c] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit Member" : "Add Team Member"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Enter full name" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Email Address</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="name@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
                  <option>Admin</option>
                  <option>Analyst</option>
                  <option>Reporter</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                  {editingId ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}   