import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

const recentOrders = [
    {
        id: "#3847",
        customer: "John Doe",
        product: "Wireless Headphones",
        amount: "$120.00",
        status: "completed",
        date: "2024-06-15"
    },
    {
        id: "#3848",
        customer: "Jane Smith",
        product: "Smart Watch",
        amount: "$250.00",
        status: "pending",
        date: "2024-06-14"
    },
    {
        id: "#3849",
        customer: "Alice Johnson",
        product: "Gaming Mouse",
        amount: "$45.00",
        status: "cancelled",
        date: "2024-06-13"
    },
    {
        id: "#3850",
        customer: "Bob Wilson",
        product: "Bluetooth Speaker",
        amount: "$80.00",
        status: "completed",
        date: "2024-06-12"
    },
];

const topProducts = [
    {
        name: "Wireless Headphones",
        sales: 150,
        revenue: "$18,000",
        trend: "up",
        change: "+10%",
    },
    {
        name: "Smart Watch",
        sales: 120,
        revenue: "$30,000",
        trend: "down",
        change: "-5%",
    },
    {
        name: "Gaming Mouse",
        sales: 200,
        revenue: "$9,000",
        trend: "up",
        change: "+15%",
    },
    {
        name: "Bluetooth Speaker",
        sales: 80,
        revenue: "$6,400",
        trend: "down",
        change: "-8%",
    },
];

function TableSection() {
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
            case "pending":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "cancelled":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
        }
    };

    return (
        <div className="space-y-6">
            {/* Recent Order */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border-b border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                Recent Orders
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Latest customer orders
                            </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </button>
                    </div>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                    Order ID
                                </th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                    Product
                                </th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                    Amount
                                </th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                    Date
                                </th>
                            </tr>
                        </thead>
                            <tbody>
                                {recentOrders.map((order, index) => {
                                    return (
                                        <tr key ={index} className="border-t border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="p-4">
                                                <span className="text-sm font-medium text-blue-600">
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-slate-800 dark:text-white">
                                                    {order.product}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-slate-800 dark:text-white">
                                                    {order.amount}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span 
                                                    className={`text-slate-400 dark:text-white font-medium text-xs px-3 py-1 rounded-full ${getStatusColor(
                                                        order.status)}`}
                                                >
                                                   {order.date}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-slate-800 dark:text-white">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                </div>
            </div>

            {/* Top Products*/}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                Top Products
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Best performing Products
                            </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View All
                        </button>
                    </div>
                </div>

                {/* Dynamic Data*/}    
                <div className="p-6 space-y-4">
                    {topProducts.map((product) => {
                        return (
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                                    {product.name}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {product.sales}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                    {product.revenue}
                                </p>
                                <div className="flex items-center space-x-1">
                                    {product.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3 text-red-500" />
                                    )}
                                    <span 
                                        className={`text-xs font-medium ${
                                            product.trend === "up"
                                            ? "text-emerald-500"
                                            : "text-red-500"
                                        }`}
                                    >
                                        {product.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            </div>
        </div>
    )
}

export default TableSection;