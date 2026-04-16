/**
 * WidgetLogo Integration Guide
 * 
 * Real-world integration examples for the WidgetLogo components
 */

'use client';

import React from 'react';
import { WidgetLogo, WidgetLogoIcon } from '@/app/components/WidgetLogo';

/**
 * Example 1: Chat Header with Logo Icon
 */
export function ChatHeaderExample() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WidgetLogoIcon size="md" />
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">AI Chat</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Neural Networks</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
}

/**
 * Example 2: Sidebar Navigation
 */
export function SidebarNavExample() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      {/* Logo at top */}
      <div className="mb-8">
        <WidgetLogo size="sm" text="Assistant" className="w-full hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg" />
      </div>

      {/* Navigation items */}
      <nav className="space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
          <WidgetLogoIcon size="sm" />
          <span className="text-sm font-medium">Chat</span>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400">
          <span>📁</span>
          <span className="text-sm">Files</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400">
          <span>⚙️</span>
          <span className="text-sm">Settings</span>
        </button>
      </nav>
    </aside>
  );
}

/**
 * Example 3: Landing Page Hero
 */
export function LandingHeroExample() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <WidgetLogo
            size="lg"
            text="Neural Assistant"
            animate={true}
            className="drop-shadow-lg"
          />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Your AI Assistant
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Intelligent conversations powered by advanced neural networks. Fast, accurate, and always learning.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * Example 4: Card Component
 */
export function FeatureCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {/* Feature card with logo */}
      {['Intelligence', 'Speed', 'Security'].map((feature, idx) => (
        <div
          key={idx}
          className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center">
            <WidgetLogoIcon size="md" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Advanced neural networks ensure fast and intelligent responses to your queries.
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 5: Button with Logo Icon
 */
export function LogoButtonExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      {/* Primary button with logo */}
      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
        <WidgetLogoIcon size="sm" />
        Start Chat
      </button>

      {/* Secondary button with logo */}
      <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 transition">
        <WidgetLogoIcon size="sm" variant="minimal" />
        New Conversation
      </button>

      {/* Icon button (compact) */}
      <button
        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        aria-label="Open AI assistant"
      >
        <WidgetLogoIcon size="sm" />
      </button>
    </div>
  );
}

/**
 * Example 6: Tab Navigation
 */
export function TabNavigationExample() {
  const [activeTab, setActiveTab] = React.useState('chat');

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex gap-1 p-1 bg-gray-50 dark:bg-gray-900">
        {[
          { id: 'chat', label: 'Chat', icon: true },
          { id: 'history', label: 'History', icon: false },
          { id: 'settings', label: 'Settings', icon: false },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.icon && <WidgetLogoIcon size="sm" />}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 7: Notification Badge
 */
export function NotificationBadgeExample() {
  return (
    <div className="flex gap-8 p-8 flex-wrap">
      {/* Logo icon with notification dot */}
      <div className="relative w-12 h-12">
        <WidgetLogoIcon size="lg" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      </div>

      {/* Logo icon with notification badge */}
      <div className="relative w-12 h-12">
        <WidgetLogoIcon size="lg" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900">
          3
        </div>
      </div>

      {/* Logo in badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
        <WidgetLogoIcon size="sm" />
        Active
      </div>
    </div>
  );
}

/**
 * Example 8: Loading State
 */
export function LoadingStateExample() {
  return (
    <div className="flex items-center justify-center gap-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <WidgetLogoIcon size="md" animate={true} />
      <div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">Processing your request...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">This should only take a moment</p>
      </div>
    </div>
  );
}

/**
 * Example 9: Custom Theme Colors
 */
export function CustomThemeExample() {
  return (
    <div className="p-8 space-y-6">
      <style>{`
        .theme-purple {
          --logo-primary: #a855f7;
          --logo-primary-dark: #9333ea;
          --logo-accent: #ec4899;
          --logo-accent-light: #f472b6;
        }
        
        .theme-green {
          --logo-primary: #10b981;
          --logo-primary-dark: #059669;
          --logo-accent: #14b8a6;
          --logo-accent-light: #2dd4bf;
        }
      `}</style>

      {/* Default theme */}
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Default (Blue)</p>
        <WidgetLogoIcon size="md" />
      </div>

      {/* Purple theme */}
      <div className="theme-purple">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Custom (Purple)</p>
        <WidgetLogoIcon size="md" />
      </div>

      {/* Green theme */}
      <div className="theme-green">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Custom (Green)</p>
        <WidgetLogoIcon size="md" />
      </div>
    </div>
  );
}

/**
 * Example 10: Responsive Hero Section
 */
export function ResponsiveHeroExample() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-16 lg:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Responsive logo sizing */}
        <div className="flex justify-center mb-6 md:mb-8">
          {/* Show different sizes based on screen */}
          <div className="md:hidden">
            <WidgetLogo size="sm" text="AI Chat" />
          </div>
          <div className="hidden md:block lg:hidden">
            <WidgetLogo size="md" text="AI Chat" animate={true} />
          </div>
          <div className="hidden lg:block">
            <WidgetLogo size="lg" text="AI Chat Platform" animate={true} />
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
          Intelligent Conversations
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
          Powered by advanced AI neural networks
        </p>

        <button className="px-4 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base">
          Get Started
        </button>
      </div>
    </section>
  );
}

/**
 * All Examples Showcase
 */
export function WidgetLogoIntegrationShowcase() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      {/* Hero */}
      <LandingHeroExample />

      {/* Features */}
      <div className="bg-white dark:bg-gray-900">
        <FeatureCardExample />
      </div>

      {/* Chat Header */}
      <ChatHeaderExample />

      {/* Sidebar + Content Layout */}
      <div className="flex">
        <SidebarNavExample />
        <div className="flex-1 p-8 bg-white dark:bg-gray-900">
          <div className="space-y-6">
            <TabNavigationExample />
            <LoadingStateExample />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Buttons</p>
                <LogoButtonExample />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Badges</p>
                <NotificationBadgeExample />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Examples */}
      <div className="bg-gray-50 dark:bg-gray-800 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Custom Themes</h2>
        <CustomThemeExample />
      </div>

      {/* Responsive Example */}
      <ResponsiveHeroExample />
    </div>
  );
}

export default WidgetLogoIntegrationShowcase;
