'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollTimeline } from '@/hooks/useScrollTimeline';
import CTAButton from '@/components/ui/buttons/CTAButton';
import dynamic from 'next/dynamic';

// Dynamic import for heavy animation
const ParticleBackground = dynamic(
  () => import('./ParticleBackground'),
  {
    ssr: false,
    loading: () => <div className="hero-skeleton" />
  }
);

// Dynamic import for trust badges
const TrustBadges = dynamic(
  () => import('./TrustBadges'),
  {
    ssr: false,
    loading: () => <div className="h-16 w-full animate-pulse bg-gray-200 rounded" />
  }
);

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const scrollProgress = useScrollTimeline();

  return (
    <section className="hero-container relative overflow-hidden" aria-label="Hero section">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* CSS-based animated waves - no JS required */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="wave-container">
          <svg className="wave wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
          <svg className="wave wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
          <svg className="wave wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
          </svg>
        </div>
      </div>

      {/* Conditional particle background */}
      {!prefersReducedMotion && <ParticleBackground />}

      {/* Self-drawing circuits using CSS animations */}
      <div className="circuit-container absolute inset-0 z-20" aria-hidden="true">
        <svg className="circuit-svg w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--secondary-color)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            className="circuit-path"
            d="M100,500 L200,500 L200,400 L400,400 L400,300 L600,300"
            stroke="url(#circuitGradient)"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className="circuit-path"
            d="M100,600 L300,600 L300,700 L500,700 L500,800 L700,800"
            stroke="url(#circuitGradient)"
            strokeDasharray="800"
            strokeDashoffset="800"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            className="circuit-path"
            d="M200,200 L400,200 L400,100 L600,100 L600,200 L800,200"
            stroke="url(#circuitGradient)"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Content with stagger animations */}
      <div className="relative z-30 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          <h1
            className="hero-headline font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-white"
            style={{
              animationDelay: '0.5s',
              animationFillMode: 'both'
            }}
          >
            <span className="block">Powering the Next Generation</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              of Technicians
            </span>
          </h1>

          <p
            className="hero-subheadline font-quicksand text-lg sm:text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 max-w-4xl mx-auto"
            style={{
              animationDelay: '0.9s',
              animationFillMode: 'both'
            }}
          >
            Accredited Telecommunications Training. Hands-On. Industry Ready.
            <br />
            <span className="text-base sm:text-lg font-medium text-primary">
              Build your career with Australia's leading telecommunications training provider
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTAButton
              variant="solid"
              href="/courses"
              className="hero-cta-primary text-lg px-10 py-5"
              style={{ animationDelay: '1.2s' }}
              trackingLabel="hero_view_courses"
            >
              View Courses
            </CTAButton>
            <CTAButton
              variant="outline"
              href="/contact"
              className="hero-cta-secondary text-lg px-10 py-5"
              style={{ animationDelay: '1.35s' }}
              trackingLabel="hero_get_in_touch"
            >
              Get in Touch
            </CTAButton>
          </div>

          {/* Trust Badges */}
          <TrustBadges
            className="hero-badges"
            style={{ animationDelay: '1.5s' }}
          />

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            style={{ animationDelay: '2s' }}
            aria-hidden="true"
          >
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;