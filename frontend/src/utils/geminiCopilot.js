/**
 * Sends a multi-turn conversation to Gemini.
 * @param {Array}  history  - [{role:"user"|"model", text:"..."}]
 * @param {Object} dashboardData - your live dashboard JSON
 * @returns {string} - Gemini's reply
 */
export async function askGemini(history, dashboardData) {
  const systemInstruction = `You are an AI admin copilot for a web platform dashboard.
You have access to the following real-time dashboard data:
${JSON.stringify(dashboardData, null, 2)}

Answer the admin's questions clearly and concisely using this data.
Lead with the key finding, then add detail. Keep replies under 80 words.
If something is not in the data, say so honestly. The admin's name is Tannvi.`;

  // Gemini uses "contents" array — each entry has role + parts
  const contents = history.map(msg => ({
    role: msg.role,           // "user" or "model"
    parts: [{ text: msg.text }],
  }));

  const body = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      temperature: 0.4,       // lower = more factual, less creative
      maxOutputTokens: 300,
    },
  };

  const res = await fetch("http://localhost:5000/api/gemini/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received.";
}