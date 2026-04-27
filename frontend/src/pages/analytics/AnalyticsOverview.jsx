import React, { useState } from "react";
import {
    TrendingUp, TrendingDown, Users, Eye, ShoppingCart, DollarSign,
    ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const statCards = [
    {
        label: "Total Revenue",
        value: "$284,500",
        change: "+12.5%",
        up: true,
        icon: DollarSign,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        gradient: "from-blue-500 to-purple-600",
    },
    {
        label: "Total Users",
        value: "48,320",
        change: "+8.2%",
        up: true,
        icon: Users,
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/30",
        gradient: "from-green-400 to-teal-500",
    },
    {
        label: "Page Views",
        value: "1.2M",
        change: "-3.1%",
        up: false,
        icon: Eye,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        label: "Conversions",
        value: "3,842",
        change: "+5.7%",
        up: true,
        icon: ShoppingCart,
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-900/30",
        gradient: "from-orange-400 to-rose-500",
    },
];

const areaData = [
    { month: "Jan", visitors: 32000, sessions: 24000 },
    { month: "Feb", visitors: 38000, sessions: 28000 },
    { month: "Mar", visitors: 35000, sessions: 26000 },
    { month: "Apr", visitors: 50000, sessions: 38000 },
    { month: "May", visitors: 62000, sessions: 47000 },
    { month: "Jun", visitors: 57000, sessions: 43000 },
    { month: "Jul", visitors: 70000, sessions: 54000 },
    { month: "Aug", visitors: 78000, sessions: 60000 },
    { month: "Sep", visitors: 74000, sessions: 56000 },
    { month: "Oct", visitors: 82000, sessions: 64000 },
    { month: "Nov", visitors: 91000, sessions: 71000 },
    { month: "Dec", visitors: 98000, sessions: 78000 },
];

const channelData = [
    { name: "Organic Search", value: 42, color: "#3b82f6" },
    { name: "Direct", value: 24, color: "#8b5cf6" },
    { name: "Referral", value: 18, color: "#10b981" },
    { name: "Social Media", value: 16, color: "#f59e0b" },
];

const topPages = [
    { page: "/dashboard", views: 24800, bounce: "32%", time: "3m 42s" },
    { page: "/products", views: 18200, bounce: "41%", time: "2m 15s" },
    { page: "/checkout", views: 12400, bounce: "28%", time: "4m 10s" },
    { page: "/blog", views: 9800, bounce: "55%", time: "1m 58s" },
    { page: "/about", views: 6200, bounce: "68%", time: "1m 12s" },
];

const ranges = ["7D", "30D", "90D", "1Y"];

function AnalyticsOverview() {
    const [range, setRange] = useState("30D");

    return (
        <div className="space-y-6">

            {/* Page Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Overview</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Traffic, conversions and revenue at a glance.
                </p>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-xl ${card.bg}`}>
                                    <Icon className={`w-5 h-5 ${card.color}`} />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                                    ${card.up ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"}`}>
                                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {card.change}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{card.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
                            <div className={`mt-3 h-1 rounded-full bg-gradient-to-r ${card.gradient} opacity-60`} />
                        </div>
                    );
                })}
            </div>

            {/* Traffic Chart */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Traffic Overview</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Visitors and sessions over time</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                        {ranges.map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                    ${range === r
                                        ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Visitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Sessions</span>
                    </div>
                </div>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                                formatter={(v) => [v.toLocaleString(), ""]}
                            />
                            <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fill="url(#visitorsGrad)" />
                            <Area type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} fill="url(#sessionsGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Channel Breakdown + Top Pages */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                {/* Pie Chart */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Traffic Channels</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Traffic source breakdown</p>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={channelData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                                    {channelData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {channelData.map((ch) => (
                            <div key={ch.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{ch.name}</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-800 dark:text-white">{ch.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Pages Table */}
                <div className="xl:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Top Pages</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Most visited pages this month</p>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3">Page</th>
                                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3">Views</th>
                                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3">Bounce</th>
                                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3">Avg. Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {topPages.map((row) => (
                                    <tr key={row.page} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="py-3 text-sm font-medium text-blue-500">{row.page}</td>
                                        <td className="py-3 text-sm text-right text-slate-800 dark:text-white font-semibold">{row.views.toLocaleString()}</td>
                                        <td className="py-3 text-sm text-right text-slate-600 dark:text-slate-400">{row.bounce}</td>
                                        <td className="py-3 text-sm text-right text-slate-600 dark:text-slate-400">{row.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsOverview;
