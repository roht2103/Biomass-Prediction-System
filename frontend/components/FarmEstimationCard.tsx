"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, AlertTriangle, TrendingUp } from "lucide-react";
import AreaInput from "./AreaInput";
import BiomassScalingChart from "./BiomassScalingChart";
import { AreaUnit, convertToSqMeters, calculateBiomassDensity, extrapolateTotalBiomass, formatMass, CONVERSION_RATES } from "@/lib/extrapolation";

interface FarmEstimationCardProps {
  sampleBiomassG: number;
}

export default function FarmEstimationCard({ sampleBiomassG }: FarmEstimationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [imageAreaStr, setImageAreaStr] = useState("1");
  const [imageUnit, setImageUnit] = useState<AreaUnit>("m2");
  
  const [farmAreaStr, setFarmAreaStr] = useState("");
  const [farmUnit, setFarmUnit] = useState<AreaUnit>("acres");

  const imageAreaVal = parseFloat(imageAreaStr) || 0;
  const farmAreaVal = parseFloat(farmAreaStr) || 0;

  // Calculations
  const imageAreaSqm = convertToSqMeters(imageAreaVal, imageUnit);
  const farmAreaSqm = convertToSqMeters(farmAreaVal, farmUnit);
  
  const density = calculateBiomassDensity(sampleBiomassG, imageAreaSqm);
  const totalFarmBiomassG = extrapolateTotalBiomass(density, farmAreaSqm);

  const biomassPerAcre = density * CONVERSION_RATES["acres"];
  const biomassPerHectare = density * CONVERSION_RATES["hectares"];

  return (
    <div className="mt-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
      
      {/* CTA Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex flex-col sm:flex-row items-center justify-between transition-colors">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            Estimate Entire Farm Biomass
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Extrapolate the sampled prediction across your entire field or farm area.
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 sm:mt-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
        >
          {isExpanded ? "Close Calculator" : "Calculate Estimate"}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-white/10"
          >
            <div className="p-6">
              
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 mb-8 flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <span className="font-semibold block mb-1">Scientific Disclaimer</span>
                  Farm-scale biomass estimation is an approximate extrapolation. It assumes the sampled vegetation region visible in the uploaded image is representative of the overall field/farm vegetation distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Inputs Column */}
                <div className="space-y-6">
                  <AreaInput 
                    label="1. Image Coverage Area (Sample Size)"
                    value={imageAreaStr}
                    onChange={setImageAreaStr}
                    unit={imageUnit}
                    onUnitChange={setImageUnit}
                    placeholder="e.g. 1"
                  />
                  <AreaInput 
                    label="2. Total Farm/Field Area"
                    value={farmAreaStr}
                    onChange={setFarmAreaStr}
                    unit={farmUnit}
                    onUnitChange={setFarmUnit}
                    placeholder="e.g. 150"
                  />
                </div>

                {/* Results Column */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Extrapolation Results</h4>
                  
                  {farmAreaVal > 0 && imageAreaVal > 0 ? (
                    <div className="space-y-4">
                      {/* Massive Total Result */}
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg relative overflow-hidden">
                        <TrendingUp className="absolute right-4 bottom-4 h-24 w-24 text-white opacity-10" />
                        <span className="text-green-50 font-medium text-sm block mb-1">Estimated Total Farm Biomass</span>
                        <div className="text-3xl font-bold text-white tracking-tight">
                          {formatMass(totalFarmBiomassG)}
                        </div>
                      </div>

                      {/* Smaller Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-lg p-3">
                          <span className="text-xs text-gray-500 block mb-1">Biomass Density</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatMass(density)}/m²</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-lg p-3">
                          <span className="text-xs text-gray-500 block mb-1">Est. per Acre</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatMass(biomassPerAcre)}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-lg p-3">
                          <span className="text-xs text-gray-500 block mb-1">Est. per Hectare</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatMass(biomassPerHectare)}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-lg p-3 flex flex-col justify-center">
                          <button 
                            onClick={() => window.print()}
                            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline text-left"
                          >
                            Print/Download Report →
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center text-gray-400 text-sm text-center px-6">
                      Enter the total farm area to see the extrapolated biomass calculations.
                    </div>
                  )}
                </div>

              </div>

              {/* Chart */}
              {farmAreaVal > 0 && imageAreaVal > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scale Comparison: Sample vs Total Farm</h4>
                  <BiomassScalingChart sampleBiomassG={sampleBiomassG} totalBiomassG={totalFarmBiomassG} />
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
