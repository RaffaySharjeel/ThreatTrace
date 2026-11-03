
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Radar,
  Siren,
  SearchCode,
  Server,
  Users,
  History,
  Settings,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Threat Intelligence", href: "/threats", icon: Radar },
      { name: "Incidents", href: "/incidents", icon: Siren },
      { name: "Investigations", href: "/investigations", icon: SearchCode },
      { name: "Assets", href: "/assets", icon: Server },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      { name: "Team Management", href: "/team", icon: Users },
      { name: "Audit Logs", href: "/audit-logs", icon: History },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <Link href="/dashboard" className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <ShieldCheck size={23} color="white" />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide">
            Threat<span className="text-blue-400">Trace</span>
          </h1>
          <p className="text-[9px] tracking-[2px] text-slate-500">
            THREAT INTELLIGENCE
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex-1 space-y-8">
        {navigation.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold tracking-[1.5px] text-slate-500 px-3 mb-3">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.name}
                    </span>

                    {active && <ChevronRight size={15} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-800 pt-5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
            RS
          </div>

          <div>
            <p className="text-sm font-medium">Security Analyst</p>
            <p className="text-xs text-slate-500">Analyst Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
