"use client";

import { PredictionResponse } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AnalyticsChart({ data }: { data: PredictionResponse }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { name: "Green", value: data.Dry_Green_g, color: "#22c55e" }, // green-500
    { name: "Clover", value: data.Dry_Clover_g, color: "#10b981" }, // emerald-500
    { name: "Dead", value: data.Dry_Dead_g, color: "#f59e0b" }, // amber-500
    { name: "GDM", value: data.GDM_g, color: "#8b5cf6" }, // violet-500
  ];

  const isDark = theme === "dark";
  const textColor = isDark ? "#9ca3af" : "#6b7280"; // gray-400 vs gray-500
  const gridColor = isDark ? "#ffffff1a" : "#0000001a";
  const tooltipBg = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)";
  const tooltipColor = isDark ? "#fff" : "#000";

  if (!mounted) return <div className="h-64 w-full mt-6" />;

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke={textColor} 
            tick={{ fill: textColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke={textColor} 
            tick={{ fill: textColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{ fill: isDark ? '#ffffff0a' : '#0000000a' }}
            contentStyle={{ 
              backgroundColor: tooltipBg, 
              border: tooltipBorder,
              borderRadius: '8px',
              color: tooltipColor
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
