"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadCard from "@/components/UploadCard";
import PredictionCard from "@/components/PredictionCard";
import FarmEstimationCard from "@/components/FarmEstimationCard";
import Footer from "@/components/Footer";
import { predictBiomass, PredictionResponse } from "@/lib/api";

export default function Home() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (file: File, ndvi: number, height: number) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null); // Clear previous

    try {
      // Small artificial delay to show off the loading animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = await predictBiomass(file, ndvi, height);
      setPrediction(result);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to predict biomass. Ensure backend is running and model weights are loaded.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Upload */}
            <div className="sticky top-24">
              <UploadCard onPredict={handlePredict} isLoading={isLoading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Right Column: Results */}
            <div>
              {prediction ? (
                <div className="space-y-8">
                  <PredictionCard data={prediction} />
                  <FarmEstimationCard sampleBiomassG={prediction.Dry_Total_g} />
                </div>
              ) : (
                <div className="h-full min-h-[400px] border border-gray-200 dark:border-white/5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] flex flex-col items-center justify-center p-8 text-center transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-400">Waiting for Input</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-600 max-w-sm">
                    Upload a vegetation image and provide NDVI/Height metadata to see the AI biomass predictions here.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
