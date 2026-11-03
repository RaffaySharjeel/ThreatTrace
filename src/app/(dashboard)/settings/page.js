"use client";

import { useState } from "react";
import {
  Settings, UserRound, Bell, Monitor, Save, Shield,
} from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex@threattrace.com",
    role: "Administrator",
  });

  const [preferences, setPreferences] = useState({
    appName: "ThreatTrace",
    timezone: "Asia/Karachi",
    dateFormat: "DD/MM/YYYY",
    emailNotifications: true,
    securityAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500";

  function updateProfile(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updatePreference(field, value) {
    setPreferences((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your profile and application preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings */}
        <section className="surface rounded-xl border border-white/5">
          <div className="flex items-center gap-3 border-b border-white/5 p-5">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <UserRound size={19} />
            </div>
            <div>
              <h2 className="font-medium text-white">Profile Information</h2>
              <p className="mt-1 text-xs text-gray-500">Your account details</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Full Name</label>
              <input
                value={profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile("email", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Account Role</label>
              <input
                value={profile.role}
                disabled
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>
          </div>
        </section>

        {/* Application Preferences */}
        <section className="surface rounded-xl border border-white/5">
          <div className="flex items-center gap-3 border-b border-white/5 p-5">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <Monitor size={19} />
            </div>
            <div>
              <h2 className="font-medium text-white">Application Preferences</h2>
              <p className="mt-1 text-xs text-gray-500">General application configuration</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">Application Name</label>
              <input
                value={preferences.appName}
                onChange={(e) => updatePreference("appName", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => updatePreference("timezone", e.target.value)}
                className={inputClass}
              >
                <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
                <option value="Europe/London">Europe/London</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Date Format</label>
              <select
                value={preferences.dateFormat}
                onChange={(e) => updatePreference("dateFormat", e.target.value)}
                className={inputClass}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="surface rounded-xl border border-white/5">
          <div className="flex items-center gap-3 border-b border-white/5 p-5">
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
              <Bell size={19} />
            </div>
            <div>
              <h2 className="font-medium text-white">Notifications</h2>
              <p className="mt-1 text-xs text-gray-500">Manage notification preferences</p>
            </div>
          </div>

          <div className="space-y-5 p-5">
            {[
              {
                key: "emailNotifications",
                title: "Email Notifications",
                description: "Receive general application updates.",
              },
              {
                key: "securityAlerts",
                title: "Security Alerts",
                description: "Receive notifications about important security events.",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences[item.key]}
                  onClick={() =>
                    updatePreference(item.key, !preferences[item.key])
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    preferences[item.key] ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      preferences[item.key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security Information */}
        <section className="surface rounded-xl border border-white/5 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
              <Shield size={19} />
            </div>
            <div>
              <h2 className="font-medium text-white">Security</h2>
              <p className="mt-1 text-xs text-gray-500">
                ThreatTrace account security information
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Account security and password management will be connected when
            authentication is implemented.
          </p>
        </section>

        {/* Save Button */}
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">
            Demo settings are currently stored only in page state.
          </p>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-sm text-emerald-400">
                Changes saved in this demo.
              </span>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}