'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type VisitorSegment = 'apprentice' | 'employer' | 'technician' | 'career-changer' | null;

interface SegmentContextType {
  selectedSegment: VisitorSegment;
  setSelectedSegment: (segment: VisitorSegment) => void;
  hasSelectedSegment: boolean;
  clearSegment: () => void;
  segmentData: SegmentData | null;
}

interface SegmentData {
  id: VisitorSegment;
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  valuePropositions: string[];
  featuredCourses: string[];
  testimonials: string[];
  heroImage: string;
  backgroundColor: string;
  accentColor: string;
}

const segmentConfigs: Record<Exclude<VisitorSegment, null>, SegmentData> = {
  apprentice: {
    id: 'apprentice',
    title: 'Start Your Telecom Career the Right Way',
    description: 'Get industry-recognized certification and hands-on training that employers want.',
    primaryCTA: 'Check Funding Eligibility',
    secondaryCTA: 'View Apprentice Courses',
    valuePropositions: [
      'Up to 100% AASN funding available',
      'Certificate III qualification pathway',
      'Job placement assistance',
      'Earn while you learn opportunities'
    ],
    featuredCourses: ['cert-iii-telecommunications', 'open-cabler', 'optical-fiber'],
    testimonials: ['apprentice-success-1', 'apprentice-success-2'],
    heroImage: '/images/apprentice-hero.webp',
    backgroundColor: 'from-blue-50 to-indigo-100',
    accentColor: 'text-blue-600'
  },
  employer: {
    id: 'employer',
    title: 'Upskill Your Team with Industry-Recognized Training',
    description: 'Maximize productivity and compliance with professional telecommunications training.',
    primaryCTA: 'Get Training Proposal',
    secondaryCTA: 'View Bulk Options',
    valuePropositions: [
      'AASN funding reduces training costs',
      'On-site training available',
      'Compliance and certification tracking',
      'ROI-focused training programs'
    ],
    featuredCourses: ['bulk-training', 'compliance-update', 'advanced-certification'],
    testimonials: ['employer-success-1', 'employer-success-2'],
    heroImage: '/images/employer-hero.webp',
    backgroundColor: 'from-green-50 to-emerald-100',
    accentColor: 'text-green-600'
  },
  technician: {
    id: 'technician',
    title: 'Add Endorsements. Expand Your Opportunities.',
    description: 'Advance your career with specialized skills and ACMA endorsements.',
    primaryCTA: 'Check Your Eligibility',
    secondaryCTA: 'Browse Endorsements',
    valuePropositions: [
      'RPL fast-track options available',
      'Weekend and evening classes',
      'Industry-specific endorsements',
      'Career advancement pathways'
    ],
    featuredCourses: ['fttc-technician', 'optical-fiber-splicing', 'underground-installation'],
    testimonials: ['technician-success-1', 'technician-success-2'],
    heroImage: '/images/technician-hero.webp',
    backgroundColor: 'from-orange-50 to-amber-100',
    accentColor: 'text-orange-600'
  },
  'career-changer': {
    id: 'career-changer',
    title: 'Join Australia\'s Growing Telecom Industry',
    description: 'Start a rewarding career in telecommunications with comprehensive training.',
    primaryCTA: 'Book Career Consultation',
    secondaryCTA: 'Explore Career Paths',
    valuePropositions: [
      'Complete pathway from zero to licensed',
      'Industry overview and job market data',
      'Flexible payment and funding options',
      'Career transition support'
    ],
    featuredCourses: ['industry-introduction', 'cert-iii-telecommunications', 'career-pathway'],
    testimonials: ['career-changer-success-1', 'career-changer-success-2'],
    heroImage: '/images/career-changer-hero.webp',
    backgroundColor: 'from-purple-50 to-violet-100',
    accentColor: 'text-purple-600'
  }
};

const SegmentContext = createContext<SegmentContextType | undefined>(undefined);

interface SegmentProviderProps {
  children: ReactNode;
}

export function SegmentProvider({ children }: SegmentProviderProps) {
  const [selectedSegment, setSelectedSegment] = useState<VisitorSegment>(null);
  const [hasSelectedSegment, setHasSelectedSegment] = useState(false);

  // Load segment from session storage on mount
  useEffect(() => {
    const savedSegment = sessionStorage.getItem('bc-visitor-segment') as VisitorSegment;
    if (savedSegment && segmentConfigs[savedSegment]) {
      setSelectedSegment(savedSegment);
      setHasSelectedSegment(true);
    }
  }, []);

  // Save segment to session storage when changed
  const handleSetSelectedSegment = (segment: VisitorSegment) => {
    setSelectedSegment(segment);
    setHasSelectedSegment(true);
    
    if (segment) {
      sessionStorage.setItem('bc-visitor-segment', segment);
      
      // Track segment selection
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'segment_selection', {
          event_category: 'User Segmentation',
          event_label: segment,
          value: 1
        });
      }
      
      // Announce to screen readers
      const announcement = `Selected ${segmentConfigs[segment].title} pathway`;
      announceToScreenReader(announcement);
    } else {
      sessionStorage.removeItem('bc-visitor-segment');
    }
  };

  const clearSegment = () => {
    setSelectedSegment(null);
    setHasSelectedSegment(false);
    sessionStorage.removeItem('bc-visitor-segment');
  };

  const segmentData = selectedSegment ? segmentConfigs[selectedSegment] : null;

  const value: SegmentContextType = {
    selectedSegment,
    setSelectedSegment: handleSetSelectedSegment,
    hasSelectedSegment,
    clearSegment,
    segmentData
  };

  return (
    <SegmentContext.Provider value={value}>
      {children}
    </SegmentContext.Provider>
  );
}

export function useSegment() {
  const context = useContext(SegmentContext);
  if (context === undefined) {
    throw new Error('useSegment must be used within a SegmentProvider');
  }
  return context;
}

// Utility function to announce changes to screen readers
function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Hook for getting segment-specific content
export function useSegmentContent() {
  const { segmentData, selectedSegment } = useSegment();
  
  const getSegmentSpecificContent = (content: Record<string, any>, fallback: any = null) => {
    if (!selectedSegment || !segmentData) return fallback;
    return content[selectedSegment] || fallback;
  };
  
  return {
    segmentData,
    selectedSegment,
    getSegmentSpecificContent
  };
}

// Export segment configurations for external use
export { segmentConfigs };
export type { SegmentData };