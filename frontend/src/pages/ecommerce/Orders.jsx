import React, { useState } from "react";
import {
    ShoppingCart, Package, Truck, CheckCircle, XCircle, Clock,
    Search, Eye, ArrowUpRight, ArrowDownRight, TrendingUp,
    RefreshCcw, MapPin, Filter, ChevronDown,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const statsData = [
    { title: "Total Orders",    value: "4,821",  change: "+15.4%", trend: "up",   icon: ShoppingCart, color: "from-blue-500 to-indigo-600",   bgColor: "bg-blue-50 dark:bg-blue-900/20",     textColor: "text-blue-600 dark:text-blue-400"      },
    { title: "Pending",         value: "284",    change: "+4.2%",  trend: "down", icon: Clock,        color: "from-amber-500 to-orange-500",  bgColor: "bg-amber-50 dark:bg-amber-900/20",   textColor: "text-amber-600 dark:text-amber-400"    },
    { title: "Shipped",         value: "1,032",  change: "+22.1%", trend: "up",   icon: Truck,        color: "from-purple-500 to-pink-500",   bgColor: "bg-purple-50 dark:bg-purple-900/20", textColor: "text-purple-600 dark:text-purple-400"  },
    { title: "Delivered",       value: "3,412",  change: "+18.7%", trend: "up",   icon: CheckCircle,  color: "from-emerald-500 to-teal-600",  bgColor: "bg-emerald-50 dark:bg-emerald-900/20",textColor: "text-emerald-600 dark:text-emerald-400"},
];

const orderTrend = [
    { month: "Jul", orders: 320, revenue: 24000 },
    { month: "Aug", orders: 410, revenue: 31000 },
    { month: "Sep", orders: 380, revenue: 28500 },
    { month: "Oct", orders: 520, revenue: 41000 },
    { month: "Nov", orders: 610, revenue: 49000 },
    { month: "Dec", orders: 740, revenue: 62000 },
];

const pieData = [
    { name: "Delivered", value: 3412, color: "#10b981" },
    { name: "Shipped",   value: 1032, color: "#8b5cf6" },
    { name: "Pending",   value: 284,  color: "#f59e0b" },
    { name: "Cancelled", value: 93,   color: "#ef4444" },
];

const orders = [
    { id: "#ORD-8821", customer: "Emma Wilson",  avatar: "https://i.pravatar.cc/40?img=9",  product: "AirPods Pro Max",      date: "Dec 12, 2024", amount: "$549", status: "delivered", location: "New York, US"    },
    { id: "#ORD-8820", customer: "John Doe",     avatar: "https://i.pravatar.cc/40?img=1",  product: "Smart Watch Series 9", date: "Dec 12, 2024", amount: "$399", status: "shipped",   location: "London, UK"      },
    { id: "#ORD-8819", customer: "Sarah Smith",  avatar: "https://i.pravatar.cc/40?img=5",  product: "Running Shoes X9",     date: "Dec 11, 2024", amount: "$129", status: "pending",   location: "Toronto, CA"     },
    { id: "#ORD-8818", customer: "Mike Brown",   avatar: "https://i.pravatar.cc/40?img=3",  product: "Minimal Desk Lamp",    date: "Dec 11, 2024", amount: "$89",  status: "delivered", location: "Sydney, AU"      },
    { id: "#ORD-8817", customer: "Chris Lee",    avatar: "https://i.pravatar.cc/40?img=7",  product: "Linen Blazer",         date: "Dec 10, 2024", amount: "$199", status: "cancelled", location: "Berlin, DE"      },
    { id: "#ORD-8816", customer: "Olivia Park",  avatar: "https://i.pravatar.cc/40?img=47", product: "Yoga Mat Pro",         date: "Dec 10, 2024", amount: "$49",  status: "shipped",   location: "Paris, FR"       },
    { id: "#ORD-8815", customer: "Ryan Chen",    avatar: "https://i.pravatar.cc/40?img=12", product: "Ceramic Coffee Mug",   date: "Dec 09, 2024", amount: "$28",  status: "delivered", location: "Mumbai, IN"      },
    { id: "#ORD-8814", customer: "Ava Johnson",  avatar: "https://i.pravatar.cc/40?img=44", product: "Face Serum",           date: "Dec 09, 2024", amount: "$64",  status: "pending",   location: "Dallas, US"      },
];

const statusMeta = {
    delivered: { label: "Delivered", icon: CheckCircle, style: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30" },
    shipped:   { label: "Shipped",   icon: Truck,       style: "text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30"     },
    pending:   { label: "Pending",   icon: Clock,       style: "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"         },
    cancelled: { label: "Cancelled", icon: XCircle,     style: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"                 },
};

const filterTabs = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

function Orders() {
    const [search, setSearch]   = useState("");
    const [activeTab, setTab]   = useState("All");

    const filtered = orders.filter((o) => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase());
        const matchTab    = activeTab === "All" || o.status === activeTab.toLowerCase();
        return matchSearch && matchTab;
    });

    return (
        <div className="space-y-6">

            {/* Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Orders</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track, manage and fulfil customer orders.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {statsData.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 group">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-3">{stat.value}</p>
                                    <div className="flex items-center gap-2">
                                        {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                                        <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{stat.change}</span>
                                        <span className="text-xs text-slate-400">vs last month</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-200`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: stat.trend === "up" ? "70%" : "42%" }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Order Trend */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Order Trend</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Orders and revenue over 6 months</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-slate-500 dark:text-slate-400">Orders</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500" /><span className="text-xs text-slate-500 dark:text-slate-400">Revenue</span></div>
                        </div>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={orderTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Area type="monotone" dataKey="orders"  stroke="#3b82f6" strokeWidth={2.5} fill="url(#ordersGrad)"   dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} />
                                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#revenueGrad2)" dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Order Status Breakdown */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Order Status</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Current distribution</p>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {pieData.map((d) => (
                            <div key={d.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">All Orders</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} orders found</p>
                    </div>
                    <button className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <RefreshCcw className="w-4 h-4" /> Refresh
                    </button>
                </div>

                {/* Filter Tabs + Search */}
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search order, customer, product..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                        {filterTabs.map((tab) => (
                            <button key={tab} onClick={() => setTab(tab)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === tab ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                                {["Order ID", "Customer", "Product", "Date", "Amount", "Status", "Location", "Action"].map((h) => (
                                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.map((order) => {
                                const meta = statusMeta[order.status];
                                const StatusIcon = meta.icon;
                                return (
                                    <tr key={order.id} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-purple-50/40 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200">
                                        <td className="px-5 py-4 text-sm font-bold text-blue-600 dark:text-blue-400">{order.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={order.avatar} alt={order.customer} className="w-8 h-8 rounded-full ring-2 ring-slate-100 dark:ring-slate-800" />
                                                <span className="text-sm font-semibold text-slate-800 dark:text-white">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{order.product}</td>
                                        <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">{order.date}</td>
                                        <td className="px-5 py-4 text-sm font-bold text-slate-800 dark:text-white">{order.amount}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${meta.style}`}>
                                                <StatusIcon className="w-3 h-3" />{meta.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                <MapPin className="w-3 h-3" />{order.location}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
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

export default Orders;
