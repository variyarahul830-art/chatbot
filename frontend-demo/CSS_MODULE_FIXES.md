# CSS Module Syntax Fixes

## Problem
CSS Modules don't support Sass-style nesting syntax (using `&` for parent selectors or nesting element selectors). This caused build errors with the error message:
```
Syntax error: Selector "p" is not pure (pure selectors must contain at least one local class or id)
```

## Root Cause
The CSS files were written with Sass nesting syntax, which is NOT supported in CSS Modules. CSS Modules are plain CSS with module scoping, not a Sass preprocessor.

## Files Fixed

### 1. DataTransformationFlow.module.css
- **Issue**: Nested `p { }` selector inside `.textBox { }` (line 104)
- **Fix**: Changed to `.textBox p { }` (plain CSS descendant selector)
- **Issue**: Nested `&:hover` and `&.active` inside `.stepBtn { }`
- **Fix**: Changed to `.stepBtn:hover`, `.stepBtn.active`
- **Issue**: Nested `&:hover` inside `.chunk { }`
- **Fix**: Changed to `.chunk:hover`

### 2. RAGFlow.module.css
- **Issue**: Nested `&::before` inside `.step { }`
- **Fix**: Changed to `.step::before`
- **Issue**: Nested `&:hover::before` inside `.step { }`
- **Fix**: Changed to `.step:hover::before`
- **Issue**: Nested `&:hover` inside `.stepMobile { }`
- **Fix**: Changed to `.stepMobile:hover`
- **Issue**: Nested `&::before { }` inside dark mode media query
- **Fix**: Changed to `.step::before` (moved outside @media)

### 3. RAGDetailBreakdown.module.css
- **Issue**: Nested `&:hover` and `&.expanded` inside `.phaseHeader { }`
- **Fix**: Changed to `.phaseHeader:hover` and `.phaseHeader.expanded`
- **Issue**: Nested `&:hover` inside `.subStep { }`
- **Fix**: Changed to `.subStep:hover`
- **Issue**: Nested `&:hover` inside `.statCard { }`
- **Fix**: Changed to `.statCard:hover`

### 4. QueryWalkthrough.module.css
- **Issue**: Nested `strong { }` inside `.resultScore { }`
- **Fix**: Changed to `.resultScore strong { }`
- **Issue**: Nested `p { }` inside `.infoBox { }`
- **Fix**: Changed to `.infoBox p { }`
- **Issue**: Nested `h4 { }` inside `.detailCard { }`
- **Fix**: Changed to `.detailCard h4 { }`
- **Issue**: Nested `&:hover` inside `.resultCard { }`
- **Fix**: Changed to `.resultCard:hover`
- **Issue**: Nested `&:hover:not(:disabled)` and `&:disabled` inside `.navBtn { }`
- **Fix**: Changed to `.navBtn:hover:not(:disabled)` and `.navBtn:disabled`
- **Issue**: Nested `&:hover`, `&.active`, `&.completed` inside `.stepDot { }`
- **Fix**: Changed to `.stepDot:hover`, `.stepDot.active`, `.stepDot.completed`

### 5. VectorSpaceVisualization.module.css
- **Issue**: Nested `li { }` inside `.controlsList { }`
- **Fix**: Changed to `.controlsList li { }`

## CSS Module Nesting Support

CSS Modules (as implemented in Next.js) use **plain CSS syntax**, NOT Sass.

**Supported:**
- Descendant selectors: `.class p { }`
- Pseudo-classes: `.class:hover { }`
- Pseudo-elements: `.class::before { }`
- @media queries with @keyframes

**NOT Supported:**
- Parent selector `&` (Sass feature)
- Nested element selectors like `{ p { } }` (Sass feature)
- Sass variables (use CSS custom properties instead: `var(--name)`)

## Verification

All files have been checked for remaining Sass syntax:
- ✅ No remaining `&` parent selectors found
- ✅ No remaining nested element selectors found
- ✅ All @media queries converted to proper CSS syntax
- ✅ All @keyframes rules verified as valid CSS

## Build Status

The CSS Module syntax errors should now be resolved. The build should complete successfully with these changes.

## References

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Next.js CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- [Sass vs CSS Modules](https://sass-lang.com/)
