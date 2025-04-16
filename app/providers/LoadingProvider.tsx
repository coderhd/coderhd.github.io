'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Logo from '../components/Logo';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

// Custom loading content with Logo animation
const LoadingContent = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c192f]">
            <div className="text-center">
                <Logo size={200} animated={true} onAnimationComplete={onLoadingComplete} />
            </div>
        </div>
    );
};

// Suspense fallback component
const SuspenseFallback = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c192f]">
            <div className="text-center">
                <Logo size={200} animated={true} />
            </div>
        </div>
    );
};

// Separate component for route change detection
const RouteChangeDetector = ({ onRouteChange }: { onRouteChange: () => void }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Handle route changes
    useEffect(() => {
        onRouteChange();
    }, [pathname, searchParams, onRouteChange]);

    return null;
};

export const LoadingProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        isLoading,
        setIsLoading
    }), [isLoading]);

    // Function to handle animation completion
    const handleAnimationComplete = () => {
        // We'll set a flag that animation is complete, but keep isLoading true
        // until we start showing content
        setInitialLoadComplete(true);
    };

    // Effect to handle the transition after animation completes
    useEffect(() => {
        if (initialLoadComplete && isLoading) {
            setIsLoading(false);
            setContentVisible(true);
        }
    }, [initialLoadComplete, isLoading]);

    // Memoize the route change handler to prevent unnecessary re-renders
    const handleRouteChange = useMemo(() => {
        return () => {
            if (!showContent) {
                // First render
                setShowContent(true);
                return;
            }

            // Only set loading on route changes after initial load
            if (initialLoadComplete) {
                // Set loading state on route change
                setIsLoading(true);
                setContentVisible(false);

                // For route changes, use a shorter loading time
                const timeout = setTimeout(() => {
                    setIsLoading(false);
                    setContentVisible(true);
                }, 800); // Shorter loading time for navigation between pages

                return () => clearTimeout(timeout);
            }
        };
    }, [showContent, initialLoadComplete]);

    // Handle transitions between loading and content
    useEffect(() => {
        if (!isLoading) {
            // Add page transition class to body when loading is done
            document.body.classList.add('page-transition');
        } else {
            // Remove transition class when loading starts
            document.body.classList.remove('page-transition');
        }
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {/* Show loading animation when in loading state */}
            {isLoading && <LoadingContent onLoadingComplete={handleAnimationComplete} />}

            {/* Wrap content in a div that controls visibility */}
            <div
                className={`page-content ${contentVisible ? 'animate-fadeIn' : 'opacity-0'}`}
                style={{
                    visibility: contentVisible || !initialLoadComplete ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease-in-out'
                }}
            >
                <Suspense fallback={<SuspenseFallback />}>
                    <RouteChangeDetector onRouteChange={handleRouteChange} />
                    {children}
                </Suspense>
            </div>
        </LoadingContext.Provider>
    );
};

export default LoadingProvider; 