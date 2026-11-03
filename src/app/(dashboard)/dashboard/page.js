
import {
  ShieldAlert,
  Activity,
  SearchCheck,
  Server,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  ThreatActivityChart,
  ThreatSeverityChart,
} from "@/components/dashboard/ThreatChart";

import RecentIncidents from "@/components/dashboard/RecentIncidents";

const stats = [
  {
    title: "Total Threats",
    value: "1,284",
    change: "+12.5%",
    positive: false,
    icon: ShieldAlert,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Active Incidents",
    value: "48",
    change: "+8.2%",
    positive: false,
    icon: Activity,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    title: "Investigations",
    value: "26",
    change: "+4.6%",
    positive: true,
    icon: SearchCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Protected Assets",
    value: "156",
    change: "+2.4%",
    positive: true,
    icon: Server,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const activities = [
  {
    title: "Suspicious IP detected",
    detail: "192.0.2.45 · High severity",
    time: "5 minutes ago",
    color: "bg-red-500",
  },
  {
    title: "Investigation created",
    detail: "Phishing Campaign Analysis",
    time: "18 minutes ago",
    color: "bg-blue-500",
  },
  {
    title: "Incident resolved",
    detail: "INC-2026-014 · Malware Detection",
    time: "42 minutes ago",
    color: "bg-green-500",
  },
  {
    title: "New threat indicator added",
    detail: "example-malicious.test",
    time: "1 hour ago",
    color: "bg-cyan-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <section>
        <p className="text-sm text-blue-400 mb-2">
          SECURITY OPERATIONS CENTER
        </p>

        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Security Overview
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Monitor threats, incidents and investigations across your environment.
            </p>
          </div>

          <p className="text-xs text-slate-500">
            SYSTEM STATUS: <span className="text-green-400">● OPERATIONAL</span>
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.positive
            ? ArrowUpRight
            : ArrowDownRight;

          return (
            <div
              key={stat.title}
              className="surface p-5 hover:border-slate-600 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <div className="flex items-end justify-between mt-5">
                <h2 className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </h2>

                <span
                  className={`text-xs flex items-center gap-1 ${
                    stat.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <ChangeIcon size={14} />
                  {stat.change}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Compared to previous period
              </p>
            </div>
          );
        })}
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
  <div className="xl:col-span-2">
    <ThreatActivityChart />
  </div>

  <ThreatSeverityChart />
</section>
      {/* Recent Security Incidents */}
      <RecentIncidents />

      {/* Recent Activities */}
      <section className="surface p-5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-semibold">Recent Activities</h2>
            <p className="text-xs text-slate-500 mt-1">
              Latest events across your security environment
            </p>
          </div>

          <button className="text-xs text-blue-400">
            View all
          </button>
        </div>

        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {activity.detail}
                </p>
              </div>

              <span className="text-xs text-slate-500">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
        
      </section>

    </div>
  );
}
