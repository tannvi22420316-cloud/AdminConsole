import React from 'react';
import { Clock, User, ShoppingCart, CreditCard, AlertTriangle, RefreshCcw } from "lucide-react";

const iconMap = {
    User,
    ShoppingCart,
    CreditCard,
    AlertTriangle,
    RefreshCcw
};

const activities = [
    {
        id: 1,
        icon: "User",
        title: "New User Registered",
        description: "John Doe has registered an account.",
        time: "2 hours ago",
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
        id: 2,
        icon: "ShoppingCart",
        title: "New Order Placed",
        description: "Order #4582 has been placed.",
        time: "3 hours ago",
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/30"
    },
    {
        id: 3,
        icon: "CreditCard",
        title: "Payment Successful",
        description: "Payment of $250 received.",
        time: "5 hours ago",
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
        id: 4,
        icon: "AlertTriangle",
        title: "System Alert",
        description: "High server load detected.",
        time: "1 day ago",
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/30"
    },
    {
        id: 5,
        icon: "RefreshCcw",
        title: "System Update",
        description: "Dashboard updated successfully.",
        time: "2 days ago",
        color: "text-yellow-500",
        bg: "bg-yellow-100 dark:bg-yellow-900/30"
    },
];

function ActivityFeed() {
    return (
        <div className="bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
            
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Activity Feed
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Recent System Activities
                    </p>
                </div>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    View All
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {activities.map((activity) => {
                    const Icon = iconMap[activity.icon];

                    return (
                        <div 
                            key={activity.id} 
                            className="flex items-start space-x-4 p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            {/* Icon */}
                            <div className={`p-2 rounded-lg ${activity.bg}`}>
                                <Icon className={`w-4 h-4 ${activity.color}`} />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                                    {activity.title}
                                </h4>

                                <p className="text-sm truncate text-slate-600 dark:text-slate-400">
                                    {activity.description}
                                </p>

                                <div className="flex items-center space-x-1 mt-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {activity.time}
                                    </span>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ActivityFeed;