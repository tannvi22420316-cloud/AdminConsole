import React from "react";
import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";

function ChartSection({darkMode}) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
                <RevenueChart darkMode={darkMode}/>
            </div>
            <div className="space-y-6">
                <SalesChart darkMode={darkMode}/>
            </div>
        </div>
    )
}

export default ChartSection;