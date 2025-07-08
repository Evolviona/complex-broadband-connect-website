'use client';

import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  className?: string;
  style?: React.CSSProperties;
}

const TrustBadges = ({ className, style }: TrustBadgesProps) => {
  const badges = [
    {
      name: 'AQF',
      description: 'Australian Qualifications Framework',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2L20.09 9.26L28 11L22.91 17.09L24.18 25L16 20.77L7.82 25L9.09 17.09L4 11L11.91 9.26L16 2Z" />
        </svg>
      )
    },
    {
      name: 'NRT',
      description: 'Nationally Recognised Training',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 4C22.627 4 28 9.373 28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4ZM16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM14.5 11L17.5 14L21.5 10L23 11.5L17.5 17L13 12.5L14.5 11Z" />
        </svg>
      )
    },
    {
      name: 'Skills Assure',
      description: 'Industry Skills Council',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2L21 7H27V13L30 16L27 19V25H21L16 30L11 25H5V19L2 16L5 13V7H11L16 2ZM16 5.5L12.5 9H7V12.5L4.5 16L7 19.5V25H12.5L16 28.5L19.5 25H25V19.5L27.5 16L25 12.5V9H19.5L16 5.5ZM16 11C18.761 11 21 13.239 21 16C21 18.761 18.761 21 16 21C13.239 21 11 18.761 11 16C11 13.239 13.239 11 16 11Z" />
        </svg>
      )
    },
    {
      name: 'ACMA',
      description: 'Australian Communications and Media Authority',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C19.866 2 23 5.134 23 9V11H25C26.105 11 27 11.895 27 13V27C27 28.105 26.105 29 25 29H7C5.895 29 5 28.105 5 27V13C5 11.895 5.895 11 7 11H9V9C9 5.134 12.134 2 16 2ZM25 13H7V27H25V13ZM16 19C17.105 19 18 19.895 18 21C18 22.105 17.105 23 16 23C14.895 23 14 22.105 14 21C14 19.895 14.895 19 16 19ZM16 4C13.239 4 11 6.239 11 9V11H21V9C21 6.239 18.761 4 16 4Z" />
        </svg>
      )
    }
  ];

  return (
    <div 
      className={cn("trust-badges", className)} 
      style={style}
      role="list"
      aria-label="Credentials and certifications"
    >
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
        Trusted by industry leaders and recognized by:
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
        {badges.map((badge, index) => (
          <div
            key={badge.name}
            className="trust-badge group"
            role="listitem"
            style={{
              animationDelay: `${1.5 + index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                {badge.icon}
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {badge.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 max-w-20 leading-tight">
                  {badge.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional credentials bar */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            RTO Provider: 52423
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Queensland Based
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            National Delivery
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;