'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useScrollTimeline } from '@/hooks/useScrollTimeline';
import { useFeatureFlag } from '@/lib/features';
import { throttle } from '@/lib/utils';
import FocusTrap from 'focus-trap-react';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollProgress = useScrollTimeline();
  const enableParticles = useFeatureFlag('enableParticles');
  const navRef = useRef<HTMLElement>(null);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', section: 'home' },
    { href: '/courses', label: 'Courses', section: 'courses' },
    { href: '/segments', label: 'For You', section: 'segments' },
    { href: '/about', label: 'About', section: 'about' },
    { href: '/contact', label: 'Contact', section: 'contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = scrollTop + 100;
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle link click with smooth scroll
  const handleLinkClick = (href: string, section: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('/#') || (href === '/' && section !== 'home')) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Prefetch links on hover
  const handleLinkHover = (href: string) => {
    if (href !== '/') {
      // Prefetch the page
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          'glass-nav backdrop-blur-xl border-b border-white/10',
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 shadow-xl backdrop-blur-2xl' 
            : 'bg-transparent',
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scroll progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="glass-logo flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
              onClick={() => handleLinkClick('/', 'home')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
              <span className="font-heading text-xl font-bold text-gray-900 dark:text-white">
                Broadband Connect
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link relative px-3 py-2 text-sm font-medium transition-all duration-200',
                    'hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md',
                    activeSection === item.section
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  )}
                  onClick={() => handleLinkClick(item.href, item.section)}
                  onMouseEnter={() => handleLinkHover(item.href)}
                  aria-current={activeSection === item.section ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.section && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-200"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {/* Hamburger icon */}
              <div className="w-6 h-6 relative">
                <span
                  className={cn(
                    'absolute left-0 w-full h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen ? 'top-2.5 rotate-45' : 'top-1'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-2.5 w-full h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 w-full h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <FocusTrap active={isMobileMenuOpen}>
        <div
          id="mobile-menu"
          className={cn(
            'fixed top-16 left-0 right-0 z-50 md:hidden',
            'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700',
            'transform transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  activeSection === item.section
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-700 dark:text-gray-300'
                )}
                role="menuitem"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => handleLinkClick(item.href, item.section)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </FocusTrap>

      {/* Announcement for screen readers */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        aria-atomic="true"
      >
        {activeSection && `Currently viewing ${activeSection} section`}
      </div>
    </>
  );
};

export default Navigation;