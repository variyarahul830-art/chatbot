# WidgetLogo - Quick Start Guide

## Installation

The component is already created in your project at:
```
app/components/WidgetLogo.jsx
app/components/WidgetLogo.module.css
```

No additional dependencies needed! The component uses pure React and CSS.

## Basic Usage

### Icon Only (Compact)

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

function Header() {
  return (
    <header>
      <WidgetLogoIcon size="md" />
      <h1>My App</h1>
    </header>
  );
}
```

### Full Logo with Text

```jsx
import { WidgetLogo } from '@/app/components/WidgetLogo';

function Hero() {
  return (
    <div>
      <WidgetLogo size="lg" text="AI Assistant" animate={true} />
    </div>
  );
}
```

## Size Options

```jsx
<WidgetLogoIcon size="sm" />   {/* 16px - Compact */}
<WidgetLogoIcon size="md" />   {/* 24px - Default */}
<WidgetLogoIcon size="lg" />   {/* 32px - Large */}
```

## Variants

```jsx
{/* Full detail (default) */}
<WidgetLogoIcon variant="default" />

{/* Simplified version */}
<WidgetLogoIcon variant="minimal" />
```

## Animation

```jsx
{/* With pulsing animation */}
<WidgetLogoIcon animate={true} />

{/* Static (default) */}
<WidgetLogoIcon animate={false} />
```

## Custom Styling

```jsx
{/* Add custom CSS classes */}
<WidgetLogoIcon 
  size="md"
  className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
/>
```

## Dark Mode

Dark mode is **automatic**! The logo respects your system's `prefers-color-scheme` setting.

To override colors in your app/globals.css:

```css
:root {
  --logo-primary: #3b82f6;
  --logo-primary-dark: #1e40af;
  --logo-accent: #06b6d4;
  --logo-accent-light: #22d3ee;
  --logo-text-color: #1f2937;
}

@media (prefers-color-scheme: dark) {
  :root {
    --logo-primary: #60a5fa;
    --logo-primary-dark: #3b82f6;
    --logo-accent: #0891b2;
    --logo-accent-light: #06b6d4;
    --logo-text-color: #f3f4f6;
  }
}
```

## Common Patterns

### In Chat Header

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

export function ChatHeader() {
  return (
    <header className="flex items-center gap-3 p-4 border-b">
      <WidgetLogoIcon size="md" />
      <h1>Chat Assistant</h1>
    </header>
  );
}
```

### In Hero Section

```jsx
import { WidgetLogo } from '@/app/components/WidgetLogo';

export function Hero() {
  return (
    <section className="text-center py-12">
      <WidgetLogo 
        size="lg" 
        text="AI Chat" 
        animate={true}
      />
      <h1 className="text-4xl font-bold mt-4">Welcome</h1>
    </section>
  );
}
```

### In Button

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

export function ChatButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
      <WidgetLogoIcon size="sm" />
      Start Chat
    </button>
  );
}
```

### Responsive

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

export function ResponsiveLogo() {
  return (
    <>
      <WidgetLogoIcon size="sm" className="md:hidden" />
      <WidgetLogoIcon size="md" className="hidden md:block lg:hidden" />
      <WidgetLogoIcon size="lg" className="hidden lg:block" />
    </>
  );
}
```

## Props Reference

### WidgetLogoIcon

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `size` | string | `'md'` | `'sm'`, `'md'`, `'lg'` |
| `variant` | string | `'default'` | `'default'`, `'minimal'` |
| `animate` | boolean | `false` | `true` / `false` |
| `className` | string | - | any CSS classes |
| `ref` | ref | - | React ref |

### WidgetLogo

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `size` | string | `'md'` | `'sm'`, `'md'`, `'lg'` |
| `variant` | string | `'default'` | `'default'`, `'minimal'` |
| `text` | string | `'AI Chat'` | any text |
| `animate` | boolean | `false` | `true` / `false` |
| `className` | string | - | any CSS classes |
| `ref` | ref | - | React ref |

## Accessibility

The components are fully accessible:

```jsx
{/* Screen readers get proper labels */}
<WidgetLogoIcon size="md" />  
{/* aria-label: "Widget AI Logo" */}

{/* Keyboard navigation works */}
{/* Focus states are visible */}

{/* Respects reduced motion preference */}
{/* If user prefers reduced motion, animation is disabled */}
```

## Performance Notes

- ✅ Optimized with React.memo
- ✅ No external dependencies
- ✅ Pure CSS animations (GPU accelerated)
- ✅ Minimal bundle size (~5KB)
- ✅ Scales perfectly at any size

## Troubleshooting

### Colors not showing?
Make sure CSS variables are defined in your stylesheet.

### Animation not working?
1. Check `animate={true}` is passed
2. Check your OS accessibility settings

### Logo looks blurry?
SVG should always be crisp. Check your browser zoom level.

## Full Documentation

For complete documentation, design details, and advanced examples:
- See `WidgetLogo.README.md`
- See `WidgetLogo.demo.jsx` for component showcases
- See `WidgetLogo.integration.jsx` for real-world examples

## Support

The component includes:
- ✅ TypeScript-ready JSX
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Animation support
- ✅ Accessibility features
- ✅ Performance optimization

Ready to use in production! 🚀
