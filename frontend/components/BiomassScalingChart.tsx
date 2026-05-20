"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BiomassScalingChartProps {
  sampleBiomassG: number;
  totalBiomassG: number;
}

export default function BiomassScalingChart({ sampleBiomassG, totalBiomassG }: BiomassScalingChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format total biomass dynamically for the chart so it's readable
  let displayTotal = totalBiomassG;
  let unit = "g";
  if (totalBiomassG > 1000000) {
    displayTotal = totalBiomassG / 1000000;
    unit = "tons";
  } else if (totalBiomassG > 1000) {
    displayTotal = totalBiomassG / 1000;
    unit = "kg";
  }

  // The sample is always so small compared to the farm that log scale or distinct visual representation is needed.
  // We will display them as side-by-side but we'll use a log scale on the Y-Axis to make both visible.
  // Recharts log scale breaks if values are 0, or if the domain minimum equals the data minimum (causes 0-height bars).
  const safeSample = Math.max(0.1, sampleBiomassG);
  const safeTotal = Math.max(0.1, totalBiomassG);
  
  const chartData = [
    { name: "Sample Area", value: safeSample, label: `g` },
    { name: "Total Farm", value: safeTotal, label: `g` }
  ];

  const isDark = theme === "dark";
  const textColor = isDark ? "#9ca3af" : "#6b7280";
  const gridColor = isDark ? "#ffffff1a" : "#0000001a";
  const tooltipBg = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)";
  const tooltipColor = isDark ? "#fff" : "#000";

  if (!mounted) return <div className="h-64 w-full mt-6" />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      let displayVal = val;
      let displayUnit = "g";
      
      if (val >= 1000000) {
        displayVal = val / 1000000;
        displayUnit = "tons";
      } else if (val >= 1000) {
        displayVal = val / 1000;
        displayUnit = "kg";
      }

      return (
        <div className="p-3 shadow-lg" style={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '8px', color: tooltipColor }}>
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-sm mt-1 text-green-500 font-bold">
            {displayVal.toFixed(2)} {displayUnit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
            scale="log" 
            domain={[0.1, 'auto']} 
            stroke={textColor} 
            tick={{ fill: textColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => {
              // Format log scale ticks cleanly
              if (val === 1 || val === 1000 || val === 1000000 || val === 1000000000) {
                 if (val >= 1000000) return `${val / 1000000}T`;
                 if (val >= 1000) return `${val / 1000}kg`;
                 return `${val}g`;
              }
              return '';
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#ffffff0a' : '#0000000a' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#22c55e"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center text-xs text-gray-500 mt-2">Logarithmic Scale (g)</div>
    </div>
  );
}
