import React, { useEffect, useState } from "react";
import { Plus, Shield, Check, X, Save, Loader } from "lucide-react";

const MODULES = [
  { key: "dashboard",    label: "Dashboard",    actions: ["view"] },
  { key: "users",        label: "Users",        actions: ["view", "add", "edit", "delete"] },
  { key: "analytics",   label: "Analytics",    actions: ["view"] },
  { key: "ecommerce",   label: "E-Commerce",   actions: ["view", "add", "edit", "delete"] },
  { key: "inventory",   label: "Inventory",    actions: ["view", "add", "edit", "delete"] },
  { key: "transactions",label: "Transactions", actions: ["view", "export"] },
  { key: "reports",     label: "Reports",      actions: ["view", "export"] },
  { key: "settings",    label: "Settings",     actions: ["view", "edit"] },
];

function RolesPage() {
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(token ? null : "No auth token found.");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch("https://rubiscape-admin-console.onrender.com/api/roles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || `Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Unexpected response format.");
        setRoles(data);
        setSelectedRole(data[0] ?? null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const togglePermission = (module, action) => {
    setSelectedRole((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: {
            ...prev.permissions?.[module],
            [action]: !prev.permissions?.[module]?.[action],
          },
        },
      };
    });
  };

  const savePermissions = () => {
    if (!selectedRole?._id) return;
    setSaving(true);
    fetch(`https://rubiscape-admin-console.onrender.com/api/roles/${selectedRole._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ permissions: selectedRole.permissions }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message);
        return res.json();
      })
      .then((updated) => {
        setRoles((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
        setSelectedRole(updated);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      })
      .catch((err) => console.error(err))
      .finally(() => setSaving(false));
  };

  return (
    <div className="space-y-6">

      {/* Subheading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Roles & Permissions</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Control access levels and manage role-based permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Roles List */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Roles</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{roles.length} roles configured</p>
            </div>
            <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-2">
            {loading && (
              <p className="text-sm text-slate-400 text-center py-6">Loading roles...</p>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center py-6">{error}</p>
            )}
            {!loading && !error && roles.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">No roles found. Add one to get started.</p>
            )}
            {roles.map((role) => {
              const isSelected = selectedRole?._id === role._id;
              return (
                <button
                  key={role._id}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200
                    ${isSelected
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800"}`}>
                    <Shield className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-slate-800 dark:text-white"}`}>
                      {role.name}
                    </p>
                    <p className={`text-xs ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                      {Object.keys(role.permissions || {}).length} modules
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Permissions */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
          {!selectedRole && !loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Select a role to view and edit permissions.</p>
            </div>
          ) : selectedRole ? (
            <>
              {/* Permissions Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">
                    {selectedRole.name} — Permissions
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Toggle module access for this role
                  </p>
                </div>
                <button
                  onClick={savePermissions}
                  disabled={saving}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${saveSuccess
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"}`}
                >
                  {saving ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : saveSuccess ? (
                    <><Check className="w-4 h-4" /> Saved!</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Changes</>
                  )}
                </button>
              </div>

              {/* Permissions Grid */}
              <div className="p-6 space-y-1">
                {/* Column Headers */}
                <div className="grid grid-cols-12 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="col-span-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Module</div>
                  <div className="col-span-8 grid grid-cols-4 gap-2">
                    {["View", "Add", "Edit", "Delete"].map((a) => (
                      <div key={a} className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-center">{a}</div>
                    ))}
                  </div>
                </div>

                {MODULES.map((mod) => (
                  <div
                    key={mod.key}
                    className="grid grid-cols-12 items-center py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 transition-colors"
                  >
                    <div className="col-span-4">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{mod.label}</span>
                    </div>
                    <div className="col-span-8 grid grid-cols-4 gap-2">
                      {["view", "add", "edit", "delete"].map((action) => {
                        const isAvailable = mod.actions.includes(action);
                        const isEnabled = !!selectedRole.permissions?.[mod.key]?.[action];
                        return (
                          <div key={action} className="flex justify-center">
                            {isAvailable ? (
                              <button
                                onClick={() => togglePermission(mod.key, action)}
                                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-all duration-200
                                  ${isEnabled
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                    : "bg-slate-200 dark:bg-slate-700"}`}
                              >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200
                                  ${isEnabled ? "translate-x-5" : "translate-x-0"}`}
                                />
                              </button>
                            ) : (
                              <span className="w-10 h-5 flex items-center justify-center">
                                <X className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RolesPage;
