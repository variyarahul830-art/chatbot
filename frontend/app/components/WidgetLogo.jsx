'use client';

import React, { useId } from 'react';
import styles from './WidgetLogo.module.css';

/**
 * SVG gradient definitions for the logo
 */
const LogoGradients = React.memo(({ id }) => (
  <defs>
    <linearGradient id={`${id}-primary-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="var(--logo-primary)" />
      <stop offset="100%" stopColor="var(--logo-primary-dark)" />
    </linearGradient>
    <linearGradient id={`${id}-accent-gradient`} x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="var(--logo-accent)" />
      <stop offset="100%" stopColor="var(--logo-accent-light)" />
    </linearGradient>
    <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
));

LogoGradients.displayName = 'LogoGradients';

/**
 * Brain outline path - forms the base of the logo
 */
const BrainOutline = React.memo(({ id, variant = 'default' }) => {
  const opacity = variant === 'minimal' ? 0.6 : 1;

  return (
    <>
      {/* Left hemisphere */}
      <path
        d="M 16 32 Q 16 20 22 16 Q 26 14 28 14 L 28 50 Q 26 50 22 48 Q 16 44 16 32"
        fill="none"
        stroke={`url(#${id}-primary-gradient)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />

      {/* Right hemisphere */}
      <path
        d="M 48 32 Q 48 20 42 16 Q 38 14 36 14 L 36 50 Q 38 50 42 48 Q 48 44 48 32"
        fill="none"
        stroke={`url(#${id}-primary-gradient)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />

      {/* Bridge connecting hemispheres */}
      <line
        x1="28"
        y1="14"
        x2="36"
        y2="14"
        stroke={`url(#${id}-primary-gradient)`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="50"
        x2="36"
        y2="50"
        stroke={`url(#${id}-primary-gradient)`}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
});

BrainOutline.displayName = 'BrainOutline';

/**
 * Neural nodes - circuit points within the brain
 */
const NeuralNodes = React.memo(({ id, variant = 'default' }) => {
  // Left hemisphere nodes
  const leftNodes = [
    { cx: 20, cy: 28 },
    { cx: 25, cy: 22 },
    { cx: 22, cy: 38 },
  ];

  // Right hemisphere nodes
  const rightNodes = [
    { cx: 44, cy: 28 },
    { cx: 39, cy: 22 },
    { cx: 42, cy: 38 },
  ];

  // Center node
  const centerNode = { cx: 32, cy: 32 };

  return (
    <>
      {/* Left nodes */}
      {leftNodes.map((node, idx) => (
        <circle
          key={`left-${idx}`}
          cx={node.cx}
          cy={node.cy}
          r="1.8"
          fill={`url(#${id}-accent-gradient)`}
          filter={`url(#${id}-glow)`}
        />
      ))}

      {/* Right nodes */}
      {rightNodes.map((node, idx) => (
        <circle
          key={`right-${idx}`}
          cx={node.cx}
          cy={node.cy}
          r="1.8"
          fill={`url(#${id}-accent-gradient)`}
          filter={`url(#${id}-glow)`}
        />
      ))}

      {/* Center node */}
      <circle
        cx={centerNode.cx}
        cy={centerNode.cy}
        r="2.2"
        fill={`url(#${id}-accent-gradient)`}
        filter={`url(#${id}-glow)`}
      />
    </>
  );
});

NeuralNodes.displayName = 'NeuralNodes';

/**
 * Synapse connections - lines connecting neural nodes
 */
const SynapseConnections = React.memo(({ id, variant = 'default' }) => {
  const opacity = variant === 'minimal' ? 0.4 : 0.7;

  return (
    <>
      {/* Left hemisphere connections */}
      <line
        x1="20"
        y1="28"
        x2="25"
        y2="22"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="25"
        y1="22"
        x2="22"
        y2="38"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="22"
        y1="38"
        x2="20"
        y2="28"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />

      {/* Right hemisphere connections */}
      <line
        x1="44"
        y1="28"
        x2="39"
        y2="22"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="39"
        y1="22"
        x2="42"
        y2="38"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="42"
        y1="38"
        x2="44"
        y2="28"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />

      {/* Connections to center */}
      <line
        x1="25"
        y1="22"
        x2="32"
        y2="32"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="22"
        y1="38"
        x2="32"
        y2="32"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="39"
        y1="22"
        x2="32"
        y2="32"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <line
        x1="42"
        y1="38"
        x2="32"
        y2="32"
        stroke={`url(#${id}-accent-gradient)`}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={opacity}
      />
    </>
  );
});

SynapseConnections.displayName = 'SynapseConnections';

/**
 * WidgetLogoIcon - Icon-only version (for headers, compact spaces)
 */
const WidgetLogoIcon = React.memo(
  React.forwardRef(({ size = 'md', variant = 'default', className, animate = false }, ref) => {
    const id = useId();
    const sizeClass = styles[`icon-${size}`];
    const animateClass = animate ? styles.animate : '';

    return (
      <div
        ref={ref}
        className={`${styles.logoIcon} ${sizeClass} ${animateClass} ${className || ''}`}
        role="img"
        aria-label="Widget AI Logo"
      >
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgContainer}
        >
          <LogoGradients id={id} />
          <BrainOutline id={id} variant={variant} />
          <SynapseConnections id={id} variant={variant} />
          <NeuralNodes id={id} variant={variant} />
        </svg>
      </div>
    );
  })
);

WidgetLogoIcon.displayName = 'WidgetLogoIcon';

/**
 * WidgetLogo - Full logo with text label
 */
const WidgetLogo = React.memo(
  React.forwardRef(({ size = 'md', variant = 'default', className, animate = false, text = 'AI Chat' }, ref) => {
    const id = useId();
    const sizeClass = styles[`logo-${size}`];
    const animateClass = animate ? styles.animate : '';

    return (
      <div
        ref={ref}
        className={`${styles.logoContainer} ${sizeClass} ${animateClass} ${className || ''}`}
        role="img"
        aria-label={`${text} Logo`}
      >
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgContainer}
        >
          <LogoGradients id={id} />
          <BrainOutline id={id} variant={variant} />
          <SynapseConnections id={id} variant={variant} />
          <NeuralNodes id={id} variant={variant} />
        </svg>

        <span className={styles.logoText}>{text}</span>
      </div>
    );
  })
);

WidgetLogo.displayName = 'WidgetLogo';

export { WidgetLogo, WidgetLogoIcon };
export default WidgetLogo;
