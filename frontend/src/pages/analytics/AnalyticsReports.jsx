import React, { useState } from "react";
import {
    Download, Filter, Search, FileText, TrendingUp, Users, ShoppingCart,
    Calendar, ChevronDown, Eye, MoreHorizontal,
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";

const revenueByCategory = [
    { category: "Electronics", revenue: 82000, target: 75000 },
    { category: "Clothing", revenue: 54000, target: 60000 },
    { category: "Home & Garden", revenue: 38000, target: 35000 },
    { category: "Sports", revenue: 29000, target: 30000 },
    { category: "Beauty", revenue: 21000, target: 25000 },
];

const weeklyTrend = [
    { week: "W1", sales: 12400, returns: 800 },
    { week: "W2", sales: 15200, returns: 1100 },
    { week: "W3", sales: 13800, returns: 950 },
    { week: "W4", sales: 18600, returns: 1300 },
    { week: "W5", sales: 16200, returns: 1050 },
    { week: "W6", sales: 21000, returns: 1450 },
    { week: "W7", sales: 19400, returns: 1200 },
    { week: "W8", sales: 24800, returns: 1600 },
];

const savedReports = [
    { id: 1, name: "Monthly Revenue Report", type: "Revenue", date: "Dec 1, 2024", status: "Ready", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { id: 2, name: "User Acquisition Report", type: "Users", date: "Dec 1, 2024", status: "Ready", icon: Users, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { id: 3, name: "Sales Funnel Analysis", type: "Sales", date: "Nov 28, 2024", status: "Ready", icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { id: 4, name: "Q4 Performance Summary", type: "Revenue", date: "Nov 25, 2024", status: "Processing", icon: FileText, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { id: 5, name: "Customer Retention Report", type: "Users", date: "Nov 20, 2024", status: "Ready", icon: Calendar, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30" },
];

const reportTypes = ["All Types", "Revenue", "Users", "Sales"];

function AnalyticsReports() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All Types");

    const filtered = savedReports.filter((r) => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "All Types" || r.type === typeFilter;
        return matchSearch && matchType;
    });

    return (
        <div className="space-y-6">

            {/* Page Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Reports</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Generated reports, category breakdowns and export history.
                </p>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Reports", value: "24", sub: "This month", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
                    { label: "Scheduled", value: "6", sub: "Auto-generated", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
                    { label: "Exported", value: "18", sub: "As PDF / CSV", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
                ].map((c) => (
                    <div key={c.label} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className={`inline-flex p-2.5 rounded-xl ${c.bg} mb-3`}>
                            <FileText className={`w-5 h-5 ${c.color}`} />
                        </div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{c.value}</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.sub}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Revenue by Category */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Revenue by Category</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Actual vs target this quarter</p>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByCategory} layout="vertical" margin={{ left: 20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} horizontal={false} />
                                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                <YAxis type="category" dataKey="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={90} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                                    labelStyle={{
                                        color: "black",
                                        fontWeight: "600",
                                    }}
                                    itemStyle={{
                                        color: "black",
                                    }}
                                    formatter={(v) => [`$${v.toLocaleString()}`, ""]}
                                />
                                <Bar dataKey="target" fill="#e2e8f0" radius={[0, 4, 4, 0]} maxBarSize={12} name="Target" />
                                <Bar dataKey="revenue" fill="url(#revCatGrad)" radius={[0, 4, 4, 0]} maxBarSize={12} name="Revenue" />
                                <defs>
                                    <linearGradient id="revCatGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Sales vs Returns */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sales vs Returns</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">8-week rolling trend</p>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                                <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                                    formatter={(v) => [`$${v.toLocaleString()}`, ""]}
                                />
                                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#3b82f6" }} activeDot={{ r: 5 }} name="Sales" />
                                <Line type="monotone" dataKey="returns" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b" }} activeDot={{ r: 5 }} name="Returns" strokeDasharray="5 5" />
                                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Saved Reports Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Saved Reports</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Download or view your generated reports</p>
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        {reportTypes.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTypeFilter(t)}
                                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all
                                    ${typeFilter === t
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Report Name</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Type</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Generated</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Status</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.map((report) => {
                                const Icon = report.icon;
                                return (
                                    <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${report.bg}`}>
                                                    <Icon className={`w-4 h-4 ${report.color}`} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-800 dark:text-white">{report.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                                                {report.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{report.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                                                ${report.status === "Ready"
                                                    ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                                                    : "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30"}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
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

export default AnalyticsReports;
