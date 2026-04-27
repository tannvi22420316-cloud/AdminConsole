import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader } from "lucide-react";
import { askGemini } from "../utils/geminiCopilot";

const SUGGESTED = [
  "Who are the most active users?",
  "Were there any failed logins?",
  "Summarise this week's activity",
  "Which module is used the most?",
];

export default function GeminiCopilot({ dashboardData }) {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Gemini history: [{role:"user"|"model", text:"..."}]
  // We keep a separate display list so we can show the greeting
  const [display, setDisplay] = useState([
    { role: "model", text: "Hi Tannvi! I have access to your dashboard. Ask me anything about users, activity, or platform health." },
  ]);
  const [geminiHistory, setGeminiHistory] = useState([]); // only real turns

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [display, loading]);

  async function send(text) {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput("");
    setError(null);

    const userMsg = { role: "user", text: question };
    const newHistory = [...geminiHistory, userMsg];

    setDisplay(prev => [...prev, userMsg]);
    setGeminiHistory(newHistory);
    setLoading(true);

    try {
      const reply = await askGemini(newHistory, dashboardData);
      const modelMsg = { role: "model", text: reply };
      setDisplay(prev => [...prev, modelMsg]);
      setGeminiHistory(prev => [...prev, modelMsg]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
        aria-label="Toggle admin copilot"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-80 sm:w-96"
          style={{ height: 460 }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-slate-800 dark:text-white">Admin Copilot</span>
            <span className="ml-auto text-xs text-slate-400">Gemini 2.0 Flash · free</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {display.map((msg, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[85%] ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl w-fit">
                <Loader className="w-3 h-3 animate-spin text-slate-400" />
                <span className="text-xs text-slate-400">Thinking...</span>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl">
                Error: {error}
              </div>
            )}

            {/* Suggested questions — only on first open */}
            {display.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about your platform..."
              disabled={loading}
              className="flex-1 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}