import React, { useEffect, useState } from "react";
import {
    Package, AlertTriangle, XCircle, CheckCircle, TrendingUp,
    Search, Plus, Edit2, Trash2, RefreshCcw, ArrowUpRight,
    BarChart2, Layers, DollarSign,
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const API = "http://localhost:5000/api/inventory";
const token = () => localStorage.getItem("token");

const categoryColors = {
    Electronics: { bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-600 dark:text-blue-400",   dot: "bg-blue-500"   },
    Sports:      { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400", dot: "bg-green-500"  },
    Home:        { bg: "bg-purple-100 dark:bg-purple-900/30",text: "text-purple-600 dark:text-purple-400",dot:"bg-purple-500"},
    Clothing:    { bg: "bg-pink-100 dark:bg-pink-900/30",   text: "text-pink-600 dark:text-pink-400",   dot: "bg-pink-500"   },
    Beauty:      { bg: "bg-orange-100 dark:bg-orange-900/30",text:"text-orange-600 dark:text-orange-400",dot:"bg-orange-500" },
};

const stockTrendData = [
    { month: "Jul", value: 820 }, { month: "Aug", value: 940 },
    { month: "Sep", value: 870 }, { month: "Oct", value: 1020 },
    { month: "Nov", value: 1180 }, { month: "Dec", value: 1284 },
];

function Inventory() {
    const [items, setItems]       = useState([]);
    const [stats, setStats]       = useState({});
    const [search, setSearch]     = useState("");
    const [catFilter, setCat]     = useState("All");
    const [statusFilter, setStatus] = useState("all");
    const [loading, setLoading]   = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem]  = useState(null);
    const [form, setForm]          = useState({ name: "", sku: "", category: "Electronics", stock: 0, minStock: 10, price: 0, cost: 0, supplier: "", location: "" });

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ search, status: statusFilter });
            if (catFilter !== "All") params.append("category", catFilter);
            const [itemsRes, statsRes] = await Promise.all([
                fetch(`${API}?${params}`, { headers: { Authorization: `Bearer ${token()}` } }),
                fetch(`${API}/stats`,     { headers: { Authorization: `Bearer ${token()}` } }),
            ]);
            setItems(await itemsRes.json());
            setStats(await statsRes.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, [search, catFilter, statusFilter]);

    const openAdd  = () => { setEditItem(null); setForm({ name: "", sku: "", category: "Electronics", stock: 0, minStock: 10, price: 0, cost: 0, supplier: "", location: "" }); setShowModal(true); };
    const openEdit = (item) => { setEditItem(item); setForm(item); setShowModal(true); };

    const save = async () => {
        const method = editItem ? "PUT" : "POST";
        const url    = editItem ? `${API}/${editItem._id}` : API;
        await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify(form) });
        setShowModal(false);
        fetchData();
    };

    const del = async (id) => {
        if (!window.confirm("Delete this item?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
        fetchData();
    };

    const statusMeta = {
        "in-stock":    { label: "In Stock",    icon: CheckCircle,  style: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30" },
        "low-stock":   { label: "Low Stock",   icon: AlertTriangle,style: "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"         },
        "out-of-stock":{ label: "Out of Stock",icon: XCircle,      style: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"                 },
    };

    const radialData = [
        { name: "In Stock",    value: stats.inStock  || 0, fill: "#10b981" },
        { name: "Low Stock",   value: stats.lowStock  || 0, fill: "#f59e0b" },
        { name: "Out of Stock",value: stats.outStock  || 0, fill: "#ef4444" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                    <Plus className="w-4 h-4" /> Add Item
                </button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    { label: "Total Items",   value: stats.total     || 0, icon: Package,    color: "from-blue-500 to-indigo-600",   bg: "bg-blue-50 dark:bg-blue-900/20",     text: "text-blue-600 dark:text-blue-400"      },
                    { label: "In Stock",      value: stats.inStock   || 0, icon: CheckCircle,color: "from-emerald-500 to-teal-600",  bg: "bg-emerald-50 dark:bg-emerald-900/20",text:"text-emerald-600 dark:text-emerald-400"},
                    { label: "Low Stock",     value: stats.lowStock  || 0, icon: AlertTriangle,color:"from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-900/20",   text: "text-amber-600 dark:text-amber-400"    },
                    { label: "Total Value",   value: `$${((stats.totalValue || 0) / 1000).toFixed(1)}K`, icon: DollarSign, color: "from-purple-500 to-pink-600", bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400" },
                ].map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2.5 rounded-xl ${c.bg} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon className={`w-5 h-5 ${c.text}`} />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{c.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.label}</p>
                            <div className={`mt-3 h-1.5 rounded-full bg-gradient-to-r ${c.color} opacity-70`} />
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Stock Growth Area Chart */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Stock Trend</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total items tracked over 6 months</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                            <TrendingUp className="w-3.5 h-3.5" /> +56.6% growth
                        </span>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stockTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} />
                                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#invGrad)" dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stock Status Radial */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Stock Health</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Real-time status breakdown</p>
                    <div className="h-44">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                                <RadialBar dataKey="value" cornerRadius={6} />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.97)", border: "none", borderRadius: "12px" }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-1">
                        {radialData.map((d) => (
                            <div key={d.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                                    <span className="text-slate-600 dark:text-slate-400">{d.name}</span>
                                </div>
                                <span className="font-bold text-slate-800 dark:text-white">{d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {["All","Electronics","Sports","Home","Clothing","Beauty"].map((c) => (
                            <button key={c} onClick={() => setCat(c)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${catFilter === c ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>{c}</button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {["all","in-stock","low-stock","out-of-stock"].map((s) => (
                            <button key={s} onClick={() => setStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>{s === "all" ? "All" : s}</button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-16 text-center text-slate-400">Loading inventory...</div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                                    {["Item","SKU","Category","Stock","Min Stock","Price","Cost","Supplier","Location","Status","Actions"].map((h) => (
                                        <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {items.map((item) => {
                                    const sm = statusMeta[item.status] || statusMeta["in-stock"];
                                    const StatusIcon = sm.icon;
                                    const cat = categoryColors[item.category] || categoryColors["Electronics"];
                                    const stockPct = Math.min((item.stock / (item.minStock * 5)) * 100, 100);
                                    return (
                                        <tr key={item._id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-200">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.image
                                                        ? <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                                                        : <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"><Package className="w-5 h-5 text-white" /></div>
                                                    }
                                                    <span className="text-sm font-semibold text-slate-800 dark:text-white whitespace-nowrap">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">{item.sku}</td>
                                            <td className="px-4 py-4">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}>{item.category}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${item.stock === 0 ? "bg-red-500" : item.stock <= item.minStock ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${stockPct}%` }} />
                                                    </div>
                                                    <span className={`text-sm font-bold ${item.stock === 0 ? "text-red-500" : item.stock <= item.minStock ? "text-amber-500" : "text-slate-800 dark:text-white"}`}>{item.stock}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{item.minStock}</td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-800 dark:text-white">${item.price}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">${item.cost}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">{item.supplier || "—"}</td>
                                            <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">{item.location || "—"}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${sm.style}`}>
                                                    <StatusIcon className="w-3 h-3" />{sm.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-all"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => del(item._id)}  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg shadow-2xl">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{editItem ? "Edit Item" : "Add New Item"}</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4">
                            {[
                                { label: "Item Name",  key: "name",     type: "text"   },
                                { label: "SKU",        key: "sku",      type: "text"   },
                                { label: "Stock",      key: "stock",    type: "number" },
                                { label: "Min Stock",  key: "minStock", type: "number" },
                                { label: "Price ($)",  key: "price",    type: "number" },
                                { label: "Cost ($)",   key: "cost",     type: "number" },
                                { label: "Supplier",   key: "supplier", type: "text"   },
                                { label: "Location",   key: "location", type: "text"   },
                            ].map((f) => (
                                <div key={f.key}>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{f.label}</label>
                                    <input type={f.type} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? +e.target.value : e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                </div>
                            ))}
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Category</label>
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    {["Electronics","Sports","Home","Clothing","Beauty"].map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="p-6 pt-0 flex gap-3">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                            <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                                {editItem ? "Save Changes" : "Add Item"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inventory;
