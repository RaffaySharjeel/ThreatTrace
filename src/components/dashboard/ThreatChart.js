
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", threats: 32 },
  { day: "Tue", threats: 48 },
  { day: "Wed", threats: 38 },
  { day: "Thu", threats: 65 },
  { day: "Fri", threats: 52 },
  { day: "Sat", threats: 78 },
  { day: "Sun", threats: 61 },
];

export function ThreatActivityChart() {
  return (
    <div className="surface p-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-semibold">Threat Activity</h2>
          <p className="text-xs text-slate-500 mt-1">
            Threat detection overview
          </p>
        </div>
        <span className="text-xs text-blue-400">Last 7 days</span>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#233149"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              width={35}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111C2E",
                border: "1px solid #233149",
                borderRadius: "10px",
                color: "#F8FAFC",
              }}
            />

            <Area
              type="monotone"
              dataKey="threats"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#threatGradient)"
              activeDot={{ r: 6, fill: "#22D3EE" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const severityData = [
  { name: "Critical", value: 18, color: "#EF4444" },
  { name: "High", value: 32, color: "#F97316" },
  { name: "Medium", value: 35, color: "#EAB308" },
  { name: "Low", value: 15, color: "#22C55E" },
];

import {
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function ThreatSeverityChart() {
  return (
    <div className="surface p-5">
      <h2 className="font-semibold">Threat Severity</h2>
      <p className="text-xs text-slate-500 mt-1">
        Distribution of detected threats
      </p>

      <div className="h-[220px] relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={severityData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              stroke="none"
            >
              {severityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#111C2E",
                border: "1px solid #233149",
                borderRadius: "10px",
                color: "#F8FAFC",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold">1,284</span>
          <span className="text-xs text-slate-500">Total Threats</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {severityData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-400">
              {item.name}
            </span>
            <span className="text-xs text-white ml-auto">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
