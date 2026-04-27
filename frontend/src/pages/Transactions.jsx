import React, { useEffect, useState } from "react";
import {
    CreditCard, DollarSign, ArrowUpRight, ArrowDownRight,
    RefreshCcw, Search, CheckCircle, Clock, XCircle,
    TrendingUp, Wallet, Building, Bitcoin, Filter,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";

const API   = "http://localhost:5000/api/transactions";
const token = () => localStorage.getItem("token");

const monthlyData = [
    { month: "Jul", income: 42000, expense: 18000 },
    { month: "Aug", income: 58000, expense: 22000 },
    { month: "Sep", income: 51000, expense: 19000 },
    { month: "Oct", income: 67000, expense: 25000 },
    { month: "Nov", income: 74000, expense: 28000 },
    { month: "Dec", income: 89000, expense: 31000 },
];

const methodIcons = {
    card:       { icon: CreditCard, color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30"    },
    paypal:     { icon: Wallet,     color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    bank:       { icon: Building,   color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30"  },
    crypto:     { icon: Bitcoin,    color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30"},
    wallet:     { icon: Wallet,     color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30"},
};

const typeMeta = {
    credit:     { label: "Credit",     style: "text-emerald-600 dark:text-emerald-400", sign: "+"  },
    debit:      { label: "Debit",      style: "text-red-600 dark:text-red-400",         sign: "-"  },
    refund:     { label: "Refund",     style: "text-blue-600 dark:text-blue-400",       sign: "+"  },
    withdrawal: { label: "Withdrawal", style: "text-orange-600 dark:text-orange-400",   sign: "-"  },
};

const statusMeta = {
    completed: { icon: CheckCircle, style: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30" },
    pending:   { icon: Clock,       style: "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"         },
    failed:    { icon: XCircle,     style: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"                 },
    refunded:  { icon: RefreshCcw,  style: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30"             },
};

const filterTabs = ["All", "Credit", "Debit", "Refund", "Withdrawal"];
const statusTabs = ["all", "completed", "pending", "failed", "refunded"];

function Transactions() {
    const [txns, setTxns]         = useState([]);
    const [stats, setStats]       = useState({});
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState("");
    const [typeFilter, setType]   = useState("All");
    const [statusFilter, setStatus] = useState("all");

    useEffect(() => {    
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({ search, status: statusFilter });
                if (typeFilter !== "All") params.append("type", typeFilter.toLowerCase());
                const [txRes, stRes] = await Promise.all([
                    fetch(`${API}?${params}`, { headers: { Authorization: `Bearer ${token()}` } }),
                    fetch(`${API}/stats`,     { headers: { Authorization: `Bearer ${token()}` } }),
                ]);
                setTxns(await txRes.json());
                setStats(await stRes.json());
            } catch (e) { console.error(e); }
            setLoading(false);
        };
        
        fetchData();
        }, [search, typeFilter, statusFilter]);

    const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formatTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="space-y-6">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    { label: "Total Revenue",    value: `$${((stats.revenue || 0) / 1000).toFixed(1)}K`, icon: TrendingUp,  color: "from-emerald-500 to-teal-600",   bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", trend: "up"   },
                    { label: "Total Refunds",    value: `$${((stats.refunds  || 0) / 1000).toFixed(1)}K`, icon: RefreshCcw, color: "from-blue-500 to-indigo-600",    bg: "bg-blue-50 dark:bg-blue-900/20",       text: "text-blue-600 dark:text-blue-400",       trend: "down" },
                    { label: "Pending",          value: stats.pending   || 0, icon: Clock,       color: "from-amber-500 to-orange-500",  bg: "bg-amber-50 dark:bg-amber-900/20",     text: "text-amber-600 dark:text-amber-400",     trend: "down" },
                    { label: "Completed",        value: stats.completed || 0, icon: CheckCircle, color: "from-purple-500 to-pink-600",   bg: "bg-purple-50 dark:bg-purple-900/20",   text: "text-purple-600 dark:text-purple-400",   trend: "up"   },
                ].map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2.5 rounded-xl ${c.bg} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon className={`w-5 h-5 ${c.text}`} />
                                </div>
                                {c.trend === "up" ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{c.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{c.label}</p>
                            <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${c.color}`} />
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Cash Flow</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Income vs expenses over 6 months</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-500 dark:text-slate-400">Income</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400" /><span className="text-xs text-slate-500 dark:text-slate-400">Expense</span></div>
                    </div>
                </div>
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} formatter={(v) => [`$${v.toLocaleString()}`, ""]} />
                            <Area type="monotone" dataKey="income"  stroke="#10b981" strokeWidth={2.5} fill="url(#incomeGrad)"  dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2.5} fill="url(#expenseGrad)" dot={{ r: 4, fill: "#f87171", strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search by customer or transaction ID..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {filterTabs.map((t) => (
                            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === t ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow" : "text-slate-500 dark:text-slate-400"}`}>{t}</button>
                        ))}
                    </div>
                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {statusTabs.map((s) => (
                            <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow" : "text-slate-500 dark:text-slate-400"}`}>{s}</button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-16 text-center text-slate-400">Loading transactions...</div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                                    {["Transaction","Customer","Method","Category","Date & Time","Amount","Status"].map((h) => (
                                        <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-5 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {txns.map((txn) => {
                                    const sm  = statusMeta[txn.status] || statusMeta.pending;
                                    const tm  = typeMeta[txn.type]    || typeMeta.credit;
                                    const mm  = methodIcons[txn.method] || methodIcons.card;
                                    const MethodIcon = mm.icon;
                                    const StatusIcon = sm.icon;
                                    return (
                                        <tr key={txn._id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200">
                                            <td className="px-5 py-4 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{txn.transactionId}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={txn.avatar || `https://i.pravatar.cc/40?u=${txn.email}`} alt="" className="w-8 h-8 rounded-full ring-2 ring-slate-100 dark:ring-slate-800" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{txn.customer}</p>
                                                        <p className="text-xs text-slate-400">{txn.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${mm.bg}`}>
                                                    <MethodIcon className={`w-3.5 h-3.5 ${mm.color}`} />
                                                    <span className={`text-xs font-medium capitalize ${mm.color}`}>{txn.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{txn.category}</td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm text-slate-700 dark:text-slate-300">{formatDate(txn.date)}</p>
                                                <p className="text-xs text-slate-400">{formatTime(txn.date)}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`text-sm font-bold ${tm.style}`}>
                                                    {tm.sign}${txn.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${sm.style}`}>
                                                    <StatusIcon className="w-3 h-3" />{txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Transactions;
