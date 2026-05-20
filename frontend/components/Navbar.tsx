import { Leaf } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />
            <span className="font-semibold text-xl text-gray-900 dark:text-white tracking-tight">Biomass<span className="text-green-600 dark:text-green-500">AI</span></span>
          </Link>
          <div className="flex items-center space-x-4 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link>
            <Link href="/docs" className="hover:text-gray-900 dark:hover:text-white transition-colors">Documentation</Link>
            <Link href="/api-docs" className="hover:text-gray-900 dark:hover:text-white transition-colors">API</Link>
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
