import React, { useState } from "react";
import {
    User, Mail, Phone, MapPin, Camera, Edit2, Check, X,
    Lock, Shield, Eye, EyeOff, Smartphone, Monitor, Globe,
    LogOut, AlertTriangle, Clock, ChevronRight, Star,
    Bell, CreditCard, Key, RefreshCcw, Trash2, Download,
    Github, Twitter, Linkedin, CheckCircle, Copy,
} from "lucide-react";

const Avatar = ({ name = "Tannvi Kamble", size = "lg" }) => {
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const dim = size === "lg" ? "w-24 h-24 text-3xl" : "w-10 h-10 text-sm";
    return (
        <div className={`${dim} rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-xl shadow-blue-500/25 flex-shrink-0`}>
            {initials}
        </div>
    );
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 ${className}`}>
        {children}
    </div>
);

const Input = ({ label, icon: Icon, type = "text", defaultValue, placeholder, hint }) => (
    <div>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
            <input type={type} defaultValue={defaultValue} placeholder={placeholder}
                className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`} />
        </div>
        {hint && <p className="text-xs text-slate-400 mt-1.5">{hint}</p>}
    </div>
);

const Toggle = ({ enabled, onChange }) => (
    <button onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${enabled ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30" : "bg-slate-200 dark:bg-slate-700"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
);

const tabs = [
    { id: "profile",   label: "Profile",   icon: User   },
    { id: "security",  label: "Security",  icon: Shield },
    { id: "sessions",  label: "Sessions",  icon: Monitor},
    { id: "billing",   label: "Plan",      icon: Star   },
];

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
    const [twoFA, setTwoFA] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const sessions = [
        { id: 1, device: "Chrome on Windows", location: "Pune, India", ip: "103.21.xx.xx", time: "Active now",      current: true,  icon: Monitor    },
        { id: 2, device: "Safari on iPhone",  location: "Mumbai, India",ip: "49.36.xx.xx", time: "2 hours ago",     current: false, icon: Smartphone },
        { id: 3, device: "Firefox on Mac",    location: "Delhi, India", ip: "122.15.xx.xx",time: "Yesterday 6:42 PM",current: false, icon: Monitor    },
    ];

    return (
        <div className="space-y-6 w-full">
            {/* Profile Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8">
                {/* Decorative orbs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/10 rounded-full blur-2xl" />

                <div className="relative flex items-center gap-6">
                    <div className="relative group">
                        <Avatar name="Tannvi Kamble" size="lg" />
                        <button className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-6 h-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white">Tannvi Kamble</h1>
                        <p className="text-blue-100 text-sm mt-1">tannvi@company.com</p>
                        <div className="flex items-center gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                                <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" /> Pro Plan
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100 text-xs font-semibold backdrop-blur-sm">
                                <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold backdrop-blur-sm hover:bg-white/30 transition-all">
                        <Edit2 className="w-4 h-4" /> Edit Photo
                    </button>
                </div>
            </div>

            {/* Tab Bar */}
            <div className="flex gap-1 p-1.5 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl w-fit">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                active ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            }`}>
                            <Icon className="w-4 h-4" />{tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── PROFILE TAB ── */}
            {activeTab === "profile" && (
                <div className="space-y-5">
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Personal Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="First Name" icon={User} defaultValue="Tannvi" />
                            <Input label="Last Name"  icon={User} defaultValue="Kamble" />
                            <Input label="Email Address" icon={Mail} type="email" defaultValue="tannvi@company.com"
                                hint="Changing your email requires verification." />
                            <Input label="Phone Number" icon={Phone} type="tel" defaultValue="+91 98765 43210" />
                            <Input label="Location" icon={MapPin} defaultValue="Pune, Maharashtra, India" />
                            <Input label="Website / Portfolio" icon={Globe} type="url" placeholder="https://yoursite.com" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Bio</label>
                            <textarea rows={3} defaultValue="Dashboard admin managing operations, inventory, and reports."
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all" />
                        </div>
                    </Card>

                    {/* Social Links */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Social Profiles</p>
                        <div className="space-y-3">
                            {[
                                { label: "GitHub",   icon: Github,   placeholder: "github.com/username",   color: "text-slate-700 dark:text-slate-300" },
                                { label: "Twitter",  icon: Twitter,  placeholder: "twitter.com/username",   color: "text-blue-500"  },
                                { label: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/username",color: "text-blue-700 dark:text-blue-400"  },
                            ].map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.label} className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`w-4 h-4 ${s.color}`} />
                                        </div>
                                        <input type="url" placeholder={s.placeholder}
                                            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Discard
                        </button>
                        <button onClick={handleSave}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${saved ? "bg-emerald-500 shadow-emerald-500/25" : "bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/25"} text-white hover:opacity-90`}>
                            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Check className="w-4 h-4" /> Save Changes</>}
                        </button>
                    </div>
                </div>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === "security" && (
                <div className="space-y-5">
                    {/* Change Password */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Change Password</p>
                        <div className="space-y-4">
                            {[
                                { key: "current", label: "Current Password" },
                                { key: "new",     label: "New Password"     },
                                { key: "confirm", label: "Confirm Password" },
                            ].map((f) => (
                                <div key={f.key}>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">{f.label}</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type={showPass[f.key] ? "text" : "password"} placeholder="••••••••••••"
                                            className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                        <button onClick={() => setShowPass({ ...showPass, [f.key]: !showPass[f.key] })}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                            {showPass[f.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Password strength */}
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-slate-400">Password strength</span>
                                <span className="text-emerald-500 font-semibold">Strong</span>
                            </div>
                            <div className="flex gap-1">
                                {[1,2,3,4].map((i) => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                                ))}
                            </div>
                        </div>
                        <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-blue-500/25 transition-opacity">
                            Update Password
                        </button>
                    </Card>

                    {/* 2FA */}
                    <Card>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex-shrink-0">
                                    <Smartphone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">Two-Factor Authentication</p>
                                    <p className="text-xs text-slate-400 mt-0.5 max-w-sm">Add an extra layer of security using an authenticator app like Google Authenticator or Authy.</p>
                                    {twoFA && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">2FA is active — your account is secure</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {twoFA && (
                                    <button className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors">
                                        Manage
                                    </button>
                                )}
                                <Toggle enabled={twoFA} onChange={setTwoFA} />
                            </div>
                        </div>
                    </Card>

                    {/* Login Alerts */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Security Preferences</p>
                        <div className="space-y-0">
                            {[
                                { label: "Login Alerts", desc: "Get notified of new logins to your account", val: loginAlerts, set: setLoginAlerts },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                    </div>
                                    <Toggle enabled={item.val} onChange={item.set} />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Danger */}
                    <Card className="border-red-200/50 dark:border-red-900/50 bg-red-50/30 dark:bg-red-900/5">
                        <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">Danger Zone</p>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-red-200/50 dark:border-red-800/50 hover:border-red-400 dark:hover:border-red-600 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30"><LogOut className="w-4 h-4 text-red-600 dark:text-red-400" /></div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Sign out all devices</p>
                                        <p className="text-xs text-red-400">Terminate all active sessions except this one</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-red-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-red-200/50 dark:border-red-800/50 hover:border-red-400 dark:hover:border-red-600 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30"><Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" /></div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Delete Account</p>
                                        <p className="text-xs text-red-400">Permanently delete your account and all data</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </Card>
                </div>
            )}

            {/* ── SESSIONS TAB ── */}
            {activeTab === "sessions" && (
                <div className="space-y-5">
                    <Card>
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Sessions</p>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                                <LogOut className="w-3.5 h-3.5" /> End All Other Sessions
                            </button>
                        </div>
                        <div className="space-y-3">
                            {sessions.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.id} className={`p-4 rounded-2xl border transition-all ${s.current
                                        ? "bg-blue-50/60 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50"
                                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60"}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 rounded-xl ${s.current ? "bg-blue-100 dark:bg-blue-900/40" : "bg-slate-100 dark:bg-slate-800"}`}>
                                                    <Icon className={`w-5 h-5 ${s.current ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{s.device}</p>
                                                        {s.current && (
                                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500 text-white">This device</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />{s.location}
                                                        </span>
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Globe className="w-3 h-3" />{s.ip}
                                                        </span>
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />{s.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {!s.current && (
                                                <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Login History */}
                    <Card>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Login History</p>
                        <div className="space-y-0">
                            {[
                                { time: "Today, 10:32 AM",      location: "Pune, India",   status: "success", device: "Chrome" },
                                { time: "Yesterday, 8:15 PM",   location: "Mumbai, India", status: "success", device: "iPhone" },
                                { time: "Apr 19, 3:41 PM",      location: "Delhi, India",  status: "failed",  device: "Unknown" },
                                { time: "Apr 18, 11:22 AM",     location: "Pune, India",   status: "success", device: "Firefox" },
                            ].map((log, i, arr) => (
                                <div key={i} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{log.time}</p>
                                            <p className="text-xs text-slate-400">{log.device} · {log.location}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${log.status === "success" ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"}`}>
                                        {log.status === "success" ? "Success" : "Failed"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* ── PLAN / BILLING TAB ── */}
            {activeTab === "billing" && (
                <div className="space-y-5">
                    {/* Current Plan */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-6">
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                                    <p className="text-white font-bold text-lg">Pro Plan</p>
                                </div>
                                <p className="text-blue-100 text-sm">Renews on May 21, 2026 · ₹2,499/month</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/60 text-xs mb-1">Usage this month</p>
                                <p className="text-white font-bold text-2xl">84%</p>
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-[84%] bg-white rounded-full" />
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button className="px-4 py-2 rounded-xl bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors">
                                Upgrade Plan
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                                Manage Billing
                            </button>
                        </div>
                    </div>

                    {/* Plan Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { name: "Free",       price: "₹0",     features: ["5 reports/mo", "1 user", "7-day history"],       current: false, highlight: false },
                            { name: "Pro",        price: "₹2,499", features: ["Unlimited reports", "5 users", "90-day history"], current: true,  highlight: true  },
                            { name: "Enterprise", price: "Custom",  features: ["Everything in Pro", "Unlimited users", "Custom retention"], current: false, highlight: false },
                        ].map((plan) => (
                            <div key={plan.name} className={`relative rounded-2xl p-5 border-2 transition-all ${plan.highlight ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/10" : "border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80"}`}>
                                {plan.current && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full">
                                        Current
                                    </div>
                                )}
                                <p className="font-bold text-slate-800 dark:text-white">{plan.name}</p>
                                <p className={`text-2xl font-bold mt-1 mb-4 ${plan.highlight ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent" : "text-slate-700 dark:text-slate-200"}`}>{plan.price}</p>
                                <ul className="space-y-2">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                                {!plan.current && (
                                    <button className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold transition-all ${plan.highlight ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                                        {plan.name === "Enterprise" ? "Contact Sales" : "Switch Plan"}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Invoice history */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Invoice History</p>
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                <Download className="w-3.5 h-3.5" /> Download All
                            </button>
                        </div>
                        <div className="space-y-0">
                            {[
                                { date: "Apr 21, 2026", amount: "₹2,499", status: "Paid", id: "INV-2026-04" },
                                { date: "Mar 21, 2026", amount: "₹2,499", status: "Paid", id: "INV-2026-03" },
                                { date: "Feb 21, 2026", amount: "₹2,499", status: "Paid", id: "INV-2026-02" },
                            ].map((inv, i, arr) => (
                                <div key={inv.id} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{inv.date}</p>
                                        <p className="text-xs text-slate-400">{inv.id}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-slate-800 dark:text-white">{inv.amount}</span>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30">{inv.status}</span>
                                        <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-400 hover:text-blue-500 transition-all">
                                            <Download className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
