import React, { useState } from "react";
import {
    Palette, Bell, Key, Shield, Moon, Sun,
    Monitor, Check, ChevronRight, Zap, Eye, EyeOff, Copy,
    Wifi, Trash2, Download, AlertTriangle, Mail, Smartphone,
} from "lucide-react";

// ─── Reusable Sub-components ───────────────────────────────────────────────

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${
            enabled
                ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                : "bg-slate-200 dark:bg-slate-700"
        }`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
);

const SectionHeader = ({ title, subtitle, gradient, icon: Icon }) => (
    <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
    </div>
);

const Card = ({ children, className = "" }) => (
    <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 ${className}`}>
        {children}
    </div>
);

const SettingRow = ({ label, description, children, noBorder }) => (
    <div className={`flex items-center justify-between py-4 ${!noBorder ? "border-b border-slate-100 dark:border-slate-800" : ""}`}>
        <div className="flex-1 pr-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</p>
            {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
        </div>
        <div className="flex-shrink-0">{children}</div>
    </div>
);

// ─── Tab definitions ────────────────────────────────────────────────────────

/*const tabs = [
    { id: "appearance",    label: "Appearance",         icon: Palette },
    { id: "notifications", label: "Notifications",      icon: Bell    },
    { id: "integrations",  label: "API & Integrations", icon: Key     },
    { id: "data",          label: "Data & Privacy",     icon: Shield  },
];*/

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AppSettings() {

    const [activeTab, setActiveTab]               = useState("appearance");
    const [theme, setTheme]                       = useState("system");
    const [accentColor, setAccentColor]           = useState("blue-purple");
    const [density, setDensity]                   = useState("comfortable");
    const [animationsEnabled, setAnimations]      = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [notifs, setNotifs] = useState({
        email: true, push: true, sms: false,
        lowStock: true, newOrder: true, reportReady: true,
        weeklyDigest: true, securityAlerts: true, productUpdates: false,
    });

    const [apiKeys] = useState([
        { id: 1, name: "Production API Key", key: "sk-prod-••••••••••••••••••••••••••••••4f2a", created: "Jan 15, 2026", lastUsed: "2 hours ago", scope: "Full Access" },
        { id: 2, name: "Gemini AI Key",      key: "AIza••••••••••••••••••••••••••••••••••Xk9",  created: "Mar 02, 2026", lastUsed: "Just now",     scope: "AI Only"    },
        { id: 3, name: "Webhook Secret",     key: "whsec_••••••••••••••••••••••••••••••••••••", created: "Feb 20, 2026", lastUsed: "Yesterday",    scope: "Webhooks"   },
    ]);
    const [showKey, setShowKey] = useState({});
    const [copied, setCopied]   = useState(null);

    const [dataSettings, setData] = useState({
        analyticsCollection: true,
        crashReports: true,
        thirdPartySharing: false,
        dataRetention: "90",
    });

    const copyKey = (id) => {
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const accentColors = [
        { id: "blue-purple",  from: "#3b82f6", to: "#9333ea", label: "Ocean"   },
        { id: "emerald-teal", from: "#10b981", to: "#0d9488", label: "Forest"  },
        { id: "orange-red",   from: "#f97316", to: "#ef4444", label: "Sunset"  },
        { id: "pink-rose",    from: "#ec4899", to: "#f43f5e", label: "Blossom" },
        { id: "amber-yellow", from: "#f59e0b", to: "#eab308", label: "Golden"  },
    ];

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6 w-full">

            {/* ── APPEARANCE ─────────────────────────────────────────────── */}
            {activeTab === "appearance" && (
                <div className="space-y-5">
                    <SectionHeader
                        icon={Palette}
                        title="Appearance"
                        subtitle="Control how the dashboard looks and feels"
                        gradient="from-blue-500 to-purple-600"
                    />

                    {/* Theme Selector */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Color Theme</p>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: "light",  icon: Sun,     label: "Light"  },
                                { id: "dark",   icon: Moon,    label: "Dark"   },
                                { id: "system", icon: Monitor, label: "System" },
                            ].map((t) => {
                                const Icon   = t.icon;
                                const active = theme === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id)}
                                        className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
                                            active
                                                ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/20"
                                                : "border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
                                        }`}
                                    >
                                        {active && (
                                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <Check className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        )}
                                        <div className={`p-3 rounded-xl ${active ? "bg-gradient-to-br from-blue-500 to-purple-600" : "bg-slate-100 dark:bg-slate-800"}`}>
                                            <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                                        </div>
                                        <span className={`text-sm font-semibold ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}>
                                            {t.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Accent Color */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Accent Color</p>
                        <div className="flex gap-3 flex-wrap">
                            {accentColors.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setAccentColor(c.id)}
                                    className="group flex flex-col items-center gap-2"
                                >
                                    <div
                                        className={`relative w-12 h-12 rounded-2xl shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                                            accentColor === c.id
                                                ? "ring-4 ring-offset-2 ring-slate-300 dark:ring-slate-600 scale-110"
                                                : ""
                                        }`}
                                        style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                                    >
                                        {accentColor === c.id && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Check className="w-5 h-5 text-white drop-shadow" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</span>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Layout & Display */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Layout & Display</p>
                        <SettingRow label="Interface Density" description="Control spacing between elements">
                            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                {["compact", "comfortable", "spacious"].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDensity(d)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                            density === d
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                                                : "text-slate-500 dark:text-slate-400"
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </SettingRow>
                        <SettingRow label="Animations & Transitions" description="Smooth UI motion effects">
                            <Toggle enabled={animationsEnabled} onChange={setAnimations} />
                        </SettingRow>
                        <SettingRow label="Collapsed Sidebar by Default" description="Start with sidebar minimized" noBorder>
                            <Toggle enabled={sidebarCollapsed} onChange={setSidebarCollapsed} />
                        </SettingRow>
                    </Card>
                </div>
            )}

            {/* ── NOTIFICATIONS ──────────────────────────────────────────── */}
            {activeTab === "notifications" && (
                <div className="space-y-5">
                    <SectionHeader
                        icon={Bell}
                        title="Notifications"
                        subtitle="Choose how and when you get notified"
                        gradient="from-amber-500 to-orange-500"
                    />

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery Channels</p>
                        <SettingRow label="Email Notifications" description="Receive updates to your registered email">
                            <Toggle enabled={notifs.email} onChange={(v) => setNotifs({ ...notifs, email: v })} />
                        </SettingRow>
                        <SettingRow label="Push Notifications" description="Browser & desktop push alerts">
                            <Toggle enabled={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} />
                        </SettingRow>
                        <SettingRow label="SMS Notifications" description="Text alerts for critical events" noBorder>
                            <Toggle enabled={notifs.sms} onChange={(v) => setNotifs({ ...notifs, sms: v })} />
                        </SettingRow>
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Alert Types</p>
                        {[
                            { key: "lowStock",       label: "Low Stock Alerts",   desc: "When inventory drops below minimum",    badge: "Inventory", badgeColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
                            { key: "newOrder",       label: "New Order Received", desc: "Instant alert on every new order",       badge: "Orders",    badgeColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"       },
                            { key: "reportReady",    label: "Report Generated",   desc: "When a report finishes processing",      badge: "Reports",   badgeColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
                            { key: "weeklyDigest",   label: "Weekly Digest",      desc: "Summary of the week every Monday",       badge: "Digest",    badgeColor: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"   },
                            { key: "securityAlerts", label: "Security Alerts",    desc: "Login attempts and suspicious activity", badge: "Security",  badgeColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"           },
                            { key: "productUpdates", label: "Product Updates",    desc: "New features and announcements",         badge: "Updates",   badgeColor: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"       },
                        ].map((item, i, arr) => (
                            <div
                                key={item.key}
                                className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                                <Toggle enabled={notifs[item.key]} onChange={(v) => setNotifs({ ...notifs, [item.key]: v })} />
                            </div>
                        ))}
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quiet Hours</p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">From</label>
                                <input type="time" defaultValue="22:00"
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">To</label>
                                <input type="time" defaultValue="08:00"
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Timezone</label>
                                <select className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                    <option>IST (UTC+5:30)</option>
                                    <option>UTC</option>
                                    <option>EST (UTC-5)</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* ── API & INTEGRATIONS ─────────────────────────────────────── */}
            {activeTab === "integrations" && (
                <div className="space-y-5">
                    <SectionHeader
                        icon={Key}
                        title="API & Integrations"
                        subtitle="Manage your API keys and connected services"
                        gradient="from-emerald-500 to-teal-600"
                    />

                    <Card>
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">API Keys</p>
                            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold hover:opacity-90 shadow-md shadow-blue-500/25">
                                <Zap className="w-3.5 h-3.5" /> Generate New Key
                            </button>
                        </div>
                        <div className="space-y-3">
                            {apiKeys.map((k) => (
                                <div key={k.id} className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{k.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">{k.scope}</span>
                                                <span className="text-xs text-slate-400">Created {k.created}</span>
                                                <span className="text-xs text-slate-400">· Used {k.lastUsed}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setShowKey({ ...showKey, [k.id]: !showKey[k.id] })}
                                                className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-all"
                                            >
                                                {showKey[k.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => copyKey(k.id)}
                                                className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-400 hover:text-emerald-500 transition-all"
                                            >
                                                {copied === k.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <code className="block text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-700 truncate">
                                        {showKey[k.id] ? k.key.replace(/•+/, "REVEALED_KEY_HERE") : k.key}
                                    </code>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connected Services</p>
                        <div className="space-y-3">
                            {[
                                { name: "Google Analytics", desc: "Track user behavior and conversions", connected: true,  color: "from-orange-400 to-yellow-400", letter: "G" },
                                { name: "Slack",            desc: "Send alerts and reports to channels", connected: true,  color: "from-purple-500 to-pink-500",   letter: "S" },
                                { name: "Stripe",           desc: "Payment processing & revenue data",   connected: false, color: "from-blue-500 to-indigo-600",   letter: "S" },
                                { name: "Zapier",           desc: "Automate workflows and triggers",     connected: false, color: "from-orange-500 to-red-500",    letter: "Z" },
                            ].map((svc) => (
                                <div key={svc.name} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center text-white font-bold text-sm shadow`}>
                                            {svc.letter}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{svc.name}</p>
                                            <p className="text-xs text-slate-400">{svc.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {svc.connected && (
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                Connected
                                            </span>
                                        )}
                                        <button className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                            svc.connected
                                                ? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                                                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-md"
                                        }`}>
                                            {svc.connected ? "Disconnect" : "Connect"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Webhook Endpoint</p>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="url"
                                    defaultValue="https://yourapp.com/webhooks/dashboard"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 shadow-md">
                                Save
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">We'll POST events to this URL. Make sure it returns a 200 response.</p>
                    </Card>
                </div>
            )}

            {/* ── DATA & PRIVACY ─────────────────────────────────────────── */}
            {activeTab === "data" && (
                <div className="space-y-5">
                    <SectionHeader
                        icon={Shield}
                        title="Data & Privacy"
                        subtitle="Control how your data is collected and stored"
                        gradient="from-red-500 to-rose-600"
                    />

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Data Collection</p>
                        <SettingRow label="Analytics Collection" description="Help us improve by sharing anonymous usage data">
                            <Toggle enabled={dataSettings.analyticsCollection} onChange={(v) => setData({ ...dataSettings, analyticsCollection: v })} />
                        </SettingRow>
                        <SettingRow label="Crash Reports" description="Automatically send error reports when issues occur">
                            <Toggle enabled={dataSettings.crashReports} onChange={(v) => setData({ ...dataSettings, crashReports: v })} />
                        </SettingRow>
                        <SettingRow label="Third-party Data Sharing" description="Share anonymized data with trusted partners" noBorder>
                            <Toggle enabled={dataSettings.thirdPartySharing} onChange={(v) => setData({ ...dataSettings, thirdPartySharing: v })} />
                        </SettingRow>
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Data Retention</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">How long to keep your activity logs and history</p>
                        <div className="grid grid-cols-4 gap-2">
                            {["30", "60", "90", "365"].map((days) => (
                                <button
                                    key={days}
                                    onClick={() => setData({ ...dataSettings, dataRetention: days })}
                                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                                        dataSettings.dataRetention === days
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                            : "border-slate-200/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                                    }`}
                                >
                                    {days === "365" ? "1 Year" : `${days} Days`}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Data Management</p>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                        <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Export All Data</p>
                                        <p className="text-xs text-slate-400">Download a full copy of your data (JSON/CSV)</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50/60 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/50 hover:border-red-400 dark:hover:border-red-600 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30">
                                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Delete All Data</p>
                                        <p className="text-xs text-red-400">Permanently remove all your data. This cannot be undone.</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
                            </button>
                        </div>
                    </Card>

                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/50">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            Changes to privacy settings may take up to 24 hours to fully propagate. For data deletion requests, please allow 72 hours.
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
