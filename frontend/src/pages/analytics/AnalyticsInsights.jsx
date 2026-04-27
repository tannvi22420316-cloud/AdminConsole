import React from "react";
import {
    TrendingUp, TrendingDown, Zap, AlertCircle, CheckCircle,
    Users, DollarSign, Target, Globe, Clock, ArrowUpRight, Star,
} from "lucide-react";
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, Cell,
} from "recharts";

const kpiData = [
    { label: "Customer Lifetime Value", value: "$1,284", change: "+9.2%", up: true, icon: DollarSign, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "Churn Rate", value: "2.4%", change: "-0.8%", up: true, icon: Users, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    { label: "Goal Completion", value: "78%", change: "+5%", up: true, icon: Target, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { label: "Avg. Session Duration", value: "4m 22s", change: "+0.5m", up: true, icon: Clock, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
];

const radarData = [
    { subject: "Engagement", A: 85, fullMark: 100 },
    { subject: "Retention", A: 72, fullMark: 100 },
    { subject: "Conversion", A: 68, fullMark: 100 },
    { subject: "Satisfaction", A: 91, fullMark: 100 },
    { subject: "Reach", A: 78, fullMark: 100 },
    { subject: "Revenue", A: 82, fullMark: 100 },
];

const cohortData = [
    { month: "Jan", w1: 100, w2: 72, w3: 58, w4: 49 },
    { month: "Feb", w1: 100, w2: 68, w3: 54, w4: 45 },
    { month: "Mar", w1: 100, w2: 75, w3: 61, w4: 52 },
    { month: "Apr", w1: 100, w2: 70, w3: 57, w4: 48 },
    { month: "May", w1: 100, w2: 78, w3: 64, w4: 55 },
    { month: "Jun", w1: 100, w2: 74, w3: 60, w4: 51 },
];

const geoData = [
    { country: "United States", users: 28400, revenue: 142000, flag: "🇺🇸" },
    { country: "United Kingdom", users: 12800, revenue: 68000, flag: "🇬🇧" },
    { country: "Germany", users: 9200, revenue: 51000, flag: "🇩🇪" },
    { country: "Canada", users: 7600, revenue: 38000, flag: "🇨🇦" },
    { country: "Australia", users: 6400, revenue: 32000, flag: "🇦🇺" },
    { country: "India", users: 5800, revenue: 21000, flag: "🇮🇳" },
];

const aiInsights = [
    { type: "opportunity", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800", title: "Revenue Opportunity", desc: "Electronics category is 9.3% above target. Consider increasing ad spend to maximize Q4 momentum." },
    { type: "alert", icon: AlertCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", border: "border-red-200 dark:border-red-800", title: "Churn Risk Detected", desc: "42 high-value users haven't logged in for 14+ days. A re-engagement campaign could recover ~$8,400 in revenue." },
    { type: "success", icon: CheckCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-200 dark:border-green-800", title: "Goal Achieved", desc: "Monthly active user target of 45,000 surpassed by 7.4%. Retention campaigns are working effectively." },
    { type: "tip", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", border: "border-yellow-200 dark:border-yellow-800", title: "Optimization Tip", desc: "Checkout page has a 28% bounce rate — the lowest of all pages. A/B test a simplified flow to increase conversions further." },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

function AnalyticsInsights() {
    return (
        <div className="space-y-6">

            {/* Page Subheading */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Insights</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    AI-powered analysis, performance radar and geographic breakdown.
                </p>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {kpiData.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={kpi.label} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {kpi.change}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{kpi.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* AI Insights Cards */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">AI-Powered Insights</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Automated analysis and recommendations</p>
                    </div>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aiInsights.map((insight) => {
                        const Icon = insight.icon;
                        return (
                            <div key={insight.title} className={`p-4 rounded-xl border ${insight.border} bg-white/50 dark:bg-slate-800/50`}>
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${insight.bg} flex-shrink-0`}>
                                        <Icon className={`w-4 h-4 ${insight.color}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{insight.title}</h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{insight.desc}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Radar + Cohort */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Performance Radar */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Performance Radar</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Multi-dimensional performance scores</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748b" }} />
                                <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cohort Retention */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Cohort Retention</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Week-over-week user retention by cohort</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3">Cohort</th>
                                    {["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
                                        <th key={w} className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 pb-3 px-2">{w}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {cohortData.map((row) => (
                                    <tr key={row.month}>
                                        <td className="py-2 text-sm font-medium text-slate-700 dark:text-slate-300">{row.month}</td>
                                        {[row.w1, row.w2, row.w3, row.w4].map((val, i) => {
                                            const opacity = val / 100;
                                            return (
                                                <td key={i} className="py-2 px-2 text-center">
                                                    <span
                                                        className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold"
                                                        style={{
                                                            backgroundColor: `rgba(59, 130, 246, ${opacity * 0.4})`,
                                                            color: val > 70 ? "#1d4ed8" : val > 55 ? "#2563eb" : "#3b82f6",
                                                        }}
                                                    >
                                                        {val}%
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Geographic Breakdown */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Geographic Insights</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Revenue and users by country</p>
                    </div>
                    <Globe className="w-5 h-5 text-slate-400" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Country</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Users</th>
                                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Revenue</th>
                                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Share</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {geoData.map((row) => {
                                const total = geoData.reduce((sum, r) => sum + r.revenue, 0);
                                const pct = Math.round((row.revenue / total) * 100);
                                return (
                                    <tr key={row.country} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{row.flag}</span>
                                                <span className="text-sm font-medium text-slate-800 dark:text-white">{row.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right text-slate-700 dark:text-slate-300 font-medium">{row.users.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-right font-semibold text-slate-800 dark:text-white">${row.revenue.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                                                    <div
                                                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-8 text-right">{pct}%</span>
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

export default AnalyticsInsights;
