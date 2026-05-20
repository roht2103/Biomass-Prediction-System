"use client";

import { AreaUnit } from "@/lib/extrapolation";

interface AreaInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  unit: AreaUnit;
  onUnitChange: (unit: AreaUnit) => void;
  placeholder?: string;
}

export default function AreaInput({ label, value, onChange, unit, onUnitChange, placeholder }: AreaInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="flex rounded-lg shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-black/50 focus-within:ring-2 focus-within:ring-green-500/50 transition-all">
        <input 
          type="number" 
          step="any"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
          placeholder={placeholder || "0.0"}
        />
        <div className="relative flex-shrink-0 flex items-center border-l border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as AreaUnit)}
            className="w-full h-full pl-3 pr-8 py-2.5 bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="m2">m²</option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
          </select>
          <div className="absolute right-2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
