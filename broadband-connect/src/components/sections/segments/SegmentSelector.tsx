'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSegment, VisitorSegment, segmentConfigs } from '@/contexts/SegmentContext';
import { cn } from '@/lib/utils';

interface SegmentSelectorProps {
  className?: string;
  onSegmentSelect?: (segment: VisitorSegment) => void;
}

const SegmentSelector = ({ className, onSegmentSelect }: SegmentSelectorProps) => {
  const { setSelectedSegment } = useSegment();
  const [hoveredSegment, setHoveredSegment] = useState<VisitorSegment>(null);

  const handleSegmentSelect = (segment: Exclude<VisitorSegment, null>) => {
    setSelectedSegment(segment);
    onSegmentSelect?.(segment);
  };

  const segmentIcons = {
    apprentice: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    employer: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    technician: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    'career-changer': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className={cn('py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get personalized course recommendations and content tailored to your specific needs and goals.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {Object.entries(segmentConfigs).map(([key, config]) => (
            <motion.button
              key={key}
              type="button"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSegmentSelect(key as Exclude<VisitorSegment, null>)}
              onMouseEnter={() => setHoveredSegment(key as VisitorSegment)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={cn(
                'segment-card group relative p-6 rounded-xl text-left transition-all duration-300',
                'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
                'border border-gray-200 dark:border-gray-700 hover:border-primary',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'transform hover:translate-y-1'
              )}
              aria-label={`Select ${config.title} pathway`}
            >
              {/* Background gradient overlay */}
              <div 
                className={cn(
                  'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                  `bg-gradient-to-br ${config.backgroundColor}`
                )}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10">
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300',
                  'bg-gray-100 dark:bg-gray-700 group-hover:bg-primary group-hover:text-white',
                  hoveredSegment === key ? 'bg-primary text-white' : 'text-primary'
                )}>
                  {segmentIcons[key as keyof typeof segmentIcons]}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {key === 'apprentice' && 'Apprentice'}
                  {key === 'employer' && 'Employer'}
                  {key === 'technician' && 'Technician'}
                  {key === 'career-changer' && 'Career Changer'}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {config.description}
                </p>

                {/* Value proposition preview */}
                <div className="space-y-1">
                  {config.valuePropositions.slice(0, 2).map((prop, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{prop}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium mr-2">Get Started</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </motion.button>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Not sure which path is right for you?{' '}
            <button 
              type="button" 
              className="text-primary hover:text-primary-dark underline transition-colors duration-200"
              onClick={() => {/* Open career consultation modal */}}
            >
              Book a free consultation
            </button>{' '}
            to speak with our training advisors.
          </p>
        </motion.div>
      </div>

      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        aria-atomic="true"
      >
        {hoveredSegment && `Focusing on ${segmentConfigs[hoveredSegment].title} option`}
      </div>
    </section>
  );
};

export default SegmentSelector;