import {
  BarChart3, Calendar, ChevronDown, CreditCard, FileText,
  LayoutDashboard, MessageSquare, Package, Settings,
  ShoppingBag, Users, Zap,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    badge: "New",
    path: "/admin",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview",  path: "/admin/analytics/overview" },
      { id: "reports",  label: "Reports",   path: "/admin/analytics/reports"  },
      { id: "insights", label: "Insights",  path: "/admin/analytics/insights" },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4K",
    submenu: [
      { id: "all-users", label: "All Users",          path: "/admin/users/all-users" },
      { id: "roles",     label: "Roles & Permissions", path: "/admin/roles"           },
      { id: "activity",  label: "User Activity",       path: "/admin/users/activity"  },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-commerce",
    submenu: [
      { id: "products",  label: "Products",  path: "/admin/ecommerce/products"  },
      { id: "orders",    label: "Orders",    path: "/admin/ecommerce/orders"    },
      { id: "customers", label: "Customers", path: "/admin/ecommerce/customers" },
    ],
  },
  { id: "inventory",    icon: Package,       label: "Inventory",     count: "847", path: "/admin/inventory"    },
  { id: "transactions", icon: CreditCard,    label: "Transactions",               path: "/admin/transactions"  },
  { id: "messages",     icon: MessageSquare, label: "Messages",      badge: "12",  path: "/admin/messages"      },
  { id: "calendar",     icon: Calendar,      label: "Calendar",                   path: "/admin/calendar"      },
  { id: "reports",      icon: FileText,      label: "Reports",                    path: "/admin/reports"       },
  { id: "settings",     icon: Settings,      label: "Settings",                   path: "/admin/settings"      },
];

function Sidebar({ collapsed, currentPage }) {
  const [expandedItems, setExpandedItems] = useState(new Set()); 
  const navigate = useNavigate();

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    newExpanded.has(itemId) ? newExpanded.delete(itemId) : newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  // A parent is "active" if it has a submenu containing the current page
  const isParentActive = (item) =>
    item.submenu?.some((sub) => sub.id === currentPage);

  const isSubActive = (subId) => currentPage === subId;

  return (
    <div
      className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out
        bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50
        dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">RubiScape</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const parentActive = isParentActive(item);
          const selfActive   = currentPage === item.id;
          const highlighted  = selfActive || parentActive;

          return (
            <div key={item.id}>
              {/* Parent Button */}
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl
                  transition-all duration-200 ${
                    highlighted
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-md"
                  }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </div>
                {!collapsed && item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedItems.has(item.id) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                  {item.submenu.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => sub.path && navigate(sub.path)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isSubActive(sub.id)
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Tannvi Kamble</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;