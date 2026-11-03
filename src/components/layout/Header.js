
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  UserRound,
  Settings,
  LogOut,
  ShieldAlert,
  FileText,
  CheckCheck,
  LayoutDashboard,
  Users,
  Package,
  BriefcaseBusiness,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const pages = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard, keywords: "overview home" },
  { name: "Threat Intelligence", path: "/threats", icon: ShieldAlert, keywords: "threats intelligence" },
  { name: "Incidents", path: "/incidents", icon: FileText, keywords: "incident reports" },
  { name: "Investigations", path: "/investigations", icon: Search, keywords: "investigation cases" },
  { name: "Assets", path: "/assets", icon: Package, keywords: "servers devices network" },
  { name: "Team Management", path: "/team", icon: Users, keywords: "members users" },
  { name: "Audit Logs", path: "/audit-logs", icon: FileText, keywords: "activity history logs" },
  { name: "Settings", path: "/settings", icon: Settings, keywords: "preferences configuration" },
];

const notifications = [
  {
    id: 1,
    title: "New threat detected",
    description: "A new threat record was added.",
    time: "Recently",
    icon: ShieldAlert,
  },
  {
    id: 2,
    title: "Incident updated",
    description: "An incident record was updated.",
    time: "Recently",
    icon: FileText,
  },
  {
    id: 3,
    title: "Team activity",
    description: "A team member was added.",
    time: "Recently",
    icon: Users,
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState([]);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const currentPage =
    pages.find((page) => page.path === pathname)?.name || "Overview";

  const unreadCount = notifications.length - readNotifications.length;

  const searchResults = pages.filter((page) => {
    const query = search.toLowerCase().trim();

    return (
      page.name.toLowerCase().includes(query) ||
      page.keywords.toLowerCase().includes(query)
    );
  });

  function closeDropdowns() {
    setSearchOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
  }

  function navigate(path) {
    closeDropdowns();
    setSearch("");
    router.push(path);
  }

  function markAllRead() {
    setReadNotifications(notifications.map((item) => item.id));
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        closeDropdowns();
        setSearchOpen(true);
      }

      if (e.key === "Escape") {
        closeDropdowns();
      }
    }

    function handleOutsideClick(e) {
      if (!searchRef.current?.contains(e.target)) {
        setSearchOpen(false);
      }

      if (!notificationRef.current?.contains(e.target)) {
        setNotificationOpen(false);
      }

      if (!profileRef.current?.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="topbar relative z-40 flex items-center justify-between gap-3">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="md:hidden text-slate-400 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-white">{currentPage}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div ref={searchRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setNotificationOpen(false);
              setProfileOpen(false);
            }}
            className="hidden sm:flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400 hover:border-slate-500 hover:text-white transition"
          >
            <Search size={16} />
            Search anything...
            <span className="text-xs border border-slate-600 rounded px-1">
              Ctrl K
            </span>
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-12 z-50 w-[320px] sm:w-[380px] overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-700 px-4">
                <Search size={18} className="text-slate-400" />
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search pages..."
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto p-2">
                <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Pages
                </p>

                {searchResults.length > 0 ? (
                  searchResults.map((page) => {
                    const Icon = page.icon;

                    return (
                      <button
                        type="button"
                        key={page.path}
                        onClick={() => navigate(page.path)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                      >
                        <Icon size={17} className="text-blue-400" />
                        {page.name}
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-8 text-center text-sm text-slate-500">
                    No matching pages found.
                  </p>
                )}
              </div>

              <div className="border-t border-slate-700 px-4 py-3 text-xs text-slate-500">
                Press ESC to close
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search */}
        <button
          type="button"
          onClick={() => {
            setSearchOpen(true);
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
          className="sm:hidden text-slate-400 hover:text-white"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setSearchOpen(false);
              setProfileOpen(false);
            }}
            className="relative text-slate-400 hover:text-white transition"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-10 z-50 w-[320px] sm:w-[360px] overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 p-4">
                <div>
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {unreadCount} unread notifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  const isRead = readNotifications.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`flex gap-3 border-b border-slate-800 p-4 ${
                        isRead ? "opacity-60" : "bg-blue-500/[0.04]"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.description}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-500">
                          {item.time}
                        </p>
                      </div>

                      {!isRead && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 text-center">
                <span className="text-xs text-slate-500">
                  Demo notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setSearchOpen(false);
              setNotificationOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-800/70 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              RS
            </div>

            <span className="hidden sm:block text-sm text-white">
              Raffay
            </span>

            <ChevronDown
              size={15}
              className={`text-slate-400 transition ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-2xl">
              <div className="border-b border-slate-700 p-4">
                <p className="text-sm font-medium text-white">Raffay Sharjeel</p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <UserRound size={17} />
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Settings size={17} />
                  Settings
                </button>

                <div className="my-2 border-t border-slate-700" />

                <button
                  type="button"
                  onClick={() => {
                    alert("Authentication is not implemented yet.");
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
