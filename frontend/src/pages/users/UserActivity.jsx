import React, { useState } from "react";
import {
  Activity, Clock, User, ShoppingCart, CreditCard,
  AlertTriangle, RefreshCcw, LogIn, LogOut, Settings,
  Filter, Search, TrendingUp, Eye, MousePointer,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import AnomalyPanel from "../../components/AnomalyPanel";

const activityLog = [
  { id: 1, user: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  action: "Logged In",       module: "Auth",         time: "2 mins ago",   icon: LogIn,       color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30", hour: 9, ip: "192.168.1.10", device: "Chrome/Mac"   },
  { id: 2, user: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  action: "Updated Profile", module: "Settings",     time: "8 mins ago",   icon: Settings,    color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30", hour: 4, ip: "10.0.0.99", device: "Unknown"     },
  { id: 3, user: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  action: "Placed Order",    module: "E-Commerce",   time: "15 mins ago",  icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", hour: 11, ip: "172.16.0.23", device: "Firefox/Windows" },
  { id: 4, user: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  action: "Made Payment",    module: "Transactions", time: "32 mins ago",  icon: CreditCard,   color: "text-teal-500",   bg: "bg-teal-100 dark:bg-teal-900/30", hour: 13, ip: "192.168.0.45", device: "Safari/iPhone" },
  { id: 5, user: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  action: "Viewed Report",   module: "Analytics",    time: "1 hour ago",   icon: Eye,          color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", hour: 14, ip: "10.0.0.12",  device: "Edge/Windows" },
  { id: 6, user: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  action: "Failed Login",    module: "Auth",         time: "1 hour ago",   icon: AlertTriangle,color:"text-red-500",   bg: "bg-red-100 dark:bg-red-900/30", hour: 15, ip: "172.20.10.5", device: "Chrome/Android" },
  { id: 7, user: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  action: "Logged Out",      module: "Auth",         time: "2 hours ago",  icon: LogOut,       color: "text-slate-500",  bg: "bg-slate-100 dark:bg-slate-800", hour: 16, ip: "192.168.1.55", device: "Firefox/Linux" },
  { id: 8, user: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  action: "Added Product",   module: "Inventory",    time: "3 hours ago",  icon: RefreshCcw,   color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", hour: 17, ip: "10.1.1.8",   device: "Chrome/Windows" },
  { id: 9, user: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  action: "Clicked Banner",  module: "Dashboard",    time: "4 hours ago",  icon: MousePointer, color: "text-pink-500",   bg: "bg-pink-100 dark:bg-pink-900/30", hour: 18, ip: "172.16.5.67", device: "Safari/iPad" },
  { id: 10,user: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  action: "Logged In",       module: "Auth",         time: "5 hours ago",  icon: LogIn,        color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30", hour: 19, ip: "192.168.100.2", device: "Edge/Mac" },
];

const activityTrend = [
  { day: "Mon", sessions: 124, actions: 340 },
  { day: "Tue", sessions: 148, actions: 420 },
  { day: "Wed", sessions: 136, actions: 380 },
  { day: "Thu", sessions: 172, actions: 510 },
  { day: "Fri", sessions: 195, actions: 580 },
  { day: "Sat", sessions: 88,  actions: 210 },
  { day: "Sun", sessions: 74,  actions: 180 },
];

const topUsers = [
  { name: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  actions: 284, sessions: 42, lastSeen: "2 mins ago"  },
  { name: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  actions: 231, sessions: 38, lastSeen: "1 hour ago"  },
  { name: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  actions: 198, sessions: 31, lastSeen: "8 mins ago"  },
  { name: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  actions: 176, sessions: 29, lastSeen: "15 mins ago" },
  { name: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  actions: 142, sessions: 24, lastSeen: "1 hour ago"  },
];

const modules = ["All Modules", "Auth", "E-Commerce", "Analytics", "Settings", "Transactions", "Inventory", "Dashboard"];

function UserActivity() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");

  const filtered = activityLog.filter((a) => {
    const matchSearch = a.user.toLowerCase().includes(search.toLowerCase()) || a.action.toLowerCase().includes(search.toLowerCase());
    const matchModule = moduleFilter === "All Modules" || a.module === moduleFilter;
    return matchSearch && matchModule;
  });

  return (
    <div className="space-y-6">

      {/* Subheading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">User Activity</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track and monitor real-time user behaviour across the platform.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Active Sessions",   value: "142",  icon: Activity,     color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30"    },
          { label: "Actions Today",     value: "2,841",icon: MousePointer, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
          { label: "Avg. Session Time", value: "4m 22s",icon: Clock,       color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30"   },
          { label: "Unique Visitors",   value: "839",  icon: User,         color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <div className={`inline-flex p-2.5 rounded-xl ${card.bg} mb-3`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{card.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Activity Trend */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Weekly Activity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sessions and actions over the past 7 days</p>
          </div>
          <div className="flex items-center gap-5 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Actions</span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                />
                <Area type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} fill="url(#sessionsGrad)" />
                <Area type="monotone" dataKey="actions"  stroke="#8b5cf6" strokeWidth={2} fill="url(#actionsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Active Users */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Most Active Users</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Ranked by total actions</p>
          </div>
          <div className="space-y-3">
            {topUsers.map((user, i) => (
              <div key={user.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className={`text-xs font-bold w-5 text-center ${i === 0 ? "text-yellow-500" : "text-slate-400"}`}>
                  {i + 1}
                </span>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-slate-200 dark:ring-slate-700" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.actions} actions · {user.lastSeen}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{user.sessions}</p>
                  <p className="text-xs text-slate-400">sessions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Anomaly Detection</h2>
        <p className="text-sm text-slate-500 mb-4">Rule-based scoring across all activity log entries.</p>
        <AnomalyPanel activityLog={activityLog} />
      </div>

      {/* Activity Log */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Activity Log</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time log of all user actions</p>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user or action..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {modules.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>

        {/* Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">User</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Action</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Module</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((entry) => {
                const Icon = entry.icon;
                return (
                  <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img src={entry.avatar} alt={entry.user} className="w-8 h-8 rounded-full ring-2 ring-slate-200 dark:ring-slate-700" />
                        <span className="text-sm font-medium text-slate-800 dark:text-white">{entry.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${entry.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${entry.color}`} />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{entry.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        {entry.module}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {entry.time}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
