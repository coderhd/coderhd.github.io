'use client';

import Link from 'next/link';
import Logo from './components/Logo';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0c192f] flex flex-col items-center justify-center text-center px-4">
            <Logo size={80} />

            <h2 className="text-4xl font-bold text-gray-200 mt-8 mb-4">404</h2>
            <p className="text-xl text-gray-400 mb-2">Page Not Found</p>
            <p className="text-gray-400 max-w-md mb-10">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
                href="/"
                className="border border-[#64ffda] text-[#64ffda] px-6 py-3 rounded-sm hover:bg-[#64ffda]/10 transition-colors font-mono"
            >
                Go Back Home
            </Link>
        </div>
    );
} 