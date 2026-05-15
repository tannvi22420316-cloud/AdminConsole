import React, { useEffect, useState } from "react";
import {
    Mail, Star, Trash2, Search, RefreshCcw, Send,
    AlertCircle, Inbox, Archive, Tag, ChevronRight,
    Clock, Circle, CheckCheck, X, Reply, Forward,
} from "lucide-react";

const API   = "https://rubiscape-admin-console.onrender.com/api/messages";
const token = () => localStorage.getItem("token");

const priorityMeta = {
    high:   { style: "text-red-500 bg-red-50 dark:bg-red-900/20",    dot: "bg-red-500"    },
    medium: { style: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", dot: "bg-amber-400" },
    low:    { style: "text-slate-400 bg-slate-50 dark:bg-slate-800",  dot: "bg-slate-400"  },
};

const sidebarTags = [
    { id: "inbox",  label: "Inbox",   icon: Inbox },
    { id: "sent",   label: "Sent",    icon: Send  },
    { id: "draft",  label: "Drafts",  icon: Archive },
    { id: "spam",   label: "Spam",    icon: AlertCircle },
    { id: "trash",  label: "Trash",   icon: Trash2 },
];

function Messages() {
    const [messages, setMessages]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [search, setSearch]       = useState("");
    const [tag, setTag]             = useState("inbox");
    const [selected, setSelected]   = useState(null);
    const [composing, setComposing] = useState(false);
    const [newMsg, setNewMsg]       = useState({ sender: "Tannvi Kamble", subject: "", body: "", priority: "medium" });

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ tag, search });
            const res = await fetch(`${API}?${params}`, { headers: { Authorization: `Bearer ${token()}` } });
            setMessages(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchMessages(); }, [tag, search]);

    const markRead = async (msg) => {
        if (!msg.read) {
            await fetch(`${API}/${msg._id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify({ read: true }) });
            setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, read: true } : m));
        }
        setSelected(msg);
    };

    const toggleStar = async (e, msg) => {
        e.stopPropagation();
        await fetch(`${API}/${msg._id}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify({ starred: !msg.starred }) });
        setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, starred: !m.starred } : m));
        if (selected?._id === msg._id) setSelected({ ...selected, starred: !selected.starred });
    };

    const deleteMsg = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selected?._id === id) setSelected(null);
    };

    const sendMessage = async () => {
        await fetch(API, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify({ ...newMsg, tag: "sent", date: new Date() }) });
        setComposing(false);
        setNewMsg({ sender: "Tannvi Kamble", subject: "", body: "", priority: "medium" });
        fetchMessages();
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    const formatTime = (d) => {
        const date = new Date(d);
        const now  = new Date();
        const diff = now - date;
        if (diff < 86400000) return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="space-y-4">

            <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[600px]">

                {/* LEFT SIDEBAR */}
                <div className="w-52 flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col">
                    <div className="p-4">
                        <button onClick={() => setComposing(true)} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                            <Send className="w-4 h-4" /> Compose
                        </button>
                    </div>

                    <nav className="flex-1 px-3 space-y-1">
                        {sidebarTags.map((t) => {
                            const Icon = t.icon;
                            const isActive = tag === t.id;
                            const count = t.id === "inbox" ? unreadCount : 0;
                            return (
                                <button key={t.id} onClick={() => { setTag(t.id); setSelected(null); }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        {t.label}
                                    </div>
                                    {count > 0 && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/30 text-white" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>{count}</span>}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
                        <div className="text-xs text-slate-400 font-medium mb-2">Storage</div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                        </div>
                        <div className="text-xs text-slate-400 mt-1">6.8 GB of 10 GB used</div>
                    </div>
                </div>

                {/* MESSAGE LIST */}
                <div className={`flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ${selected ? "w-72 flex-shrink-0" : "flex-1"}`}>
                    {/* Search */}
                    <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Message Items */}
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <div className="p-12 text-center text-slate-400">Loading...</div>
                        ) : messages.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">No messages found.</div>
                        ) : messages.map((msg) => {
                            const pm = priorityMeta[msg.priority] || priorityMeta.medium;
                            const isSelected = selected?._id === msg._id;
                            return (
                                <div key={msg._id} onClick={() => markRead(msg)}
                                    className={`p-4 cursor-pointer transition-all duration-150 ${isSelected ? "bg-blue-50/70 dark:bg-blue-900/20 border-r-2 border-blue-500" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}>
                                    <div className="flex items-start gap-3">
                                        {/* Avatar */}
                                        <div className="relative flex-shrink-0">
                                            {msg.avatar
                                                ? <img src={msg.avatar} alt="" className="w-9 h-9 rounded-full ring-2 ring-slate-100 dark:ring-slate-800" />
                                                : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">{msg.sender[0]}</div>
                                            }
                                            {!msg.read && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={`text-sm truncate ${!msg.read ? "font-bold text-slate-800 dark:text-white" : "font-medium text-slate-700 dark:text-slate-300"}`}>{msg.sender}</span>
                                                <span className="text-xs text-slate-400 flex-shrink-0">{formatTime(msg.date)}</span>
                                            </div>
                                            <p className={`text-xs truncate mt-0.5 ${!msg.read ? "font-semibold text-slate-700 dark:text-slate-200" : "text-slate-600 dark:text-slate-400"}`}>{msg.subject}</p>
                                            <p className="text-xs text-slate-400 truncate mt-0.5">{msg.body}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${pm.style}`}>{msg.priority}</span>
                                                <button onClick={(e) => toggleStar(e, msg)}>
                                                    <Star className={`w-3.5 h-3.5 transition-colors ${msg.starred ? "fill-yellow-400 text-yellow-400" : "text-slate-300 hover:text-yellow-400"}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MESSAGE DETAIL */}
                {selected && (
                    <div className="flex-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col">
                        {/* Detail Header */}
                        <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {selected.avatar
                                    ? <img src={selected.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-blue-200 dark:ring-blue-800" />
                                    : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">{selected.sender[0]}</div>
                                }
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white">{selected.sender}</p>
                                    <p className="text-xs text-slate-400">{selected.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={(e) => toggleStar(e, selected)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <Star className={`w-4 h-4 ${selected.starred ? "fill-yellow-400 text-yellow-400" : "text-slate-400"}`} />
                                </button>
                                <button onClick={() => deleteMsg(selected._id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Subject + Meta */}
                        <div className="px-6 pt-5">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{selected.subject}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{new Date(selected.date).toLocaleString()}</div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${priorityMeta[selected.priority]?.style}`}>{selected.priority} priority</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 leading-relaxed text-slate-700 dark:text-slate-300 text-sm">
                                {selected.body}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-5 border-t border-slate-200/50 dark:border-slate-700/50 flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
                                <Reply className="w-4 h-4" /> Reply
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <Forward className="w-4 h-4" /> Forward
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Compose Modal */}
            {composing && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg shadow-2xl">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white">New Message</h3>
                            <button onClick={() => setComposing(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <div className="p-4 space-y-3">
                            <input placeholder="Subject" value={newMsg.subject} onChange={(e) => setNewMsg({ ...newMsg, subject: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <textarea rows={6} placeholder="Write your message..." value={newMsg.body} onChange={(e) => setNewMsg({ ...newMsg, body: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            <select value={newMsg.priority} onChange={(e) => setNewMsg({ ...newMsg, priority: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>
                        <div className="p-4 pt-0 flex gap-3">
                            <button onClick={() => setComposing(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400">Cancel</button>
                            <button onClick={sendMessage} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-blue-500/25">Send Message</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Messages;
