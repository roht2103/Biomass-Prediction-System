import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <section>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Documentation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Understand the core mechanics, data requirements, and model architecture powering the BiomassAI Prediction Platform.
            </p>
          </section>

          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Model Architecture</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The platform utilizes a multi-modal approach to biomass estimation, combining visual features with tabular metadata:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Vision Backbone:</strong> `EfficientNet-B3` extracts high-dimensional visual features from the uploaded vegetation imagery.</li>
              <li><strong className="text-gray-900 dark:text-white">Metadata MLP:</strong> A multi-layer perceptron processes normalized scalar inputs (`NDVI` and `Vegetation Height`).</li>
              <li><strong className="text-gray-900 dark:text-white">Feature Fusion:</strong> Visual embeddings and metadata embeddings are concatenated.</li>
              <li><strong className="text-gray-900 dark:text-white">Regression Head:</strong> A multi-task regression head outputs continuous predictions in log-space, which are then inversely transformed (`np.expm1`) for final analysis.</li>
              <li><strong className="text-gray-900 dark:text-white">Ensemble:</strong> Predictions from 5 distinct `Fold` models are averaged to maximize generalization and confidence.</li>
            </ul>
          </section>

          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Inputs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Vegetation Imagery</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">A top-down image of the vegetation region. Images are automatically resized to 300x300 and normalized using ImageNet statistics.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. NDVI (Normalized Difference Vegetation Index)</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">A critical indicator of vegetation health and density. Must be a float value between `0.0` and `1.0`.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Vegetation Height (cm)</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">The physical height of the sampled pasture area, measured in centimeters. Must be greater than `0`.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Predicted Outputs</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The model independently regresses 5 specific components of the biomass distribution:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg">
                <span className="font-semibold text-green-600 dark:text-green-500">Dry Green (g)</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total mass of green vegetative material.</p>
              </div>
              <div className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">Dry Clover (g)</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total mass of clover content.</p>
              </div>
              <div className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg">
                <span className="font-semibold text-amber-600 dark:text-amber-500">Dry Dead (g)</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total mass of necrotic/dead material.</p>
              </div>
              <div className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg">
                <span className="font-semibold text-violet-600 dark:text-violet-500">GDM (g)</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Green Dry Matter.</p>
              </div>
              <div className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg sm:col-span-2">
                <span className="font-semibold text-gray-900 dark:text-white">Dry Total (g)</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">The aggregate dry mass calculation. This value drives the pasture condition indicator logic.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
