"use client";

import { PredictionResponse } from "@/lib/api";
import { motion } from "framer-motion";
import AnalyticsChart from "./AnalyticsChart";
import { CheckCircle2, Clock, Zap } from "lucide-react";

export default function PredictionCard({ data }: { data: PredictionResponse }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none rounded-2xl p-6 backdrop-blur-sm transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Prediction Results</h3>
        <div className="flex items-center space-x-2 text-xs font-medium bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300">
          <Clock className="h-3 w-3" />
          <span>{data.processing_time}</span>
        </div>
      </div>

      {/* Main Stat */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/5 rounded-xl border border-green-200 dark:border-green-500/20 mb-6 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Dry Biomass</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">{data.Dry_Total_g.toFixed(1)}</span>
          <span className="text-green-600 dark:text-green-500 font-semibold">g</span>
        </div>
        <div className="mt-3 inline-flex items-center space-x-2 bg-white dark:bg-black/40 px-3 py-1 rounded-full border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{data.condition}</span>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatBox label="Green" value={data.Dry_Green_g} color="text-green-600 dark:text-green-400" />
        <StatBox label="Clover" value={data.Dry_Clover_g} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="Dead" value={data.Dry_Dead_g} color="text-amber-600 dark:text-amber-400" />
        <StatBox label="GDM" value={data.GDM_g} color="text-violet-600 dark:text-violet-400" />
      </div>

      {/* Chart */}
      <div className="mt-8 border-t border-gray-200 dark:border-white/10 pt-6 transition-colors duration-300">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Component Distribution</h4>
        <AnalyticsChart data={data} />
      </div>

      {/* Confidence Footer */}
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 dark:border-white/5 pt-4 transition-colors duration-300">
        <div className="flex items-center space-x-1">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Confidence: {(data.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="h-4 w-4 text-blue-500" />
          <span>EfficientNet-B3 Ensemble</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-lg p-4 transition-colors duration-300">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <div className="mt-1 flex items-baseline space-x-1">
        <span className={`text-xl font-semibold ${color}`}>{value.toFixed(1)}</span>
        <span className="text-gray-500 text-xs">g</span>
      </div>
    </div>
  );
}
