import React, { useMemo } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert, Info } from "lucide-react";
import { runAnomalyDetection } from "../utils/anomalyDetector.js";

const SEV_STYLES = {
  high:   { border: "border-red-400",   text: "text-red-600",   bg: "bg-red-50 dark:bg-red-900/20",   label: "HIGH"   },
  medium: { border: "border-amber-400", text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", label: "MEDIUM" },
  low:    { border: "border-blue-400",  text: "text-blue-600",  bg: "bg-blue-50 dark:bg-blue-900/20",  label: "LOW"    },
};

export default function AnomalyPanel({ activityLog }) {
  // re-runs automatically whenever activityLog changes
  const { userResults, allAlerts, summary } = useMemo(
    () => runAnomalyDetection(activityLog),
    [activityLog]
  );

  return (
    <div className="space-y-5">

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "High risk",    value: summary.high,   color: "text-red-500"   },
          { label: "Medium risk",  value: summary.medium, color: "text-amber-500" },
          { label: "Clean users",  value: summary.clean,  color: "text-green-500" },
          { label: "Total alerts", value: summary.total,  color: "text-slate-700 dark:text-slate-300" },
        ].map(c => (
          <div key={c.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-slate-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {allAlerts.length === 0 ? (
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
            <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-300">No anomalies detected in current log.</p>
          </div>
        ) : (
          allAlerts.map((alert, i) => {
            const s = SEV_STYLES[alert.severity];
            return (
              <div key={i} className={`bg-white dark:bg-slate-900 border-l-4 ${s.border} border border-slate-200 dark:border-slate-700 rounded-r-2xl p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-xs font-semibold ${s.text}`}>{s.label}</span>
                    <span className="text-xs text-slate-400 mx-2">·</span>
                    <span className="text-xs text-slate-500">{alert.label}</span>
                    <p className="text-sm text-slate-800 dark:text-white mt-1">
                      <span className="font-medium">{alert.user}</span>: {alert.detail}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0 ${s.bg} ${s.text}`}>
                    +{alert.score}pts
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Risk score table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">User risk scores</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              {["User", "Risk score", "Flags", "Top reason"].map(h => (
                <th key={h} className="text-left text-xs text-slate-500 font-medium px-5 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userResults.map(r => {
              const color = r.severity === "high" ? "#E24B4A" : r.severity === "medium" ? "#EF9F27" : "#378ADD";
              return (
                <tr key={r.user} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3 text-sm font-medium text-slate-800 dark:text-white">{r.user}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: color }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color }}>{r.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{r.flags.length}</td>
                  <td className="px-5 py-3 text-xs text-slate-500">{r.flags[0]?.label ?? "None"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}