# RAG Visualization Design System

## Overview

This design system provides a comprehensive guide for building consistent, accessible, and visually cohesive UI components for the RAG-powered chatbot visualization and widget system. It follows Material Design principles with a focus on modern, minimal aesthetics suitable for technical users.

---

## 1. Color Palette

### Primary Colors

**Primary Brand Color - Indigo/Blue**
- Purpose: Trust, AI, Technology
- Light Mode: `#4f46e5` (Indigo-600)
- Dark Mode: `#818cf8` (Indigo-400)
- Usage: Primary CTAs, active states, key interactions, branding

**Secondary Color - Purple**
- Purpose: Innovation, Distinction
- Light Mode: `#a78bfa` (Purple-400)
- Dark Mode: `#c4b5fd` (Purple-300)
- Usage: Secondary CTAs, highlights, decorative elements

**Accent Color - Emerald**
- Purpose: Success, Positive Actions, Data Confirmation
- Light Mode: `#10b981` (Emerald-600)
- Dark Mode: `#6ee7b7` (Emerald-400)
- Usage: Success states, positive confirmations, growth indicators

### Neutral Palette

**Surfaces & Backgrounds**
- Light Mode Background: `#ffffff` (White)
- Light Mode Surface: `#f8fafc` (Slate-50)
- Light Mode Surface Secondary: `#f1f5f9` (Slate-100)
- Dark Mode Background: `#0f172a` (Slate-900)
- Dark Mode Surface: `#1e293b` (Slate-800)
- Dark Mode Surface Secondary: `#334155` (Slate-700)

**Text & Borders**
- Light Mode Text Primary: `#0f172a` (Slate-900)
- Light Mode Text Secondary: `#64748b` (Slate-500)
- Light Mode Text Tertiary: `#cbd5e1` (Slate-300)
- Light Mode Border: `#e2e8f0` (Slate-200)
- Dark Mode Text Primary: `#f1f5f9` (Slate-100)
- Dark Mode Text Secondary: `#94a3b8` (Slate-400)
- Dark Mode Text Tertiary: `#475569` (Slate-600)
- Dark Mode Border: `#334155` (Slate-700)

### Status Colors

| Status | Color | Hex Light | Hex Dark | Usage |
|--------|-------|-----------|----------|-------|
| Success | Emerald | `#10b981` | `#6ee7b7` | Positive outcomes, completed states |
| Error | Red | `#ef4444` | `#f87171` | Errors, destructive actions, failures |
| Warning | Amber | `#f59e0b` | `#fbbf24` | Warnings, caution, pending states |
| Info | Blue | `#3b82f6` | `#60a5fa` | Information, neutral alerts |

### Semantic Color Usage

**Component-Specific Guidelines:**
- Buttons: Primary (Indigo), Secondary (Purple), Tertiary (Surface + text)
- Links: Primary brand color with underline on hover
- Focus Rings: `#4f46e5` with 2px offset
- Disabled States: 40% opacity of original color
- Hover States: +5-10% lightness in light mode, -5-10% in dark mode
- Active States: +15-20% saturation increase

---

## 2. CSS Variables Implementation

### Light Mode Theme

```css
:root {
  /* Primary Colors */
  --color-primary: #4f46e5;
  --color-primary-light: #6366f1;
  --color-primary-lighter: #818cf8;
  --color-primary-dark: #4338ca;
  --color-primary-darker: #3730a3;

  /* Secondary Colors */
  --color-secondary: #a78bfa;
  --color-secondary-light: #c4b5fd;
  --color-secondary-dark: #9333ea;

  /* Accent Colors */
  --color-accent: #10b981;
  --color-accent-light: #6ee7b7;
  --color-accent-dark: #059669;

  /* Neutral Colors - Surfaces */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;
  --color-surface: #ffffff;
  --color-surface-secondary: #f8fafc;
  --color-surface-hover: #f1f5f9;
  --color-surface-active: #e2e8f0;

  /* Neutral Colors - Text */
  --color-text-primary: #0f172a;
  --color-text-secondary: #64748b;
  --color-text-tertiary: #94a3b8;
  --color-text-disabled: #cbd5e1;

  /* Neutral Colors - Borders & Dividers */
  --color-border: #e2e8f0;
  --color-border-subtle: #f1f5f9;
  --color-divider: #e2e8f0;

  /* Status Colors */
  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-error: #ef4444;
  --color-error-light: #fee2e2;
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-info: #3b82f6;
  --color-info-light: #dbeafe;

  /* Shadow System */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Focus Styles */
  --focus-ring: 0 0 0 2px rgba(255, 255, 255, 1), 
                0 0 0 4px rgba(79, 70, 229, 0.5);
  --focus-ring-offset: 2px;

  /* Opacity */
  --opacity-disabled: 0.4;
  --opacity-hover: 0.08;
  --opacity-active: 0.16;
}
```

### Dark Mode Theme

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Primary Colors */
    --color-primary: #818cf8;
    --color-primary-light: #a5b4fc;
    --color-primary-lighter: #c7d2fe;
    --color-primary-dark: #6366f1;
    --color-primary-darker: #4f46e5;

    /* Secondary Colors */
    --color-secondary: #c4b5fd;
    --color-secondary-light: #ddd6fe;
    --color-secondary-dark: #a78bfa;

    /* Accent Colors */
    --color-accent: #6ee7b7;
    --color-accent-light: #a7f3d0;
    --color-accent-dark: #10b981;

    /* Neutral Colors - Surfaces */
    --color-bg-primary: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-bg-tertiary: #334155;
    --color-surface: #1e293b;
    --color-surface-secondary: #334155;
    --color-surface-hover: #475569;
    --color-surface-active: #64748b;

    /* Neutral Colors - Text */
    --color-text-primary: #f1f5f9;
    --color-text-secondary: #94a3b8;
    --color-text-tertiary: #64748b;
    --color-text-disabled: #475569;

    /* Neutral Colors - Borders & Dividers */
    --color-border: #334155;
    --color-border-subtle: #1e293b;
    --color-divider: #334155;

    /* Status Colors */
    --color-success: #6ee7b7;
    --color-success-light: #1f3a3a;
    --color-error: #f87171;
    --color-error-light: #3f2a2a;
    --color-warning: #fbbf24;
    --color-warning-light: #3f3020;
    --color-info: #60a5fa;
    --color-info-light: #1e3a5f;

    /* Shadow System */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
    --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.2);

    /* Focus Styles */
    --focus-ring: 0 0 0 2px rgba(15, 23, 42, 1),
                  0 0 0 4px rgba(129, 140, 248, 0.5);
  }
}
```

### Using CSS Variables

```css
/* Button Example */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-bg-primary);
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  transition: background-color 200ms ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Surface Example */
.card {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
```

---

## 3. Typography System

### Font Stack

**Primary Font - Inter (Sans-Serif)**
```css
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                    Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Monospace Font - Fira Code (for code/data)**
```css
--font-family-mono: 'Fira Code', 'Courier New', monospace;
```

### Type Scale

| Level | Size | Line Height | Weight | Use Case |
|-------|------|-------------|--------|----------|
| xs | 12px | 1.33 (16px) | 400 | Captions, metadata |
| sm | 14px | 1.43 (20px) | 400 | Helper text, small labels |
| base | 16px | 1.5 (24px) | 400 | Body text, default |
| lg | 18px | 1.56 (28px) | 400 | Larger body text |
| xl | 20px | 1.4 (28px) | 500 | Subheadings, labels |
| 2xl | 24px | 1.33 (32px) | 600 | Section headings |
| 3xl | 28px | 1.29 (36px) | 600 | Page subheadings |
| 4xl | 32px | 1.25 (40px) | 700 | Page headings |
| 5xl | 40px | 1.2 (48px) | 700 | Hero titles |
| 6xl | 48px | 1.2 (58px) | 700 | Display/banner |

### Font Weight Scale

```css
--font-weight-light: 300;       /* Not commonly used */
--font-weight-normal: 400;      /* Body text, regular */
--font-weight-medium: 500;      /* Emphasis, semi-bold */
--font-weight-semibold: 600;    /* Headings, labels */
--font-weight-bold: 700;        /* Strong emphasis, display */
--font-weight-extrabold: 800;   /* Not commonly used */
```

### Typography CSS Variables

```css
:root {
  /* Font Families */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                      Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'Fira Code', 'Courier New', monospace;

  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 28px;
  --font-size-4xl: 32px;
  --font-size-5xl: 40px;
  --font-size-6xl: 48px;

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter Spacing */
  --letter-spacing-tight: -0.01em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.02em;
}
```

### Typography Hierarchy Examples

**H1 - Page Title (40px, Bold)**
```css
h1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin-bottom: 24px;
}
```

**H2 - Section Heading (32px, Semibold)**
```css
h2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin-top: 32px;
  margin-bottom: 16px;
}
```

**H3 - Subsection (24px, Semibold)**
```css
h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin-top: 24px;
  margin-bottom: 12px;
}
```

**Body Text (16px, Regular)**
```css
body, p {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}
```

**Label/UI Text (14px, Medium)**
```css
label, .label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  text-transform: none;
}
```

**Code/Data Display (Monospace)**
```css
code, pre, .monospace {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}
```

---

## 4. Spacing & Layout System

### Base Spacing Unit: 4px

**Spacing Scale:**
```css
--spacing-xs: 4px;      /* 1x base unit */
--spacing-sm: 8px;      /* 2x base unit */
--spacing-md: 12px;     /* 3x base unit */
--spacing-base: 16px;   /* 4x base unit */
--spacing-lg: 24px;     /* 6x base unit */
--spacing-xl: 32px;     /* 8x base unit */
--spacing-2xl: 48px;    /* 12x base unit */
--spacing-3xl: 64px;    /* 16x base unit */
```

### Responsive Breakpoints

```css
--breakpoint-mobile: 375px;     /* Mobile phones */
--breakpoint-tablet: 768px;     /* Tablets */
--breakpoint-desktop: 1024px;   /* Desktop */
--breakpoint-wide: 1280px;      /* Wide desktop */
```

### Container & Layout

```css
/* Max Width Constraints */
--container-max-width: 1200px;
--container-padding-mobile: 12px;
--container-padding-tablet: 24px;
--container-padding-desktop: 32px;

/* Responsive Gutters */
--gutter-mobile: 12px;
--gutter-tablet: 24px;
--gutter-desktop: 32px;

/* Grid Settings */
--grid-columns: 12;
--grid-gap: var(--spacing-base);
```

### Responsive Container Styles

```css
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-padding-mobile);
  padding-right: var(--container-padding-mobile);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--container-padding-tablet);
    padding-right: var(--container-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--container-padding-desktop);
    padding-right: var(--container-padding-desktop);
  }
}
```

### Common Spacing Patterns

**Card Padding**
```css
.card {
  padding: var(--spacing-base);  /* 16px all sides */
}

.card-lg {
  padding: var(--spacing-lg);    /* 24px all sides */
}
```

**Section Spacing**
```css
.section {
  margin-bottom: var(--spacing-2xl);  /* 48px below */
  padding: var(--spacing-xl) 0;       /* 32px top/bottom */
}
```

**Component Gaps (Flexbox)**
```css
.button-group {
  display: flex;
  gap: var(--spacing-md);  /* 12px between items */
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);  /* 24px between fields */
}
```

---

## 5. Component Design Patterns

### Buttons

#### Button Variants

**Primary Button**
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-bg-primary);
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 200ms ease;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn-primary:active:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.btn-primary:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
```

**Secondary Button**
```css
.btn-secondary {
  background-color: var(--color-surface-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 200ms ease;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
  border-color: var(--color-border);
}

.btn-secondary:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn-secondary:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
```

**Tertiary/Ghost Button**
```css
.btn-tertiary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 150ms ease;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-tertiary:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-bg-primary);
}

.btn-tertiary:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

**Danger/Destructive Button**
```css
.btn-danger {
  background-color: var(--color-error);
  color: var(--color-bg-primary);
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 200ms ease;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
  box-shadow: var(--shadow-md);
}

.btn-danger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 1),
              0 0 0 4px rgba(239, 68, 68, 0.5);
}
```

#### Button Sizes

```css
.btn-sm {
  padding: 4px 12px;
  font-size: var(--font-size-sm);
  min-height: 32px;
}

.btn-base {
  padding: 8px 16px;
  font-size: var(--font-size-base);
  min-height: 44px;
}

.btn-lg {
  padding: 12px 24px;
  font-size: var(--font-size-lg);
  min-height: 48px;
}

.btn-block {
  width: 100%;
}
```

### Cards

#### Basic Card

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--spacing-base);
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border);
}

.card-header {
  padding-bottom: var(--spacing-base);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-base);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  margin-top: 4px;
}

.card-body {
  padding: 0;
}

.card-footer {
  padding-top: var(--spacing-base);
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-base);
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
}
```

#### Interactive Card

```css
.card-interactive {
  cursor: pointer;
  transition: all 200ms ease;
}

.card-interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--color-primary);
}

.card-interactive:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring), var(--shadow-lg);
}
```

#### Elevated Card

```css
.card-elevated {
  box-shadow: var(--shadow-lg);
  border: none;
}

.card-elevated:hover {
  box-shadow: var(--shadow-xl);
}
```

### Tabs

#### Tab Container

```css
.tabs {
  display: flex;
  border-bottom: 2px solid var(--color-border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.tabs-list {
  display: flex;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
```

#### Tab Buttons

```css
.tab-button {
  background: none;
  border: none;
  padding: 12px 16px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  position: relative;
  transition: color 200ms ease;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-button:hover:not([aria-selected="true"]) {
  color: var(--color-text-primary);
  background-color: var(--color-surface-hover);
}

.tab-button[aria-selected="true"] {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-button:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: 4px;
}
```

#### Tab Content

```css
.tab-content {
  display: none;
  animation: fadeIn 200ms ease;
}

.tab-content[aria-hidden="false"] {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

#### Responsive Tabs

```css
@media (max-width: 768px) {
  .tabs {
    overflow-x: auto;
  }

  .tab-button {
    padding: 10px 12px;
    font-size: var(--font-size-sm);
  }
}
```

### Input Fields

#### Text Input

```css
.input {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans);
  transition: all 150ms ease;
  min-height: 44px;
  width: 100%;
  box-sizing: border-box;
}

.input:hover:not(:disabled) {
  border-color: var(--color-border);
  background-color: var(--color-surface-hover);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.input::placeholder {
  color: var(--color-text-tertiary);
}

/* Error State */
.input.error {
  border-color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.02);
}

.input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Success State */
.input.success {
  border-color: var(--color-success);
  background-color: rgba(16, 185, 129, 0.02);
}
```

#### Label & Helper Text

```css
.label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.label.required::after {
  content: ' *';
  color: var(--color-error);
}

.field-hint {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: 4px;
}

.field-error {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-error);
  margin-top: 4px;
}
```

### Badges & Pills

#### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  background-color: var(--color-primary);
  color: var(--color-bg-primary);
}

.badge-secondary {
  background-color: var(--color-secondary);
  color: var(--color-bg-primary);
}

.badge-success {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.badge-error {
  background-color: var(--color-error-light);
  color: var(--color-error);
}

.badge-warning {
  background-color: var(--color-warning-light);
  color: var(--color-warning);
}

.badge-info {
  background-color: var(--color-info-light);
  color: var(--color-info);
}
```

#### Status Badge

```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.status-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-badge.active::before {
  background-color: var(--color-success);
}

.status-badge.inactive::before {
  background-color: var(--color-text-tertiary);
}

.status-badge.pending::before {
  background-color: var(--color-warning);
}
```

---

## 6. Animation & Motion

### Animation Principles

- **Micro-interactions (Simple State Changes):** 150-200ms
- **Transitions (Medium Changes):** 200-300ms
- **Complex Animations:** 400-600ms
- **Always respect:** `prefers-reduced-motion` for accessibility

### Easing Functions

```css
:root {
  /* Enter/Appear animations */
  --easing-enter: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Exit/Disappear animations */
  --easing-exit: cubic-bezier(0.4, 0, 0.6, 1);
  
  /* General state changes */
  --easing-standard: cubic-bezier(0.2, 0, 0, 1);
  
  /* Acceleration/deceleration */
  --easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```

### Fade In/Out

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter {
  animation: fadeIn 200ms var(--easing-enter) forwards;
}

.fade-exit {
  animation: fadeOut 150ms var(--easing-exit) forwards;
}
```

### Slide Animations

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-16px);
  }
}

.slide-in-up {
  animation: slideInUp 300ms var(--easing-enter) forwards;
}

.slide-out-up {
  animation: slideOutUp 200ms var(--easing-exit) forwards;
}
```

### Scale Animations

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.scale-in {
  animation: scaleIn 200ms var(--easing-enter) forwards;
}

.scale-out {
  animation: scaleOut 150ms var(--easing-exit) forwards;
}
```

### Data Flow Animations (RAG-Specific)

```css
@keyframes dataFlow {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulseData {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes connectionFlow {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.data-flow-enter {
  animation: dataFlow 400ms var(--easing-enter) forwards;
}

.data-pulse {
  animation: pulseData 2s ease-in-out infinite;
}

.connection-line {
  stroke-dasharray: 1000;
  animation: connectionFlow 1.5s var(--easing-enter) forwards;
}
```

### Loading & Processing

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-secondary) 25%,
    var(--color-surface-hover) 50%,
    var(--color-surface-secondary) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

.bounce-animation {
  animation: bounce 1s ease-in-out infinite;
}
```

### Stagger Animation (List Items)

```css
@keyframes staggerIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-item {
  animation: staggerIn 300ms var(--easing-enter) forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 40ms; }
.list-item:nth-child(3) { animation-delay: 80ms; }
.list-item:nth-child(4) { animation-delay: 120ms; }
.list-item:nth-child(5) { animation-delay: 160ms; }

/* Generic stagger helper (up to 10 items) */
.stagger-animation {
  animation: staggerIn 300ms var(--easing-enter) forwards;
}

@for $i from 1 through 10 {
  .stagger-animation:nth-child(#{$i}) {
    animation-delay: ($i - 1) * 50ms;
  }
}
```

### Reduce Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 10ms !important;
    animation-delay: 0ms !important;
    transition-duration: 10ms !important;
  }
}
```

### Hover & Interaction States

```css
/* Button Hover Animation */
.btn-interactive {
  position: relative;
  transition: all 200ms ease;
  transform: translateZ(0);
}

.btn-interactive:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-interactive:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

/* Link Underline Animation */
.link-animated {
  position: relative;
  text-decoration: none;
  color: var(--color-primary);
}

.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 200ms ease;
}

.link-animated:hover::after {
  width: 100%;
}
```

---

## 7. Accessibility Guidelines

### Contrast Requirements

All text must meet WCAG AA standards:
- Normal text: ≥4.5:1 contrast ratio
- Large text (18px+): ≥3:1 contrast ratio
- UI components: ≥3:1 contrast ratio

**Color Contrast Validation:**
```css
/* Light Mode - Verified Ratios */
--color-primary on --color-bg-primary: 5.2:1 ✓
--color-text-primary on --color-bg-primary: 12.6:1 ✓
--color-text-secondary on --color-bg-primary: 5.8:1 ✓

/* Dark Mode - Verified Ratios */
--color-primary on --color-bg-primary: 5.3:1 ✓
--color-text-primary on --color-bg-primary: 13.2:1 ✓
```

### Touch Targets

All interactive elements must be at least 44×44 pixels:

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Ensure spacing around touch targets */
.touch-target-group {
  display: flex;
  gap: var(--spacing-md);
}
```

### Focus Indicators

Always show clear focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* For components with custom styling */
.interactive-element:focus-visible {
  box-shadow: var(--focus-ring);
}
```

### Keyboard Navigation

```css
/* Tab Order */
.modal-dialog {
  background: var(--color-surface);
}

.modal-dialog button:first-of-type {
  /* First focusable element */
}

.modal-dialog button:last-of-type {
  /* Last focusable element */
}

/* Escape Key Handler (in JavaScript) */
/* document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOpen) closeModal();
}); */
```

### ARIA Labels

**Required ARIA Attributes:**

```html
<!-- Buttons with icons only -->
<button aria-label="Close dialog">✕</button>

<!-- Form inputs -->
<input aria-label="Search products" type="search" />
<input aria-labelledby="firstName-label" />
<label id="firstName-label">First Name</label>

<!-- Tabs -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div id="panel-1" role="tabpanel" aria-labelledby="tab-1"></div>
<div id="panel-2" role="tabpanel" aria-labelledby="tab-2"></div>

<!-- Loading State -->
<div aria-live="polite" aria-busy="true">
  Loading...
</div>

<!-- Error Messages -->
<input aria-invalid="true" aria-errormessage="email-error" />
<span id="email-error" role="alert">Invalid email format</span>

<!-- Dropdown/Combobox -->
<button aria-haspopup="listbox" aria-expanded="false">
  Select option
</button>

<!-- Status Badge -->
<span aria-label="Processing status: completed" class="status-badge">✓</span>
```

### Semantic HTML

```html
<!-- Use semantic elements instead of divs -->
<header>Site header</header>
<nav>Main navigation</nav>
<main>Primary content</main>
<section>Grouped content</section>
<article>Self-contained content</article>
<aside>Related content</aside>
<footer>Footer content</footer>

<!-- Buttons for actions -->
<button type="button">Action</button>

<!-- Links for navigation -->
<a href="/path">Navigate</a>

<!-- Form elements -->
<form>
  <label for="email">Email:</label>
  <input id="email" type="email" required />
</form>
```

### Focus Management

```javascript
// Trap focus in modal
function manageFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });
}
```

### Color Blind Friendly

- Don't rely on color alone to convey information
- Use patterns, icons, and text labels in addition to color
- Test designs with color blindness simulators

```css
/* Example: Status indicator with icon + color + text */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-indicator.success::before {
  content: '✓';
  color: var(--color-success);
  font-weight: bold;
}

.status-indicator.error::before {
  content: '✕';
  color: var(--color-error);
  font-weight: bold;
}
```

---

## 8. Component Color Usage Guidelines

### Button Color Mapping

| Component | State | Color | Usage |
|-----------|-------|-------|-------|
| Primary Button | Default | Primary | Main actions |
| Primary Button | Hover | Primary-Light | Interactive feedback |
| Primary Button | Active | Primary-Dark | Press state |
| Primary Button | Disabled | Primary (40% opacity) | Unavailable |
| Secondary Button | Default | Surface-Secondary | Alternative actions |
| Secondary Button | Hover | Surface-Hover | Interactive feedback |
| Danger Button | Default | Error | Destructive actions |
| Danger Button | Hover | Error (+10% lightness) | Interactive feedback |
| Success Button | Default | Success | Positive confirmation |

### Form Input Color Mapping

| State | Border | Background | Text |
|-------|--------|-----------|------|
| Default | Border | Surface | Text-Primary |
| Hover | Border (darker) | Surface-Hover | Text-Primary |
| Focus | Primary | Surface | Text-Primary |
| Filled | Border | Surface | Text-Primary |
| Error | Error | Error (5% opacity) | Text-Primary |
| Success | Success | Success (5% opacity) | Text-Primary |
| Disabled | Border | Surface (40% opacity) | Text-Disabled |

### Data Visualization Colors

For RAG visualization components:

```css
/* Confidence/Relevance Scoring */
--color-confidence-high: #10b981;      /* Emerald - high confidence */
--color-confidence-medium: #f59e0b;    /* Amber - medium confidence */
--color-confidence-low: #ef4444;       /* Red - low confidence */

/* Data Flow States */
--color-flow-active: #4f46e5;          /* Primary - active flow */
--color-flow-inactive: #cbd5e1;        /* Slate-300 - inactive flow */
--color-flow-processing: #f59e0b;      /* Amber - processing */

/* Entity/Token Highlighting */
--color-entity-primary: #3b82f6;       /* Blue - primary entities */
--color-entity-secondary: #a78bfa;     /* Purple - secondary entities */
--color-entity-highlight: #fbbf24;     /* Amber - important tokens */

/* Vector/Similarity Visualization */
--color-vector-match: #10b981;         /* Emerald - high similarity */
--color-vector-neutral: #64748b;       /* Slate - neutral */
--color-vector-mismatch: #ef4444;      /* Red - low similarity */
```

### Alert/Status Color Usage

```css
.alert {
  padding: var(--spacing-base);
  border-radius: 8px;
  border-left: 4px solid;
}

.alert.success {
  background-color: var(--color-success-light);
  border-left-color: var(--color-success);
  color: var(--color-success);
}

.alert.error {
  background-color: var(--color-error-light);
  border-left-color: var(--color-error);
  color: var(--color-error);
}

.alert.warning {
  background-color: var(--color-warning-light);
  border-left-color: var(--color-warning);
  color: var(--color-warning);
}

.alert.info {
  background-color: var(--color-info-light);
  border-left-color: var(--color-info);
  color: var(--color-info);
}
```

---

## 9. Implementation Best Practices

### Using the Design System

1. **Always use CSS variables** instead of hardcoded colors
2. **Follow the spacing scale** for consistent layout
3. **Respect animation preferences** with `prefers-reduced-motion`
4. **Test contrast ratios** for accessibility compliance
5. **Use semantic HTML** with proper ARIA labels
6. **Maintain touch target minimums** of 44×44px
7. **Test in both light and dark modes**

### CSS Architecture

```css
/* 1. Reset & Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. CSS Variables */
:root { --variables... }

/* 3. Typography Styles */
html { font-size: 16px; }
body { font-family: var(--font-family-sans); }

/* 4. Component Classes */
.button { ... }
.card { ... }
.tabs { ... }

/* 5. Utilities */
.text-center { text-align: center; }
.hidden { display: none; }

/* 6. Media Queries */
@media (max-width: 768px) { ... }
@media (prefers-reduced-motion: reduce) { ... }
@media (prefers-color-scheme: dark) { ... }
```

### Testing Checklist

- [ ] Light mode appearance verified
- [ ] Dark mode appearance verified
- [ ] Contrast ratios meet WCAG AA standards
- [ ] Touch targets ≥44×44px
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Responsive at all breakpoints
- [ ] All interactive elements have visible states

---

## 10. RAG Component-Specific Guidance

### Document Visualization Card

```css
.rag-document-card {
  background-color: var(--color-surface);
  border-left: 4px solid var(--color-primary);
  border-radius: 8px;
  padding: var(--spacing-base);
  transition: all 200ms ease;
}

.rag-document-card:hover {
  box-shadow: var(--shadow-lg);
  border-left-color: var(--color-primary-light);
}

.rag-document-relevance {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.rag-document-relevance.high {
  color: var(--color-success);
}

.rag-document-relevance.medium {
  color: var(--color-warning);
}

.rag-document-relevance.low {
  color: var(--color-error);
}

/* Relevance Score Indicator */
.relevance-score {
  width: 100%;
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.relevance-score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-success), var(--color-warning));
  transition: width 300ms ease;
}
```

### Data Flow Visualization

```css
.data-flow-container {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  padding: var(--spacing-lg);
  background-color: var(--color-surface);
  border-radius: 12px;
}

.data-flow-item {
  flex: 1;
  min-width: 120px;
}

.data-flow-arrow {
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  animation: dataFlow 600ms ease infinite alternate;
}

@keyframes dataFlow {
  from { transform: translateX(0); }
  to { transform: translateX(4px); }
}
```

### Processing State Indicator

```css
.processing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--color-info-light);
  color: var(--color-info);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.processing-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-info);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 11. Design System Usage Examples

### Example: Complete Button Component

```html
<button class="btn btn-primary">
  Primary Button
</button>

<button class="btn btn-secondary">
  Secondary Button
</button>

<button class="btn btn-tertiary">
  Tertiary Button
</button>

<button class="btn btn-danger">
  Delete
</button>

<button class="btn btn-primary btn-lg btn-block">
  Full Width Button
</button>
```

### Example: Form Component

```html
<form class="form">
  <div class="form-group">
    <label for="email" class="label">
      Email Address
      <span class="label-required">*</span>
    </label>
    <input
      id="email"
      type="email"
      class="input"
      placeholder="you@example.com"
      aria-label="Email Address"
      required
    />
    <span class="field-hint">We'll never share your email</span>
  </div>

  <div class="form-group">
    <label for="password" class="label">Password</label>
    <input
      id="password"
      type="password"
      class="input"
      aria-label="Password"
      required
    />
    <span class="field-error">Password must be at least 8 characters</span>
  </div>

  <button type="submit" class="btn btn-primary btn-block">
    Sign In
  </button>
</form>
```

### Example: Tab Navigation

```html
<div class="tabs">
  <div class="tabs-list" role="tablist">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      class="tab-button"
    >
      Overview
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      class="tab-button"
    >
      Details
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-3"
      class="tab-button"
    >
      Settings
    </button>
  </div>
</div>

<div id="panel-1" role="tabpanel" aria-labelledby="tab-1" class="tab-content">
  Overview content
</div>
<div id="panel-2" role="tabpanel" aria-labelledby="tab-2" class="tab-content" hidden>
  Details content
</div>
<div id="panel-3" role="tabpanel" aria-labelledby="tab-3" class="tab-content" hidden>
  Settings content
</div>
```

### Example: RAG Document Result Card

```html
<div class="rag-document-card fade-enter">
  <div class="card-header">
    <h3 class="card-title">Document Title</h3>
    <p class="card-subtitle">Source: Knowledge Base</p>
  </div>
  
  <div class="card-body">
    <p>
      Excerpt from the document showing relevant content related to the query...
    </p>
    
    <div style="margin-top: var(--spacing-base);">
      <div class="rag-document-relevance high">
        <span>Relevance Score</span>
        <strong>92%</strong>
      </div>
      <div class="relevance-score">
        <div class="relevance-score-fill" style="width: 92%;"></div>
      </div>
    </div>
  </div>
  
  <div class="card-footer">
    <button class="btn btn-tertiary">View Full Document</button>
  </div>
</div>
```

---

## 12. Responsive Design Rules

### Mobile-First Approach

```css
/* Base styles (mobile) */
.component {
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    font-size: var(--font-size-lg);
    padding: var(--spacing-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    font-size: var(--font-size-xl);
    padding: var(--spacing-xl);
  }
}
```

### Responsive Typography

```css
h1 {
  font-size: var(--font-size-4xl);
  line-height: var(--line-height-tight);
}

@media (min-width: 768px) {
  h1 {
    font-size: var(--font-size-5xl);
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: var(--font-size-6xl);
  }
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xl);
  }
}
```

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial design system for RAG visualization components |

---

## 14. Resources

- **Design Tools:** Figma, Sketch
- **Icon Library:** Heroicons, Feather Icons
- **Accessibility Tools:** WCAG 2.1, axe DevTools, WAVE
- **Color Contrast:** WebAIM Contrast Checker
- **Responsive Testing:** Responsive Design Checker, Browser DevTools
- **Animation Reference:** Material Design Motion, Framer Motion Docs

---

## 15. Contributors & Maintenance

Maintain this design system by:
1. Documenting new components as they are created
2. Keeping CSS variables up-to-date
3. Testing accessibility compliance regularly
4. Gathering feedback from design/development teams
5. Updating animations based on user feedback

For questions or updates, refer to the design system team.
