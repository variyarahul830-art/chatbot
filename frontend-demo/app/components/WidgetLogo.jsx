'use client';

import React, { useMemo } from 'react';
import styles from './WidgetLogo.module.css';

// ============================================================================
// LogoGradients: Define SVG gradients for brain & neural effects
// ============================================================================
const LogoGradients = ({ isDarkMode }) => (
  <defs>
    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={isDarkMode ? '#818cf8' : '#4f46e5'} />
      <stop offset="100%" stopColor={isDarkMode ? '#c084fc' : '#9333ea'} />
    </linearGradient>

    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={isDarkMode ? '#06b6d4' : '#0891b2'} />
      <stop offset="100%" stopColor={isDarkMode ? '#34d399' : '#10b981'} />
    </linearGradient>

    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="glowIntense">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// ============================================================================
// BrainOutline: Main brain silhouette shape
// ============================================================================
const BrainOutline = ({ isDarkMode }) => (
  <path
    d="M 32 4 Q 44 8 48 20 Q 50 28 48 36 L 44 44 Q 46 48 44 52 Q 42 56 36 58 L 28 60 Q 20 60 16 58 Q 10 56 8 52 Q 6 48 8 44 L 4 36 Q 2 28 4 20 Q 8 8 20 4 Q 26 2 32 4 Z"
    fill="url(#brainGradient)"
    stroke={isDarkMode ? '#818cf8' : '#4f46e5'}
    strokeWidth="2"
    opacity="0.9"
  />
);

// ============================================================================
// NeuralNodes: Individual dots representing neural points
// ============================================================================
const NeuralNodes = ({ isDarkMode, animate }) => {
  const nodes = [
    { cx: 16, cy: 20, r: 1.5 },
    { cx: 32, cy: 12, r: 1.5 },
    { cx: 48, cy: 20, r: 1.5 },
    { cx: 48, cy: 40, r: 1.5 },
    { cx: 32, cy: 48, r: 1.8 },
    { cx: 16, cy: 40, r: 1.5 },
    { cx: 24, cy: 32, r: 1.2 },
    { cx: 40, cy: 32, r: 1.2 },
  ];

  return (
    <>
      {nodes.map((node, idx) => (
        <circle
          key={idx}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={isDarkMode ? '#06b6d4' : '#0891b2'}
          filter="url(#glow)"
          className={animate ? styles.nodePulse : ''}
          style={{
            animationDelay: animate ? `${idx * 0.1}s` : 'none',
          }}
        />
      ))}
    </>
  );
};

// ============================================================================
// SynapseConnections: Lines connecting neural nodes
// ============================================================================
const SynapseConnections = ({ isDarkMode }) => {
  const connections = [
    { x1: 16, y1: 20, x2: 24, y2: 32 },
    { x1: 24, y1: 32, x2: 32, y2: 12 },
    { x1: 32, y1: 12, x2: 48, y2: 20 },
    { x1: 48, y1: 20, x2: 40, y2: 32 },
    { x1: 40, y1: 32, x2: 48, y2: 40 },
    { x1: 48, y1: 40, x2: 32, y2: 48 },
    { x1: 32, y1: 48, x2: 16, y2: 40 },
    { x1: 16, y1: 40, x2: 24, y2: 32 },
  ];

  return (
    <>
      {connections.map((conn, idx) => (
        <line
          key={idx}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke="url(#neuralGradient)"
          strokeWidth="1.2"
          opacity="0.7"
        />
      ))}
    </>
  );
};

// ============================================================================
// WidgetLogoIcon: Icon-only version (compact)
// ============================================================================
export const WidgetLogoIcon = React.memo(
  React.forwardRef(
    (
      {
        size = 'md',
        animate = false,
        className = '',
        ariaLabel = 'AI Chat Widget Logo',
      },
      ref
    ) => {
      const isDarkMode = useMemo(() => {
        if (typeof window !== 'undefined') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
      }, []);

      const sizeMap = {
        sm: 16,
        md: 24,
        lg: 32,
        xl: 40,
      };

      const dimension = sizeMap[size] || sizeMap.md;
      const scale = dimension / 64;

      return (
        <svg
          ref={ref}
          width={dimension}
          height={dimension}
          viewBox="0 0 64 64"
          className={`${styles.logo} ${styles[`size-${size}`]} ${className}`}
          aria-label={ariaLabel}
          role="img"
          focusable="false"
        >
          <LogoGradients isDarkMode={isDarkMode} />
          <BrainOutline isDarkMode={isDarkMode} />
          <NeuralNodes isDarkMode={isDarkMode} animate={animate} />
          <SynapseConnections isDarkMode={isDarkMode} />
        </svg>
      );
    }
  )
);

WidgetLogoIcon.displayName = 'WidgetLogoIcon';

// ============================================================================
// WidgetLogo: Full logo with text label
// ============================================================================
export const WidgetLogo = React.memo(
  React.forwardRef(
    (
      {
        size = 'md',
        variant = 'default',
        animate = false,
        text = '',
        className = '',
      },
      ref
    ) => {
      const iconSize = size === 'lg' ? 'md' : 'sm';
      const textClass = size === 'lg' ? styles.textLg : styles.textMd;

      return (
        <div
          ref={ref}
          className={`${styles.logoContainer} ${styles[`variant-${variant}`]} ${className}`}
        >
          <WidgetLogoIcon size={iconSize} animate={animate} />
          {text && <span className={textClass}>{text}</span>}
        </div>
      );
    }
  )
);

WidgetLogo.displayName = 'WidgetLogo';

export default WidgetLogoIcon;
