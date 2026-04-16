# WidgetLogo Component Documentation

## Overview

A professional, AI-themed SVG logo component combining brain/neural/circuit elements. Designed for modern chat applications with support for multiple sizes, themes, and animations.

## Features

- ✨ **Modern Design**: Brain outline with neural network nodes and circuit patterns
- 📱 **Responsive**: Works seamlessly at 16px, 24px, 32px, 48px, 64px sizes
- 🌓 **Dark Mode**: Automatic theme detection with CSS variables
- ♿ **Accessible**: ARIA labels, semantic roles, keyboard focus states
- 🎬 **Animation-Ready**: CSS-based pulsing animation with reduced-motion support
- ⚡ **Performance**: React.memo optimization, minimal re-renders, pure CSS animations
- 🎨 **Customizable**: Multiple variants and flexible styling
- 📦 **Zero Dependencies**: No external animation libraries needed

## Components

### WidgetLogoIcon

Icon-only version, perfect for compact spaces like headers and tabs.

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

// Basic usage
<WidgetLogoIcon size="md" />

// With animation
<WidgetLogoIcon size="lg" animate={true} />

// Minimal variant (less visual noise)
<WidgetLogoIcon size="sm" variant="minimal" />

// Custom styling
<WidgetLogoIcon 
  size="md" 
  className="my-custom-class"
/>
```

**Props:**

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `size` | string | `'md'` | `'sm'` \| `'md'` \| `'lg'` |
| `variant` | string | `'default'` | `'default'` \| `'minimal'` |
| `className` | string | - | any CSS class |
| `animate` | boolean | `false` | pulse effect |
| `ref` | ref | - | React ref |

**Sizes:**
- `sm`: 16px (compact UI, tabs)
- `md`: 24px (headers, default)
- `lg`: 32px (larger icons, emphasis)

### WidgetLogo

Full logo with text label.

```jsx
import { WidgetLogo } from '@/app/components/WidgetLogo';

// Basic usage
<WidgetLogo size="md" text="AI Chat" />

// Large with animation
<WidgetLogo size="lg" animate={true} text="Neural Assistant" />

// Minimal style
<WidgetLogo size="md" variant="minimal" />
```

**Props:**

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `size` | string | `'md'` | `'sm'` \| `'md'` \| `'lg'` |
| `variant` | string | `'default'` | `'default'` \| `'minimal'` |
| `text` | string | `'AI Chat'` | any text |
| `className` | string | - | any CSS class |
| `animate` | boolean | `false` | pulse effect |
| `ref` | ref | - | React ref |

## Styling & Theming

### CSS Variables

The logo uses CSS custom properties for colors. Override them in your stylesheet:

```css
/* Light theme */
:root {
  --logo-primary: #3b82f6;          /* Blue */
  --logo-primary-dark: #1e40af;     /* Dark blue */
  --logo-accent: #06b6d4;           /* Cyan */
  --logo-accent-light: #22d3ee;     /* Light cyan */
  --logo-text-color: #1f2937;       /* Dark gray */
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --logo-primary: #60a5fa;        /* Light blue */
    --logo-primary-dark: #3b82f6;   /* Blue */
    --logo-accent: #0891b2;         /* Dark cyan */
    --logo-accent-light: #06b6d4;   /* Cyan */
    --logo-text-color: #f3f4f6;     /* Light gray */
  }
}
```

### Custom Theme

```jsx
// Custom CSS for your brand colors
<style>{`
  :root {
    --logo-primary: #8b5cf6;         /* Purple */
    --logo-primary-dark: #6d28d9;
    --logo-accent: #ec4899;          /* Pink */
    --logo-accent-light: #f472b6;
    --logo-text-color: #1f2937;
  }
`}</style>

<WidgetLogoIcon size="md" />
```

## Design System

### Color Palette

**Light Theme:**
- Primary: #3b82f6 (Blue) - Brain outline
- Primary Dark: #1e40af - Gradient base
- Accent: #06b6d4 (Cyan) - Neural nodes & connections
- Accent Light: #22d3ee - Gradient highlights

**Dark Theme:**
- Primary: #60a5fa (Light Blue)
- Primary Dark: #3b82f6 (Blue)
- Accent: #0891b2 (Dark Cyan)
- Accent Light: #06b6d4 (Cyan)

### SVG Structure

```
Brain Outline (2px stroke)
├── Left Hemisphere
├── Right Hemisphere
└── Connective Bridge

Synapse Connections (1.2px stroke)
├── Left Hemisphere Triangle
├── Right Hemisphere Triangle
└── Cross-connections to center

Neural Nodes (circles)
├── Left nodes (1.8px)
├── Right nodes (1.8px)
└── Center node (2.2px)
```

## Animation

### Animation

Enable the optional pulsing animation to draw attention:

```jsx
<WidgetLogoIcon animate={true} />
<WidgetLogo animate={true} />
```

The animation:
- Duration: 3 seconds
- Uses `ease-in-out` curve
- Respects `prefers-reduced-motion`
- Fade: 1 → 0.8 → 1 opacity
- GPU-accelerated CSS animation

### Hover Effects

Built-in hover interactions:
- Drop shadow (depth)
- Slight upward translation (lift)
- Active state returns to baseline

## Accessibility

### ARIA & Semantics

Both components include:
- `role="img"` for semantic meaning
- `aria-label` for screen readers
- Keyboard focus visibility (outline)
- `prefers-reduced-motion` support

### Color Contrast

- Light text (1f2937) on light backgrounds: WCAG AAA
- Light text (f3f4f6) on dark backgrounds: WCAG AAA
- Gradients ensure readable nodes on all backgrounds

## Performance

### Optimizations

1. **React.memo** - Prevents unnecessary re-renders
2. **useId** - Unique gradient IDs avoid conflicts
3. **SVG ViewBox** - Scales perfectly without rasterization
4. **CSS Variables** - No JS re-evaluation on theme change
5. **CSS Animations** - GPU-accelerated, no JavaScript overhead
6. **Lazy Animation** - Animation class only applied when `animate={true}`

### Bundle Impact

- Minified: ~5KB (JSX component)
- CSS Module: ~3KB
- **No external dependencies**

## Usage Examples

### In Chat Header

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

function ChatHeader() {
  return (
    <header className="flex items-center gap-2 p-4 border-b">
      <WidgetLogoIcon size="md" />
      <h1>Chat Assistant</h1>
    </header>
  );
}
```

### Landing Page

```jsx
import { WidgetLogo } from '@/app/components/WidgetLogo';

function HeroSection() {
  return (
    <section className="text-center py-12">
      <WidgetLogo 
        size="lg" 
        text="AI Chat Platform" 
        animate={true}
      />
      <p className="mt-4 text-gray-600">Intelligent conversation at your fingertips</p>
    </section>
  );
}
```

### With Custom Styling

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

function SidebarLogo() {
  return (
    <WidgetLogoIcon 
      size="md" 
      className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-2 dark:from-slate-900 dark:to-slate-800"
    />
  );
}
```

### Responsive Sizing

```jsx
import { WidgetLogoIcon } from '@/app/components/WidgetLogo';

function ResponsiveLogo() {
  return (
    <>
      {/* Mobile: small */}
      <WidgetLogoIcon size="sm" className="md:hidden" />
      
      {/* Tablet: medium */}
      <WidgetLogoIcon size="md" className="hidden md:inline-flex lg:hidden" />
      
      {/* Desktop: large */}
      <WidgetLogoIcon size="lg" className="hidden lg:inline-flex" />
    </>
  );
}
```

## Design Inspiration

The logo combines elements from modern AI/ML companies:

- **Brain Outline**: Represents intelligence and cognition (inspired by Anthropic)
- **Circuit Patterns**: Reflects technology and processing (inspired by OpenAI)
- **Neural Nodes**: Shows network/learning capability (inspired by Hugging Face)
- **Gradient Colors**: Modern, vibrant aesthetic suitable for tech products

## Sizing Reference

| Size | Icon | Usage |
|------|------|-------|
| 16px | sm | Tabs, compact UI, breadcrumbs |
| 24px | md | Headers, buttons, default |
| 32px | lg | Large buttons, emphasis |
| 48px | xlg | Hero sections, cards |
| 64px | xxl | Landing pages, wallpapers |

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support
- IE11: ⚠️ No CSS variable support

## Troubleshooting

### Gradients not showing

Ensure CSS variables are defined in your root stylesheet:

```css
:root {
  --logo-primary: #3b82f6;
  --logo-accent: #06b6d4;
  /* ... other variables */
}
```

### Animation not working

1. Check Framer Motion is installed: `npm list framer-motion`
2. Verify `animate={true}` prop is passed
3. Check `prefers-reduced-motion` setting in OS

### Colors look wrong in dark mode

Add dark mode CSS variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --logo-primary: #60a5fa;
    --logo-accent: #0891b2;
  }
}
```

## Future Enhancements

- [ ] Additional variants (outline, filled, neon)
- [ ] Animation presets (pulse, glow, wave)
- [ ] SVG export functionality
- [ ] Interactive demo showcase
- [ ] Badge/counter overlay support
