import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, Filter, Users, UserCheck, UserX, Shield } from "lucide-react";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => { setUsers(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalUsers   = users.length;
  const activeUsers  = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status !== "active").length;
  const adminUsers   = users.filter((u) => u.role === "admin").length;

  const statCards = [
    { label: "Total Users",    value: totalUsers,    icon: Users,      color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30"   },
    { label: "Active Users",   value: activeUsers,   icon: UserCheck,  color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30" },
    { label: "Inactive Users", value: inactiveUsers, icon: UserX,      color: "text-red-500",    bg: "bg-red-100 dark:bg-red-900/30"     },
    { label: "Admins",         value: adminUsers,    icon: Shield,     color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30"},
  ];

  return (
    <div className="space-y-6">

      {/* Subheading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">All Users</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage and monitor all registered users.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{card.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">

        {/* Table Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">User List</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{filteredUsers.length} users found</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all
                  ${filter === f
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500">No users found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Phone</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Email</th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || "https://i.pravatar.cc/40?u=" + user._id}
                          alt={user.name}
                          className="w-9 h-9 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.designation || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.phone || "—"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 truncate max-w-[180px]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full
                        ${user.status === "active"
                          ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                          : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-500 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                          Login
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
