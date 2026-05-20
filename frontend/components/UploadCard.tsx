"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileImage, X, AlertCircle } from "lucide-react";

interface UploadCardProps {
  onPredict: (file: File, ndvi: number, height: number) => void;
  isLoading: boolean;
}

export default function UploadCard({ onPredict, isLoading }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ndvi, setNdvi] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
        setError(null);
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Please select an image.");
      return;
    }
    
    const ndviVal = parseFloat(ndvi);
    const heightVal = parseFloat(height);

    if (isNaN(ndviVal) || ndviVal < 0 || ndviVal > 1) {
      setError("NDVI must be between 0 and 1.");
      return;
    }

    if (isNaN(heightVal) || heightVal <= 0) {
      setError("Height must be greater than 0.");
      return;
    }

    setError(null);
    onPredict(file, ndviVal, heightVal);
  };

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none rounded-2xl p-6 backdrop-blur-sm transition-colors duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Input Data</h3>
      
      {/* Drag & Drop Area */}
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          file ? "border-green-500/50 bg-green-50 dark:bg-green-500/5" : "border-gray-300 dark:border-gray-600 hover:border-green-500/50 hover:bg-gray-50 dark:hover:bg-white/5"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative inline-block">
            <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-contain shadow-md" />
            <button 
              onClick={(e) => { e.stopPropagation(); clearFile(); }}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
            <div className="bg-green-100 dark:bg-white/10 p-4 rounded-full">
              <UploadCloud className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-white">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {/* Metadata Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NDVI Value</label>
          <input 
            type="number" 
            step="0.01"
            min="0"
            max="1"
            value={ndvi}
            onChange={(e) => setNdvi(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="e.g. 0.65"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vegetation Height (cm)</label>
          <input 
            type="number" 
            step="0.1"
            min="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="e.g. 45.2"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-400/10 p-3 rounded-lg border border-red-200 dark:border-red-400/20">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={isLoading || !file || !ndvi || !height}
        className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-400 dark:hover:to-emerald-500 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Biomass...
          </span>
        ) : (
          "Predict Biomass"
        )}
      </button>
    </div>
  );
}
