export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black/50 border-t border-gray-200 dark:border-white/10 py-8 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-500">
        <p>© {new Date().getFullYear()} BiomassAI Platform. All rights reserved.</p>
        <p className="mt-2 text-gray-400 dark:text-gray-600">
          Predictions represent biomass estimation for the sampled vegetation region visible in the uploaded image, 
          not total farm biomass.
        </p>
      </div>
    </footer>
  );
}
