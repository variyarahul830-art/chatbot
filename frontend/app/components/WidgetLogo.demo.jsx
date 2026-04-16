/**
 * WidgetLogo Component Demo
 * 
 * This file demonstrates various usage patterns for the WidgetLogo and WidgetLogoIcon components.
 * Copy and adapt these examples for your application.
 */

'use client';

import React from 'react';
import { WidgetLogo, WidgetLogoIcon } from '@/app/components/WidgetLogo';

/**
 * Basic Logo Sizes
 */
export function LogoSizesDemo() {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Logo Sizes</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Small */}
        <div className="text-center">
          <WidgetLogoIcon size="sm" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">16px (sm)</p>
        </div>

        {/* Medium */}
        <div className="text-center">
          <WidgetLogoIcon size="md" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">24px (md)</p>
        </div>

        {/* Large */}
        <div className="text-center">
          <WidgetLogoIcon size="lg" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">32px (lg)</p>
        </div>

        {/* XL */}
        <div className="text-center">
          <div className="w-12 h-12 mx-auto">
            <WidgetLogoIcon size="xlg" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">48px (xlg)</p>
        </div>

        {/* XXL */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto">
            <WidgetLogoIcon size="xxl" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">64px (xxl)</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Icon Variants
 */
export function LogoVariantsDemo() {
  return (
    <section className="p-8 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Logo Variants</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Default */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <WidgetLogoIcon size="md" variant="default" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">Default Variant</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Full detail with all elements</p>
          </div>
        </div>

        {/* Minimal */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <WidgetLogoIcon size="md" variant="minimal" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">Minimal Variant</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Reduced visual complexity</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Full Logo with Text
 */
export function FullLogosDemo() {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Full Logo with Text</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <WidgetLogo size="sm" text="Small" />
          <span className="text-sm text-gray-500 dark:text-gray-400">size="sm"</span>
        </div>

        <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <WidgetLogo size="md" text="Medium" />
          <span className="text-sm text-gray-500 dark:text-gray-400">size="md" (default)</span>
        </div>

        <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <WidgetLogo size="lg" text="Large" />
          <span className="text-sm text-gray-500 dark:text-gray-400">size="lg"</span>
        </div>

        <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <WidgetLogo size="md" text="Custom Text" variant="minimal" />
          <span className="text-sm text-gray-500 dark:text-gray-400">variant="minimal"</span>
        </div>
      </div>
    </section>
  );
}

/**
 * Animated Logos
 */
export function AnimatedLogosDemo() {
  return (
    <section className="p-8 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Animated Variants</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Animated Icon */}
        <div className="text-center">
          <WidgetLogoIcon size="md" animate={true} />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">Pulsing Icon</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">animate={'{'}true{'}'}</p>
        </div>

        {/* Static Icon */}
        <div className="text-center">
          <WidgetLogoIcon size="md" animate={false} />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">Static Icon</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">animate={'{'}false{'}'}  (default)</p>
        </div>

        {/* Animated Full Logo */}
        <div className="text-center">
          <WidgetLogo size="md" text="Animated" animate={true} />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-medium">Full Animated</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">With pulsing effect</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Responsive Usage
 */
export function ResponsiveDemo() {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Responsive Sizing</h2>

      <div className="space-y-6">
        {/* Example: Responsive logo in header */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 p-4">
            <div className="flex items-center gap-3">
              {/* Mobile: small */}
              <div className="md:hidden">
                <WidgetLogoIcon size="sm" />
              </div>

              {/* Tablet: medium */}
              <div className="hidden md:block lg:hidden">
                <WidgetLogoIcon size="md" />
              </div>

              {/* Desktop: large */}
              <div className="hidden lg:block">
                <WidgetLogoIcon size="lg" />
              </div>

              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Responsive Header</h1>
            </div>
          </div>
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
            <p>👆 Resize your window to see the logo size adapt responsively</p>
          </div>
        </div>

        {/* Example: Custom background styling */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">With Custom Background:</p>
          <div className="flex gap-4 flex-wrap">
            <WidgetLogoIcon
              size="md"
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-2 rounded-lg"
            />
            <WidgetLogoIcon
              size="md"
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-2 rounded-lg"
            />
            <WidgetLogoIcon
              size="md"
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main Demo Component
 */
export function WidgetLogoDemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <WidgetLogo size="lg" text="AI Chat Platform" animate={true} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">WidgetLogo Components</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Professional AI-themed logo with neural network design
          </p>
        </div>

        {/* Demos */}
        <div className="space-y-8">
          <LogoSizesDemo />
          <LogoVariantsDemo />
          <FullLogosDemo />
          <AnimatedLogosDemo />
          <ResponsiveDemo />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            ✨ Built with React, SVG, and CSS • No external animation dependencies
          </p>
        </div>
      </div>
    </div>
  );
}

export default WidgetLogoDemoPage;
