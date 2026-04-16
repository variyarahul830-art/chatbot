/**
 * WidgetLogo Component Index
 * 
 * Re-export location for easier imports throughout the app
 * 
 * Usage:
 *   import { WidgetLogo, WidgetLogoIcon } from '@/app/components/WidgetLogo';
 * 
 * Alternative short import:
 *   import { WidgetLogo } from '@/app/components';
 * 
 * For this to work, create an index.js in components folder with:
 *   export { WidgetLogo, WidgetLogoIcon } from './WidgetLogo';
 */

// This is the source file for the components
// See WidgetLogo.jsx for the main implementation
// See WidgetLogo.module.css for styling

export { WidgetLogo, WidgetLogoIcon } from './WidgetLogo';
export { default as WidgetLogoDemoPage } from './WidgetLogo.demo';
export { WidgetLogoIntegrationShowcase } from './WidgetLogo.integration';
