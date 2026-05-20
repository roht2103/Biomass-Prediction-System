import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      
      <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">API Reference</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Integrate BiomassAI directly into your pipelines using our RESTful FastAPI endpoints.
          </p>
          <div className="mt-6 flex items-center space-x-3 bg-gray-100 dark:bg-white/5 py-2 px-4 rounded-lg w-fit border border-gray-200 dark:border-white/10">
            <span className="text-sm font-semibold text-gray-500">Base URL</span>
            <code className="text-sm text-green-600 dark:text-green-400 font-mono">http://localhost:8000</code>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* Predict Endpoint */}
          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300">
            <div className="border-b border-gray-200 dark:border-white/10 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">POST</span>
                <h2 className="text-xl font-mono text-gray-900 dark:text-white">/predict</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyze an image and metadata to predict 5 specific biomass characteristics.</p>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Request Body (multipart/form-data)</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex flex-col">
                    <span className="font-mono text-gray-900 dark:text-gray-200 font-medium">image <span className="text-gray-400 dark:text-gray-500 font-sans font-normal ml-2">File</span> <span className="text-red-500 text-xs ml-2">Required</span></span>
                    <span className="text-gray-600 dark:text-gray-400 mt-1">Vegetation image file (jpg, png).</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="font-mono text-gray-900 dark:text-gray-200 font-medium">ndvi <span className="text-gray-400 dark:text-gray-500 font-sans font-normal ml-2">Float</span> <span className="text-red-500 text-xs ml-2">Required</span></span>
                    <span className="text-gray-600 dark:text-gray-400 mt-1">Normalized Difference Vegetation Index [0, 1].</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="font-mono text-gray-900 dark:text-gray-200 font-medium">height <span className="text-gray-400 dark:text-gray-500 font-sans font-normal ml-2">Float</span> <span className="text-red-500 text-xs ml-2">Required</span></span>
                    <span className="text-gray-600 dark:text-gray-400 mt-1">Vegetation height in cm.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 shadow-inner">
                <div className="text-xs text-gray-400 mb-2 font-semibold tracking-wide uppercase">Response (JSON)</div>
                <pre className="text-sm text-green-400 font-mono overflow-x-auto whitespace-pre">
{`{
  "Dry_Green_g": 20.9,
  "Dry_Clover_g": 7.0,
  "Dry_Dead_g": 0.3,
  "GDM_g": 21.3,
  "Dry_Total_g": 31.3,
  "condition": "🟡 Moderate pasture condition",
  "confidence": 0.92,
  "processing_time": "0.75 sec"
}`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/20">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Example Request</h3>
              <pre className="text-sm text-gray-300 font-mono bg-gray-900 p-4 rounded-lg overflow-x-auto">
{`import requests

url = "http://localhost:8000/predict"
files = { "image": open("pasture_sample.jpg", "rb") }
data = {
    "ndvi": 0.76,
    "height": 20.0
}

response = requests.post(url, files=files, data=data)
print(response.json())`}
              </pre>
            </div>
          </section>

          {/* Model Info Endpoint */}
          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300">
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">GET</span>
                  <h2 className="text-xl font-mono text-gray-900 dark:text-white">/model-info</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Retrieve backend model configuration and architecture metadata.</p>
              </div>
            </div>
          </section>

          {/* Health Endpoint */}
          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300">
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">GET</span>
                  <h2 className="text-xl font-mono text-gray-900 dark:text-white">/health</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lightweight endpoint to verify the API is online and responding.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
