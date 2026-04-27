import React, { useState } from "react";
import {
    Package, Plus, Search, Filter, Star, TrendingUp, TrendingDown,
    ArrowUpRight, ArrowDownRight, Edit2, Trash2, Eye, MoreHorizontal,
    Grid, List, Tag, ShoppingBag, AlertCircle, CheckCircle,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";

const statsData = [
    { title: "Total Products",   value: "1,284",  change: "+24",    trend: "up",   icon: Package,     color: "from-blue-500 to-indigo-600",    bgColor: "bg-blue-50 dark:bg-blue-900/20",     textColor: "text-blue-600 dark:text-blue-400"     },
    { title: "Active Listings",  value: "1,102",  change: "+12.5%", trend: "up",   icon: CheckCircle, color: "from-emerald-500 to-teal-600",   bgColor: "bg-emerald-50 dark:bg-emerald-900/20",textColor: "text-emerald-600 dark:text-emerald-400"},
    { title: "Low Stock Items",  value: "38",     change: "+8",     trend: "down", icon: AlertCircle, color: "from-orange-500 to-red-500",     bgColor: "bg-orange-50 dark:bg-orange-900/20", textColor: "text-orange-600 dark:text-orange-400" },
    { title: "Total Revenue",    value: "$84.2K", change: "+18.4%", trend: "up",   icon: TrendingUp,  color: "from-purple-500 to-pink-600",    bgColor: "bg-purple-50 dark:bg-purple-900/20", textColor: "text-purple-600 dark:text-purple-400" },
];

const salesTrend = [
    { month: "Jul", sales: 320 }, { month: "Aug", sales: 410 },
    { month: "Sep", sales: 380 }, { month: "Oct", sales: 520 },
    { month: "Nov", sales: 610 }, { month: "Dec", sales: 740 },
];

const categoryData = [
    { name: "Electronics", value: 420, color: "#3b82f6" },
    { name: "Clothing",    value: 310, color: "#8b5cf6" },
    { name: "Home",        value: 228, color: "#10b981" },
    { name: "Sports",      value: 189, color: "#f59e0b" },
    { name: "Beauty",      value: 137, color: "#ec4899" },
];

const products = [
    { id: 1, name: "AirPods Pro Max",       category: "Electronics", price: "$549",  stock: 142, sold: 384, rating: 4.9, status: "active",   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop" },
    { id: 2, name: "Running Shoes X9",      category: "Sports",      price: "$129",  stock: 56,  sold: 621, rating: 4.7, status: "active",   image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop" },
    { id: 3, name: "Minimal Desk Lamp",     category: "Home",        price: "$89",   stock: 8,   sold: 203, rating: 4.5, status: "low",      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=60&h=60&fit=crop" },
    { id: 4, name: "Linen Blazer",          category: "Clothing",    price: "$199",  stock: 0,   sold: 178, rating: 4.3, status: "inactive", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=60&h=60&fit=crop" },
    { id: 5, name: "Smart Watch Series 9",  category: "Electronics", price: "$399",  stock: 74,  sold: 512, rating: 4.8, status: "active",   image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop" },
    { id: 6, name: "Hydration Face Serum",  category: "Beauty",      price: "$64",   stock: 5,   sold: 890, rating: 4.6, status: "low",      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop" },
    { id: 7, name: "Yoga Mat Pro",          category: "Sports",      price: "$49",   stock: 230, sold: 445, rating: 4.4, status: "active",   image: "https://images.unsplash.com/photo-1601925228100-4e82e36a54a1?w=60&h=60&fit=crop" },
    { id: 8, name: "Ceramic Coffee Mug",    category: "Home",        price: "$28",   stock: 412, sold: 1240,rating: 4.7, status: "active",   image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=60&h=60&fit=crop" },
];

const categories = ["All", "Electronics", "Clothing", "Home", "Sports", "Beauty"];
const statusFilters = ["all", "active", "low", "inactive"];

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{rating}</span>
        </div>
    );
}

function Products() {
    const [search, setSearch]       = useState("");
    const [category, setCategory]   = useState("All");
    const [status, setStatus]       = useState("all");
    const [viewMode, setViewMode]   = useState("table");

    const filtered = products.filter((p) => {
        const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || p.category === category;
        const matchStatus   = status === "all" || p.status === status;
        return matchSearch && matchCategory && matchStatus;
    });

    const statusStyle = (s) => {
        if (s === "active")   return "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30";
        if (s === "low")      return "text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
        if (s === "inactive") return "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
    };

    return (
        <div className="space-y-6">

            {/* Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Products</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your product catalogue, stock and pricing.</p>
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
                                        {stat.trend === "up"
                                            ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                                            : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                                        <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{stat.change}</span>
                                        <span className="text-xs text-slate-400">vs last month</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-200`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: stat.trend === "up" ? "72%" : "38%" }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Sales Trend */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sales Trend</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Units sold over 6 months</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                            <TrendingUp className="w-3.5 h-3.5" /> +23% growth
                        </span>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="prodSalesGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fill="url(#prodSalesGrad)" dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#3b82f6" }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">By Category</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Product distribution</p>
                    <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32}>
                                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {categoryData.slice(0, 3).map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-xs text-slate-600 dark:text-slate-400">{cat.name}</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{cat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">

                {/* Table Header */}
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Product Catalogue</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} products</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            <button onClick={() => setViewMode("table")} className={`p-1.5 rounded-lg transition-all ${viewMode === "table" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-400"}`}><List className="w-4 h-4" /></button>
                            <button onClick={() => setViewMode("grid")}  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid"  ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-400"}`}><Grid className="w-4 h-4" /></button>
                        </div>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                            <Plus className="w-4 h-4" /> Add Product
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((c) => (
                            <button key={c} onClick={() => setCategory(c)}
                                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${category === c ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {statusFilters.map((s) => (
                            <button key={s} onClick={() => setStatus(s)}
                                className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${status === s ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                {viewMode === "table" ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                                    {["Product", "Category", "Price", "Stock", "Sold", "Rating", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-purple-50/40 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200 group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={p.image} alt={p.name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all" />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-800 dark:text-white">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-slate-800 dark:text-white">{p.price}</td>
                                        <td className="px-5 py-4">
                                            <span className={`text-sm font-semibold ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-orange-500" : "text-slate-700 dark:text-slate-300"}`}>
                                                {p.stock === 0 ? "Out of stock" : p.stock}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{p.sold.toLocaleString()}</td>
                                        <td className="px-5 py-4"><StarRating rating={p.rating} /></td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusStyle(p.status)}`}>{p.status}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-all"><Eye className="w-4 h-4" /></button>
                                                <button className="p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-400 hover:text-purple-500 transition-all"><Edit2 className="w-4 h-4" /></button>
                                                <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Grid View */
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {filtered.map((p) => (
                            <div key={p.id} className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
                                <div className="relative h-40 overflow-hidden">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <span className={`absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${statusStyle(p.status)}`}>{p.status}</span>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1 truncate">{p.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{p.category}</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-base font-bold text-slate-800 dark:text-white">{p.price}</span>
                                        <StarRating rating={p.rating} />
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                                        <span>Stock: <b className={p.stock < 10 ? "text-orange-500" : "text-slate-700 dark:text-slate-300"}>{p.stock}</b></span>
                                        <span>Sold: <b className="text-slate-700 dark:text-slate-300">{p.sold}</b></span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity">Edit</button>
                                        <button className="p-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
