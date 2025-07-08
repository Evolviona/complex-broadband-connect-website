export interface FeatureFlags {
  enableSkillTree: boolean;
  enableAdvancedFilters: boolean;
  enableConfetti: boolean;
  enableParticles: boolean;
  enableHeatmap: boolean;
  enableABTesting: boolean;
  enableRealTimeUpdates: boolean;
  enableVirtualScrolling: boolean;
  enableOfflineMode: boolean;
  enableVisualRegression: boolean;
}

const defaultFlags: FeatureFlags = {
  enableSkillTree: true,
  enableAdvancedFilters: true,
  enableConfetti: true,
  enableParticles: true,
  enableHeatmap: false,
  enableABTesting: false,
  enableRealTimeUpdates: false,
  enableVirtualScrolling: true,
  enableOfflineMode: false,
  enableVisualRegression: false,
};

const developmentFlags: Partial<FeatureFlags> = {
  enableHeatmap: true,
  enableABTesting: true,
  enableRealTimeUpdates: true,
  enableVisualRegression: true,
};

const productionFlags: Partial<FeatureFlags> = {
  enableHeatmap: true,
  enableABTesting: true,
  enableOfflineMode: true,
};

function getEnvironmentFlags(): Partial<FeatureFlags> {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NODE_ENV === 'production' ? productionFlags : developmentFlags;
  }

  // Client-side
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname.includes('vercel.app')) {
    return developmentFlags;
  }
  
  return productionFlags;
}

function getFeatureFlags(): FeatureFlags {
  const environmentFlags = getEnvironmentFlags();
  const urlFlags = getURLOverrides();
  
  return {
    ...defaultFlags,
    ...environmentFlags,
    ...urlFlags,
  };
}

function getURLOverrides(): Partial<FeatureFlags> {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const overrides: Partial<FeatureFlags> = {};
  
  // Allow URL overrides for development/testing
  // Example: ?enableSkillTree=false&enableConfetti=true
  Object.keys(defaultFlags).forEach((key) => {
    const value = urlParams.get(key);
    if (value !== null) {
      overrides[key as keyof FeatureFlags] = value === 'true';
    }
  });
  
  return overrides;
}

// Singleton pattern for feature flags
let featureFlags: FeatureFlags | null = null;

export function useFeatureFlags(): FeatureFlags {
  if (!featureFlags) {
    featureFlags = getFeatureFlags();
  }
  return featureFlags;
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = useFeatureFlags();
  return flags[feature];
}

// Hook for React components
export function useFeatureFlag(feature: keyof FeatureFlags): boolean {
  return isFeatureEnabled(feature);
}

// Environment-specific utilities
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

// Performance monitoring flag
export function shouldEnablePerformanceMonitoring(): boolean {
  return isProduction || isFeatureEnabled('enableVisualRegression');
}

// Analytics flag
export function shouldEnableAnalytics(): boolean {
  return isProduction || isDevelopment;
}

// Debug logging
export function debugLog(message: string, data?: any): void {
  if (!isProduction) {
    console.log(`[BC Debug] ${message}`, data || '');
  }
}

// Feature flag debugging for development
if (!isProduction && typeof window !== 'undefined') {
  (window as any).__BC_FEATURES__ = {
    getFlags: useFeatureFlags,
    toggleFeature: (feature: keyof FeatureFlags) => {
      if (featureFlags) {
        featureFlags[feature] = !featureFlags[feature];
        console.log(`Feature ${feature} toggled to:`, featureFlags[feature]);
      }
    },
    enableAll: () => {
      if (featureFlags) {
        Object.keys(featureFlags).forEach(key => {
          featureFlags![key as keyof FeatureFlags] = true;
        });
        console.log('All features enabled');
      }
    },
    disableAll: () => {
      if (featureFlags) {
        Object.keys(featureFlags).forEach(key => {
          featureFlags![key as keyof FeatureFlags] = false;
        });
        console.log('All features disabled');
      }
    },
  };
}