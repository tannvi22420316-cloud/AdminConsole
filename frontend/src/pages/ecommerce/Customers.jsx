import React, { useState } from "react";
import {
    Users, UserPlus, TrendingUp, DollarSign, Star, Search,
    ArrowUpRight, ArrowDownRight, Eye, Mail, Phone,
    MapPin, ShoppingBag, Crown, Shield, User,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";

const statsData = [
    { title: "Total Customers",  value: "12,480", change: "+8.2%",  trend: "up",   icon: Users,     color: "from-blue-500 to-indigo-600",    bgColor: "bg-blue-50 dark:bg-blue-900/20",     textColor: "text-blue-600 dark:text-blue-400"      },
    { title: "New This Month",   value: "842",    change: "+14.5%", trend: "up",   icon: UserPlus,  color: "from-emerald-500 to-teal-600",   bgColor: "bg-emerald-50 dark:bg-emerald-900/20",textColor: "text-emerald-600 dark:text-emerald-400"},
    { title: "Avg. Order Value", value: "$148",   change: "+5.3%",  trend: "up",   icon: TrendingUp,color: "from-purple-500 to-pink-600",    bgColor: "bg-purple-50 dark:bg-purple-900/20", textColor: "text-purple-600 dark:text-purple-400"  },
    { title: "Total Spent",      value: "$2.1M",  change: "+21.8%", trend: "up",   icon: DollarSign,color: "from-orange-500 to-red-500",     bgColor: "bg-orange-50 dark:bg-orange-900/20", textColor: "text-orange-600 dark:text-orange-400"  },
];

const acquisitionData = [
    { month: "Jul", new: 520, returning: 840 },
    { month: "Aug", new: 680, returning: 920 },
    { month: "Sep", new: 610, returning: 870 },
    { month: "Oct", new: 740, returning: 1020 },
    { month: "Nov", new: 820, returning: 1140 },
    { month: "Dec", new: 960, returning: 1280 },
];

const spendData = [
    { range: "<$100",    count: 3820, color: "#94a3b8" },
    { range: "$100-500", count: 5140, color: "#3b82f6" },
    { range: "$500-1K",  count: 2310, color: "#8b5cf6" },
    { range: ">$1K",     count: 1210, color: "#10b981" },
];

const customers = [
    { id: 1, name: "Emma Wilson",   avatar: "https://i.pravatar.cc/40?img=9",  email: "emma@email.com",  phone: "+1 234 567 890", location: "New York, US",  orders: 48, spent: "$6,842", tier: "vip",      joined: "Jan 2023",  rating: 4.9 },
    { id: 2, name: "John Doe",      avatar: "https://i.pravatar.cc/40?img=1",  email: "john@email.com",  phone: "+1 345 678 901", location: "London, UK",   orders: 31, spent: "$4,210", tier: "premium",  joined: "Mar 2023",  rating: 4.7 },
    { id: 3, name: "Sarah Smith",   avatar: "https://i.pravatar.cc/40?img=5",  email: "sarah@email.com", phone: "+1 456 789 012", location: "Toronto, CA",  orders: 22, spent: "$2,940", tier: "premium",  joined: "Jun 2023",  rating: 4.5 },
    { id: 4, name: "Mike Brown",    avatar: "https://i.pravatar.cc/40?img=3",  email: "mike@email.com",  phone: "+1 567 890 123", location: "Sydney, AU",   orders: 17, spent: "$1,840", tier: "standard", joined: "Aug 2023",  rating: 4.3 },
    { id: 5, name: "Olivia Park",   avatar: "https://i.pravatar.cc/40?img=47", email: "olivia@email.com",phone: "+1 678 901 234", location: "Paris, FR",    orders: 12, spent: "$1,240", tier: "standard", joined: "Sep 2023",  rating: 4.4 },
    { id: 6, name: "Chris Lee",     avatar: "https://i.pravatar.cc/40?img=7",  email: "chris@email.com", phone: "+1 789 012 345", location: "Berlin, DE",   orders: 8,  spent: "$740",  tier: "new",      joined: "Nov 2023",  rating: 4.1 },
    { id: 7, name: "Ava Johnson",   avatar: "https://i.pravatar.cc/40?img=44", email: "ava@email.com",   phone: "+1 890 123 456", location: "Dallas, US",   orders: 5,  spent: "$420",  tier: "new",      joined: "Dec 2023",  rating: 4.2 },
    { id: 8, name: "Ryan Chen",     avatar: "https://i.pravatar.cc/40?img=12", email: "ryan@email.com",  phone: "+1 901 234 567", location: "Mumbai, IN",   orders: 3,  spent: "$210",  tier: "new",      joined: "Dec 2023",  rating: 4.0 },
];

const tierMeta = {
    vip:      { label: "VIP",      icon: Crown,  style: "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",  dot: "bg-yellow-400" },
    premium:  { label: "Premium",  icon: Shield, style: "text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",  dot: "bg-purple-400" },
    standard: { label: "Standard", icon: Star,   style: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",          dot: "bg-blue-400"   },
    new:      { label: "New",      icon: User,   style: "text-slate-700 bg-slate-100 dark:text-slate-400 dark:bg-slate-700",         dot: "bg-slate-400"  },
};

const tiers = ["All", "VIP", "Premium", "Standard", "New"];

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{rating}</span>
        </div>
    );
}

function Customers() {
    const [search, setSearch]   = useState("");
    const [tierFilter, setTier] = useState("All");

    const filtered = customers.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        const matchTier   = tierFilter === "All" || c.tier === tierFilter.toLowerCase();
        return matchSearch && matchTier;
    });

    return (
        <div className="space-y-6">

            {/* Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Customers</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View, segment and manage your customer base.</p>
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
                                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: "72%" }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Acquisition Trend */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Customer Acquisition</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">New vs returning customers</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-slate-500 dark:text-slate-400">New</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-500 dark:text-slate-400">Returning</span></div>
                        </div>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={acquisitionData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Area type="monotone" dataKey="new"       stroke="#3b82f6" strokeWidth={2.5} fill="url(#newGrad)"    dot={{ r: 4, fill: "#3b82f6",  strokeWidth: 0 }} />
                                <Area type="monotone" dataKey="returning" stroke="#10b981" strokeWidth={2.5} fill="url(#returnGrad)" dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Spend Distribution */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Spend Distribution</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Customers by total spend</p>
                    <div className="h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="range" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={36}>
                                    {spendData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {spendData.map((d) => (
                            <div key={d.range} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-xs text-slate-600 dark:text-slate-400">{d.range}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.count.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Customers Cards */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Customer List</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} customers</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {tiers.map((t) => (
                            <button key={t} onClick={() => setTier(t)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${tierFilter === t ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                                {["Customer", "Contact", "Location", "Orders", "Total Spent", "Rating", "Tier", "Joined", "Action"].map((h) => (
                                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 uppercase tracking-wide">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.map((c) => {
                                const tier = tierMeta[c.tier];
                                const TierIcon = tier.icon;
                                return (
                                    <tr key={c.id} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-purple-50/40 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full ring-2 ring-slate-100 dark:ring-slate-800" />
                                                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${tier.dot}`} />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-800 dark:text-white">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                    <Mail className="w-3 h-3" />{c.email}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                    <Phone className="w-3 h-3" />{c.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                <MapPin className="w-3 h-3" />{c.location}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />{c.orders}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm font-bold text-slate-800 dark:text-white">{c.spent}</td>
                                        <td className="px-5 py-4"><StarRating rating={c.rating} /></td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${tier.style}`}>
                                                <TierIcon className="w-3 h-3" />{tier.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{c.joined}</td>
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

export default Customers;
