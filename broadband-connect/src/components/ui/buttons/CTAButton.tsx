'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  variant: 'solid' | 'outline';
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  trackingLabel?: string;
}

const CTAButton = ({
  variant,
  href,
  children,
  className,
  style,
  trackingLabel
}: CTAButtonProps) => {
  const [isIdle, setIsIdle] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start idle animation after 3 seconds
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    // Reset idle state
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);

    // Track event
    if (trackingLabel && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: trackingLabel,
      });
    }
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      className={cn(
        "cta-button relative inline-block px-8 py-4 rounded-lg font-quicksand font-semibold transition-all duration-300",
        "transform-gpu will-change-transform", // GPU acceleration
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", // Accessibility
        variant === 'solid'
          ? "bg-primary text-white hover:bg-primary-dark hover:shadow-glow"
          : "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
        isIdle && "animate-pulse-glow",
        className
      )}
      style={style}
    >
      <span className="relative z-10">{children}</span>

      {/* Ripple effect container */}
      <span className="cta-ripple absolute inset-0 rounded-lg overflow-hidden">
        <span className="cta-ripple-effect" />
      </span>

      {/* Hover glow effect */}
      <span 
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
};

export default CTAButton;