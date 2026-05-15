import React, { useEffect, useState } from "react";
import {
    FileText, Download, Eye, Trash2, Plus, RefreshCcw,
    TrendingUp, Users, Package, ShoppingCart, Search,
    CheckCircle, Clock, XCircle, BarChart2, Calendar,
    ChevronRight, Sparkles,
} from "lucide-react";

const API   = "https://rubiscape-admin-console.onrender.com/api/reports";
const token = () => localStorage.getItem("token");

const typeMeta = {
    revenue:   { icon: TrendingUp,  color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-900/20",     gradient: "from-blue-500 to-indigo-600"    },
    users:     { icon: Users,       color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20",   gradient: "from-emerald-500 to-teal-600"   },
    inventory: { icon: Package,     color: "text-purple-600 dark:text-purple-400",bg:"bg-purple-50 dark:bg-purple-900/20", gradient: "from-purple-500 to-pink-600"    },
    sales:     { icon: ShoppingCart,color: "text-orange-600 dark:text-orange-400",bg:"bg-orange-50 dark:bg-orange-900/20", gradient: "from-orange-500 to-red-500"     },
    custom:    { icon: BarChart2,   color: "text-pink-600 dark:text-pink-400",   bg: "bg-pink-50 dark:bg-pink-900/20",     gradient: "from-pink-500 to-purple-600"    },
};

const statusMeta = {
    ready:      { icon: CheckCircle, style: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30", label: "Ready"      },
    processing: { icon: Clock,       style: "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",         label: "Processing" },
    failed:     { icon: XCircle,     style: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30",                 label: "Failed"     },
};

const quickReports = [
    { title: "Revenue Report",    desc: "Monthly income breakdown",        type: "revenue",   icon: TrendingUp,   gradient: "from-blue-500 to-indigo-600"   },
    { title: "User Analytics",    desc: "Acquisition & retention data",    type: "users",     icon: Users,        gradient: "from-emerald-500 to-teal-600"  },
    { title: "Inventory Summary", desc: "Stock levels and valuation",      type: "inventory", icon: Package,      gradient: "from-purple-500 to-pink-600"   },
    { title: "Sales Funnel",      desc: "Conversion & order analytics",    type: "sales",     icon: ShoppingCart, gradient: "from-orange-500 to-red-500"    },
];

function Reports() {
    const [reports, setReports]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState("");
    const [typeFilter, setType]   = useState("all");
    const [generating, setGen]    = useState(null);
    const [showCustom, setCustom] = useState(false);
    const [customForm, setCustomForm] = useState({ title: "", type: "revenue", from: "", to: "" });

    const fetchReports = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (typeFilter !== "all") params.append("type", typeFilter);
            const res = await fetch(`${API}?${params}`, { headers: { Authorization: `Bearer ${token()}` } });
            setReports(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchReports(); }, [typeFilter]);

    const generateQuick = async (r) => {
        setGen(r.type);
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
            body: JSON.stringify({ title: r.title, type: r.type, generatedBy: "Tannvi Kamble", dateRange: { from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), to: new Date() } }),
        });
        setTimeout(() => { setGen(null); fetchReports(); }, 3500);
    };

    const generateCustom = async () => {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
            body: JSON.stringify({ ...customForm, generatedBy: "Tannvi Kamble", dateRange: { from: customForm.from, to: customForm.to } }),
        });
        setCustom(false);
        setTimeout(fetchReports, 3500);
    };

    const del = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
        fetchReports();
    };

    const filtered = reports.filter((r) =>
        r.title?.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button onClick={() => setCustom(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                    <Plus className="w-4 h-4" /> Custom Report
                </button>
            </div>

            {/* Quick Generate Cards */}
            <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Quick Generate
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {quickReports.map((r) => {
                        const Icon    = r.icon;
                        const isGenning = generating === r.type;
                        return (
                            <div key={r.type} className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 overflow-hidden hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300">
                                {/* Bg gradient orb */}
                                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${r.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${r.gradient} mb-4 shadow-lg`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">{r.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{r.desc}</p>
                                <button onClick={() => !isGenning && generateQuick(r)} disabled={isGenning}
                                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all
                                        ${isGenning ? "bg-slate-100 dark:bg-slate-800 text-slate-400" : `bg-gradient-to-r ${r.gradient} text-white hover:opacity-90 shadow-md`}`}>
                                    {isGenning ? <><RefreshCcw className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Plus className="w-3.5 h-3.5" /> Generate</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reports List */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex gap-1.5">
                        {["all","revenue","users","inventory","sales","custom"].map((t) => (
                            <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${typeFilter === t ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>{t}</button>
                        ))}
                    </div>
                    <button onClick={fetchReports} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                {/* Report Cards Grid */}
                {loading ? (
                    <div className="p-16 text-center text-slate-400">Loading reports...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-16 text-center text-slate-400">No reports found. Generate one above.</div>
                ) : (
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((r) => {
                            const tm = typeMeta[r.type]    || typeMeta.custom;
                            const sm = statusMeta[r.status] || statusMeta.processing;
                            const TypeIcon   = tm.icon;
                            const StatusIcon = sm.icon;
                            return (
                                <div key={r._id} className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
                                    {/* Top accent */}
                                    <div className={`h-1 bg-gradient-to-r ${tm.gradient}`} />
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-2.5 rounded-xl ${tm.bg}`}>
                                                <TypeIcon className={`w-5 h-5 ${tm.color}`} />
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${sm.style}`}>
                                                <StatusIcon className="w-3 h-3" />{sm.label}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1 truncate">{r.title}</h4>
                                        <p className="text-xs text-slate-400 capitalize mb-3">{r.type} report</p>
                                        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                <span>Generated: {formatDate(r.createdAt)}</span>
                                            </div>
                                            {r.dateRange?.from && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{formatDate(r.dateRange.from)} – {formatDate(r.dateRange.to)}</span>
                                                </div>
                                            )}
                                            {r.size && <div className="text-xs text-slate-400">Size: {r.size}</div>}
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <button disabled={r.status !== "ready"} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${r.status === "ready" ? `bg-gradient-to-r ${tm.gradient} text-white hover:opacity-90 shadow-md` : "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"}`}>
                                                <Download className="w-3.5 h-3.5" /> Download
                                            </button>
                                            <button className="p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => del(r._id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Custom Report Modal */}
            {showCustom && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md shadow-2xl">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Custom Report</h3>
                            <button onClick={() => setCustom(false)}><XCircle className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Report Title</label>
                                <input type="text" placeholder="e.g. Q4 Customer Report" value={customForm.title} onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Report Type</label>
                                <select value={customForm.type} onChange={(e) => setCustomForm({ ...customForm, type: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {["revenue","users","inventory","sales","custom"].map((t) => <option key={t} className="capitalize">{t}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">From Date</label>
                                    <input type="date" value={customForm.from} onChange={(e) => setCustomForm({ ...customForm, from: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">To Date</label>
                                    <input type="date" value={customForm.to} onChange={(e) => setCustomForm({ ...customForm, to: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 pt-0 flex gap-3">
                            <button onClick={() => setCustom(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400">Cancel</button>
                            <button onClick={generateCustom} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-blue-500/25">Generate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;
