import React, { useEffect, useState } from "react";
import {
    ChevronLeft, ChevronRight, Plus, X, Clock,
    MapPin, Users, Calendar, Tag,
} from "lucide-react";

const API   = "https://rubiscape-admin-console.onrender.com/api/events";
const token = () => localStorage.getItem("token");

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const categoryMeta = {
    meeting:  { color: "bg-blue-500",   light: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",   dot: "bg-blue-500"   },
    deadline: { color: "bg-red-500",    light: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",       dot: "bg-red-500"    },
    reminder: { color: "bg-amber-500",  light: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",dot:"bg-amber-500"  },
    event:    { color: "bg-purple-500", light: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",dot:"bg-purple-500"},
    holiday:  { color: "bg-teal-500",   light: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",   dot: "bg-teal-500"   },
};

const colorOpts = [
    { value: "blue",   classes: "bg-blue-500 hover:bg-blue-600" },
    { value: "purple", classes: "bg-purple-500 hover:bg-purple-600" },
    { value: "red",    classes: "bg-red-500 hover:bg-red-600" },
    { value: "orange", classes: "bg-orange-500 hover:bg-orange-600" },
    { value: "green",  classes: "bg-emerald-500 hover:bg-emerald-600" },
    { value: "pink",   classes: "bg-pink-500 hover:bg-pink-600" },
    { value: "teal",   classes: "bg-teal-500 hover:bg-teal-600" },
];

function CalendarPage() {
    const [events, setEvents]       = useState([]);
    const [today]                   = useState(new Date());
    const [current, setCurrent]     = useState(new Date());
    const [selected, setSelected]   = useState(null);   // selected date
    const [showModal, setShowModal] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [form, setForm]           = useState({ title: "", description: "", start: "", end: "", category: "meeting", color: "blue", location: "", allDay: false });

    const year  = current.getFullYear();
    const month = current.getMonth();

    const fetchEvents = async () => {
        try {
            const res = await fetch(API, { headers: { Authorization: `Bearer ${token()}` } });
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchEvents(); }, []);

    const daysInMonth  = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

    const eventsForDate = (day) => {
        const d = new Date(year, month, day);
        return events.filter((e) => {
            const start = new Date(e.start);
            const end   = new Date(e.end);
            return d >= new Date(start.getFullYear(), start.getMonth(), start.getDate()) &&
                   d <= new Date(end.getFullYear(),   end.getMonth(),   end.getDate());
        });
    };

    const isToday  = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    const isSelected = (day) => selected === day;

    const openAdd = (day) => {
        setSelected(day);
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        setEditEvent(null);
        setForm({ title: "", description: "", start: `${dateStr}T09:00`, end: `${dateStr}T10:00`, category: "meeting", color: "blue", location: "", allDay: false });
        setShowModal(true);
    };

    const openEdit = (e, ev) => {
        e.stopPropagation();
        setEditEvent(ev);
        setForm({
            title:       ev.title,
            description: ev.description || "",
            start:       new Date(ev.start).toISOString().slice(0, 16),
            end:         new Date(ev.end).toISOString().slice(0, 16),
            category:    ev.category,
            color:       ev.color,
            location:    ev.location || "",
            allDay:      ev.allDay,
        });
        setShowModal(true);
    };

    const save = async () => {
        const method = editEvent ? "PUT" : "POST";
        const url    = editEvent ? `${API}/${editEvent._id}` : API;
        await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` }, body: JSON.stringify(form) });
        setShowModal(false);
        fetchEvents();
    };

    const del = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
        setShowModal(false);
        fetchEvents();
    };

    const upcomingEvents = events
        .filter((e) => new Date(e.start) >= today)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 5);

    const formatEventTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="space-y-5">

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">

                {/* MAIN CALENDAR */}
                <div className="xl:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                    {/* Calendar Header */}
                    <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{MONTHS[month]} {year}</h3>
                            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setCurrent(new Date())} className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Today</button>
                            <button onClick={() => openAdd(today.getDate())} className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25">
                                <Plus className="w-4 h-4" /> Add Event
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 border-b border-slate-200/50 dark:border-slate-700/50">
                        {DAYS.map((d) => (
                            <div key={d} className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">{d}</div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7">
                        {/* Empty cells before first day */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20" />
                        ))}

                        {/* Day cells */}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                            const dayEvents = eventsForDate(day);
                            const todayCell = isToday(day);
                            const selCell   = isSelected(day);
                            return (
                                <div key={day} onClick={() => openAdd(day)}
                                    className={`min-h-[100px] border-b border-r border-slate-100 dark:border-slate-800 p-2 cursor-pointer transition-all duration-150
                                        ${selCell ? "ring-2 ring-purple-500/60 dark:ring-purple-400/60 bg-purple-50/70 dark:bg-purple-900/20" : todayCell ? "bg-blue-50/60 dark:bg-blue-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"}`}>
                                    <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1 transition-all
                                        ${selCell ? "bg-purple-500 text-white shadow-md" : todayCell ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md" : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
                                        {day}
                                    </div>
                                    <div className="space-y-0.5">
                                        {dayEvents.slice(0, 3).map((ev) => {
                                            const cm = categoryMeta[ev.category] || categoryMeta.event;
                                            return (
                                                <div key={ev._id} onClick={(e) => openEdit(e, ev)}
                                                    className={`text-xs px-2 py-0.5 rounded-md font-medium truncate cursor-pointer ${cm.light} hover:opacity-80 transition-opacity`}>
                                                    {ev.title}
                                                </div>
                                            );
                                        })}
                                        {dayEvents.length > 3 && (
                                            <div className="text-xs text-slate-400 px-1">+{dayEvents.length - 3} more</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="space-y-4">
                    {/* Legend */}
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Categories</h4>
                        <div className="space-y-2">
                            {Object.entries(categoryMeta).map(([key, val]) => (
                                <div key={key} className="flex items-center gap-2.5">
                                    <div className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
                                    <span className="text-sm capitalize text-slate-600 dark:text-slate-400">{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Upcoming Events</h4>
                        <div className="space-y-3">
                            {upcomingEvents.length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-4">No upcoming events</p>
                            )}
                            {upcomingEvents.map((ev) => {
                                const cm = categoryMeta[ev.category] || categoryMeta.event;
                                return (
                                    <div key={ev._id} className={`p-3 rounded-xl border-l-4 ${cm.light}`} style={{ borderLeftColor: "" }}>
                                        <div className={`w-full rounded-xl p-3 ${cm.light}`}>
                                            <p className="text-sm font-semibold truncate">{ev.title}</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <Clock className="w-3 h-3 opacity-70" />
                                                <span className="text-xs opacity-80">
                                                    {ev.allDay ? "All day" : `${formatEventTime(ev.start)} – ${formatEventTime(ev.end)}`}
                                                </span>
                                            </div>
                                            {ev.location && (
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <MapPin className="w-3 h-3 opacity-70" />
                                                    <span className="text-xs opacity-80 truncate">{ev.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md shadow-2xl">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{editEvent ? "Edit Event" : "New Event"}</h3>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Event Title</label>
                                <input type="text" placeholder="Enter event title..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Start</label>
                                    <input type="datetime-local" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">End</label>
                                    <input type="datetime-local" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {["meeting","deadline","reminder","event","holiday"].map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Color</label>
                                    <div className="flex flex-wrap gap-2">
                                        {colorOpts.map((opt) => (
                                            <button key={opt.value} type="button" onClick={() => setForm({ ...form, color: opt.value })}
                                                className={`w-9 h-9 rounded-full ${opt.classes} ${form.color === opt.value ? "ring-2 ring-offset-2 ring-slate-300 dark:ring-slate-500" : ""}`}>
                                                <span className="sr-only">{opt.value}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Location</label>
                                    <input type="text" placeholder="Optional..." value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Description</label>
                                <textarea rows={3} placeholder="Event details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.allDay} onChange={(e) => setForm({ ...form, allDay: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                                <span className="text-sm text-slate-700 dark:text-slate-300">All day event</span>
                            </label>
                        </div>
                        <div className="p-5 pt-0 flex gap-3">
                            {editEvent && (
                                <button onClick={() => del(editEvent._id)} className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">Delete</button>
                            )}
                            <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400">Cancel</button>
                            <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 shadow-lg shadow-blue-500/25">{editEvent ? "Save" : "Create"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarPage;
