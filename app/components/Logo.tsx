'use client';
import React, { useEffect, useRef } from 'react';

interface LogoProps {
    size?: number;
    className?: string;
    animated?: boolean;
    onAnimationComplete?: () => void;
}

const Logo: React.FC<LogoProps> = ({
    size = 60,
    className = "",
    animated = false,
    onAnimationComplete
}) => {
    const hexagonRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (animated && hexagonRef.current) {
            // Get the total length of the hexagon path
            const length = hexagonRef.current.getTotalLength();

            // Set initial styles for animation
            hexagonRef.current.style.strokeDasharray = `${length}`;
            hexagonRef.current.style.strokeDashoffset = `${length}`;

            // Trigger animation
            setTimeout(() => {
                if (hexagonRef.current) {
                    hexagonRef.current.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                    hexagonRef.current.style.strokeDashoffset = '0';

                    // Call the callback when animation completes
                    if (onAnimationComplete) {
                        const animationDuration = 1500; // Duration of the animation in ms
                        setTimeout(() => {
                            onAnimationComplete();
                        }, animationDuration);
                    }
                }
            }, 300);
        }
    }, [animated, onAnimationComplete]);

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Hexagon */}
                <path
                    ref={hexagonRef}
                    d="M250 0L464.95 125V375L250 500L35.05 375V125L250 0Z"
                    fill={animated ? "transparent" : "#0c192f"}
                    stroke="#64ffda"
                    strokeWidth="16"
                />

                {/* HD Text */}
                <text
                    x="140"
                    y="310"
                    fontSize="160"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    fill="#64ffda"
                    className={animated ? "opacity-0 animate-fadeIn" : ""}
                    style={animated ? { animationDelay: '1s', animationDuration: '0.5s', animationFillMode: 'forwards' } : {}}
                >
                    HD
                </text>
            </svg>
        </div>
    );
};

export default Logo; 