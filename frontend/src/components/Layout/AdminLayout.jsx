import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Activity, Clock, User, ShoppingCart, CreditCard,
  AlertTriangle, RefreshCcw, LogIn, LogOut, Settings,
  Filter, Search, TrendingUp, Eye, MousePointer,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import GeminiCopilot from "../GeminiCopilot";

function AdminLayout({ onToggleTheme }) {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const location = useLocation();

  const getPageMeta = (pathname) => {
    if (pathname === "/admin") return { page: "dashboard",  title: "Dashboard", desc: "Welcome back, Tannvi! Here's what's happening today." };
    if (pathname === "/admin/analytics/overview") return { page: "overview",   title: "Analytics", desc: "Traffic, conversions and revenue overview." };
    if (pathname === "/admin/analytics/reports") return { page: "reports",    title: "Analytics", desc: "Generated reports and category breakdowns." };
    if (pathname === "/admin/analytics/insights") return { page: "insights",   title: "Analytics", desc: "AI-powered insights and performance radar." };
    if (pathname === "/admin/users/all-users") return { page: "all-users", title: "Users", desc: "Manage and monitor all registered users."};
    if (pathname === "/admin/users/roles") return { page: "roles",     title: "Users", desc: "Control access levels and role assignments."};
    if (pathname === "/admin/users/activity")return { page: "activity",  title: "Users", desc: "Track and monitor user behaviour."};
    if (pathname === "/admin/ecommerce/products")  return { page: "products",  title: "E-Commerce", desc: "Manage your product catalogue." };
    if (pathname === "/admin/ecommerce/orders")    return { page: "orders",    title: "E-Commerce", desc: "Track and fulfil customer orders." };
    if (pathname === "/admin/ecommerce/customers") return { page: "customers", title: "E-Commerce", desc: "View and manage customer accounts." };
    if (pathname === "/admin/settings") return { page: "settings",   title: "App Settings",       desc: "Configure application settings." };
    if (pathname === "/admin/profile") return { page: "profile",    title: "Profile Settings",   desc: "Manage your profile." };
    if (pathname === "/admin/inventory") return { page: "inventory", title: "Inventory", desc: "Monitor stock levels, suppliers and warehouse locations." };
    if (pathname === "/admin/reports") return { page: "reports", title: "Reports", desc: "Generate, download and manage business reports." };
    if (pathname === "/admin/messages") return { page: "messages", title: "Messages", desc: "Manage your inbox and conversations." };
    if (pathname === "/admin/transactions") return { page: "transactions", title: "Transactions", desc: "Track all payments, refunds and financial movements." };
    if (pathname === "/admin/calendar") return { page: "calendar", title: "Calendar", desc: "Schedule and manage events, deadlines and meetings." };
    return { page: "dashboard",  title: "Dashboard", desc: "Welcome back, Tannvi!" };
  };

  const { page, title, desc } = getPageMeta(location.pathname);

  // Build this from your real state — add as many fields as you want
  const dashboardData = {
    stats: { activeSessions: 142, actionsToday: 2841, uniqueVisitors: 839, avgSessionTime: "4m 22s" },
    topUsers: [
      { name: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  actions: 284, sessions: 42, lastSeen: "2 mins ago"  },
      { name: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  actions: 231, sessions: 38, lastSeen: "1 hour ago"  },
      { name: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  actions: 198, sessions: 31, lastSeen: "8 mins ago"  },
      { name: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  actions: 176, sessions: 29, lastSeen: "15 mins ago" },
      { name: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  actions: 142, sessions: 24, lastSeen: "1 hour ago"  },
    ],
    activityLog: [
     { id: 1, user: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  action: "Logged In",       module: "Auth",         time: "2 mins ago",   icon: LogIn,       color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30", hour: 9, ip: "192.168.1.10", device: "Chrome/Mac"   },
       { id: 2, user: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  action: "Updated Profile", module: "Settings",     time: "8 mins ago",   icon: Settings,    color: "text-blue-500",   bg: "bg-blue-100 dark:bg-blue-900/30", hour: 4, ip: "10.0.0.99", device: "Unknown"     },
       { id: 3, user: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  action: "Placed Order",    module: "E-Commerce",   time: "15 mins ago",  icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", hour: 11, ip: "172.16.0.23", device: "Firefox/Windows" },
       { id: 4, user: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  action: "Made Payment",    module: "Transactions", time: "32 mins ago",  icon: CreditCard,   color: "text-teal-500",   bg: "bg-teal-100 dark:bg-teal-900/30", hour: 13, ip: "192.168.0.45", device: "Safari/iPhone" },
       { id: 5, user: "John Doe",    avatar: "https://i.pravatar.cc/40?img=1",  action: "Viewed Report",   module: "Analytics",    time: "1 hour ago",   icon: Eye,          color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", hour: 14, ip: "10.0.0.12",  device: "Edge/Windows" },
       { id: 6, user: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  action: "Failed Login",    module: "Auth",         time: "1 hour ago",   icon: AlertTriangle,color:"text-red-500",   bg: "bg-red-100 dark:bg-red-900/30", hour: 15, ip: "172.20.10.5", device: "Chrome/Android" },
       { id: 7, user: "Sarah Smith", avatar: "https://i.pravatar.cc/40?img=5",  action: "Logged Out",      module: "Auth",         time: "2 hours ago",  icon: LogOut,       color: "text-slate-500",  bg: "bg-slate-100 dark:bg-slate-800", hour: 16, ip: "192.168.1.55", device: "Firefox/Linux" },
       { id: 8, user: "Emma Wilson", avatar: "https://i.pravatar.cc/40?img=9",  action: "Added Product",   module: "Inventory",    time: "3 hours ago",  icon: RefreshCcw,   color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", hour: 17, ip: "10.1.1.8",   device: "Chrome/Windows" },
       { id: 9, user: "Mike Brown",  avatar: "https://i.pravatar.cc/40?img=3",  action: "Clicked Banner",  module: "Dashboard",    time: "4 hours ago",  icon: MousePointer, color: "text-pink-500",   bg: "bg-pink-100 dark:bg-pink-900/30", hour: 18, ip: "172.16.5.67", device: "Safari/iPad" },
       { id: 10,user: "Chris Lee",   avatar: "https://i.pravatar.cc/40?img=7",  action: "Logged In",       module: "Auth",         time: "5 hours ago",  icon: LogIn,        color: "text-green-500",  bg: "bg-green-100 dark:bg-green-900/30", hour: 19, ip: "192.168.100.2", device: "Edge/Mac" },
    ],
    activityTrend: [
      { day: "Mon", sessions: 124, actions: 340 },
      { day: "Tue", sessions: 148, actions: 420 },
      { day: "Wed", sessions: 136, actions: 380 },
      { day: "Thu", sessions: 172, actions: 510 },
      { day: "Fri", sessions: 195, actions: 580 },
      { day: "Sat", sessions: 88,  actions: 210 },
      { day: "Sun", sessions: 74,  actions: 180 },
    ],
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">

        <Sidebar
          collapsed={sideBarCollapsed}
          currentPage={page}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
        />

        <div className="flex-1 flex flex-col">
          <Header
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            onToggleTheme={onToggleTheme}
            title={title}
            description={desc}
          />

          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="p-6 space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
        <GeminiCopilot dashboardData={dashboardData} />
      </div>
    </div>
  );
}

export default AdminLayout;