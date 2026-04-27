const RULES = [
  {
    id: "repeated_failed_logins",
    label: "Repeated failed logins",
    severity: "high",
    score: 40,
    check(logs, user) {
      const fails = logs.filter(l => l.user === user && l.action === "Failed Login");
      if (fails.length >= 3) return { triggered: true, detail: `${fails.length} failed login attempts detected` };
      if (fails.length === 2) return { triggered: true, detail: `2 failed login attempts — monitoring` };
      return { triggered: false };
    },
  },
  {
    id: "off_hours_access",
    label: "Off-hours access",
    severity: "medium",
    score: 25,
    check(logs, user) {
      // flag actions between 10pm–6am
      const offHours = logs.filter(l => l.user === user && (l.hour < 6 || l.hour > 22));
      if (offHours.length > 0)
        return { triggered: true, detail: `${offHours.length} action(s) between 10pm–6am` };
      return { triggered: false };
    },
  },
  {
    id: "multiple_ips",
    label: "Multiple IP addresses",
    severity: "medium",
    score: 20,
    check(logs, user) {
      const ips = [...new Set(logs.filter(l => l.user === user).map(l => l.ip))];
      if (ips.length >= 3)
        return { triggered: true, detail: `Accessed from ${ips.length} different IPs` };
      return { triggered: false };
    },
  },
  {
    id: "unknown_device",
    label: "Unknown device",
    severity: "medium",
    score: 15,
    check(logs, user) {
      const unk = logs.filter(l => l.user === user && l.device === "Unknown");
      if (unk.length > 0)
        return { triggered: true, detail: `${unk.length} action(s) from unrecognised device` };
      return { triggered: false };
    },
  },
  {
    id: "destructive_action",
    label: "Destructive action detected",
    severity: "high",
    score: 35,
    check(logs, user) {
      const dangerous = ["Deleted User", "Bulk Delete", "Exported Data", "Reset Password"];
      const found = logs.filter(l => l.user === user && dangerous.includes(l.action));
      if (found.length > 0)
        return { triggered: true, detail: `Performed: ${found.map(l => l.action).join(", ")}` };
      return { triggered: false };
    },
  },
  {
    id: "high_volume",
    label: "Unusually high activity",
    severity: "low",
    score: 10,
    check(logs, user) {
      const count = logs.filter(l => l.user === user).length;
      if (count >= 5)
        return { triggered: true, detail: `${count} actions recorded (avg is 2–3)` };
      return { triggered: false };
    },
  },
];

function severityOf(score) {
  if (score >= 50) return "high";
  if (score >= 20) return "medium";
  return "low";
}

/**
 * Main export. Pass your activityLog array.
 * Returns { userResults, allAlerts, summary }
 */
export function runAnomalyDetection(activityLog) {
  const users = [...new Set(activityLog.map(l => l.user))];

  const userResults = users
    .map(user => {
      const triggered = [];
      let totalScore = 0;

      for (const rule of RULES) {
        const result = rule.check(activityLog, user);
        if (result.triggered) {
          triggered.push({ ...rule, detail: result.detail });
          totalScore += rule.score;
        }
      }

      totalScore = Math.min(totalScore, 100); // cap at 100
      return {
        user,
        score: totalScore,
        flags: triggered,
        severity: severityOf(totalScore),
      };
    })
    .sort((a, b) => b.score - a.score);

  // flat list of all alerts sorted by severity
  const allAlerts = userResults
    .flatMap(r => r.flags.map(f => ({ user: r.user, ...f })))
    .sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity]));

  const summary = {
    high:   userResults.filter(r => r.severity === "high").length,
    medium: userResults.filter(r => r.severity === "medium").length,
    clean:  userResults.filter(r => r.score === 0).length,
    total:  allAlerts.length,
  };

  return { userResults, allAlerts, summary };
}