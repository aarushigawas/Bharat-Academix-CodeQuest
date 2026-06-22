import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              AgriSense AI
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Empowering farmers with AI-driven insights
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
              About
            </Link>
            <Link href="/planner" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
              Crop Planner
            </Link>
            <Link href="/recommendations" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
              Recommendations
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriSense AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
