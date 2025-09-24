// utils/responsive.tsx - Responsive utilities and custom hooks

'use client';

import { useState, useEffect } from 'react';

// Breakpoint values matching your Tailwind config
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Custom hook for responsive behavior
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Determine current breakpoint
      if (width >= breakpoints['3xl']) {
        setCurrentBreakpoint('3xl');
      } else if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    }

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    currentBreakpoint,
    isXs: currentBreakpoint === 'xs',
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    is2Xl: currentBreakpoint === '2xl',
    is3Xl: currentBreakpoint === '3xl',
    isMobile: windowSize.width < breakpoints.md,
    isTablet: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
  };
}

// Device detection hook
export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false,
    isApple: false,
    isAndroid: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isApple = /Mac|iPhone|iPad|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    const width = window.innerWidth;
    
    setDeviceInfo({
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
      isTouchDevice,
      isApple,
      isAndroid,
    });
  }, []);

  return deviceInfo;
}

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  priority?: boolean;
  quality?: number;
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
  quality = 80,
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate srcSet based on sizes
  const generateSrcSet = () => {
    if (!sizes) return src;
    
    const srcSet = Object.entries(sizes)
      .map(([breakpoint, imageSrc]) => `${imageSrc} ${breakpoints[breakpoint as Breakpoint]}w`)
      .join(', ');
    
    return srcSet || src;
  };

  return (
    <picture>
      {sizes && Object.entries(sizes).map(([breakpoint, imageSrc]) => (
        <source
          key={breakpoint}
          media={`(min-width: ${breakpoints[breakpoint as Breakpoint]}px)`}
          srcSet={imageSrc}
        />
      ))}
      <img
        src={src}
        alt={alt}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'bg-gray-200' : ''}
          ${className}
        `}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </picture>
  );
}

// Responsive container component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveContainer({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    '3xl': 'max-w-9xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-3 xs:px-4',
    md: 'px-3 xs:px-4 sm:px-6 lg:px-8',
    lg: 'px-4 xs:px-6 sm:px-8 lg:px-12',
    xl: 'px-4 xs:px-6 sm:px-8 lg:px-12 xl:px-16',
  };

  return (
    <div
      className={`
        mx-auto w-full
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Responsive grid component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({
  children,
  className = '',
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
}: ResponsiveGridProps) {
  const columnClasses = Object.entries(columns)
    .map(([breakpoint, cols]) => {
      const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
      return `${prefix}grid-cols-${cols}`;
    })
    .join(' ');

  const gapClasses = {
    sm: 'gap-3 xs:gap-4',
    md: 'gap-4 xs:gap-5 sm:gap-6',
    lg: 'gap-5 xs:gap-6 sm:gap-8',
    xl: 'gap-6 xs:gap-8 sm:gap-10',
  };

  return (
    <div
      className={`
        grid
        ${columnClasses}
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  className?: string;
  fluid?: boolean;
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  size = 'base',
  className = '',
  fluid = false,
}: ResponsiveTextProps) {
  const sizeClasses = fluid
    ? {
        xs: 'text-fluid-xs',
        sm: 'text-fluid-sm',
        base: 'text-fluid-base',
        lg: 'text-fluid-lg',
        xl: 'text-fluid-xl',
        '2xl': 'text-fluid-2xl',
        '3xl': 'text-fluid-3xl',
        '4xl': 'text-fluid-4xl',
        '5xl': 'text-fluid-5xl',
        '6xl': 'text-fluid-6xl',
      }
    : {
        xs: 'text-xs xs:text-sm',
        sm: 'text-sm xs:text-base',
        base: 'text-base xs:text-lg',
        lg: 'text-lg xs:text-xl',
        xl: 'text-xl xs:text-2xl',
        '2xl': 'text-2xl xs:text-3xl',
        '3xl': 'text-3xl xs:text-4xl sm:text-5xl',
        '4xl': 'text-4xl xs:text-5xl sm:text-6xl',
        '5xl': 'text-5xl xs:text-6xl sm:text-7xl',
        '6xl': 'text-6xl xs:text-7xl sm:text-8xl',
      };

  return (
    <Component className={`${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
}

// Utility functions
export const getResponsiveValue = <T,>(
  values: Partial<Record<Breakpoint, T>>,
  currentBreakpoint: Breakpoint
): T | undefined => {
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (values[breakpoint] !== undefined) {
      return values[breakpoint];
    }
  }
  
  return undefined;
};

export const clamp = (min: number, value: number, max: number): number => {
  return Math.min(Math.max(min, value), max);
};

export const fluidSize = (minSize: number, maxSize: number, minWidth = 375, maxWidth = 1920): string => {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const intersection = -minWidth * slope + minSize;
  
  return `clamp(${minSize}px, ${intersection}px + ${slope * 100}vw, ${maxSize}px)`;
};