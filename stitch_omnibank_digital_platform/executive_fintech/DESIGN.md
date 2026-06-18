---
name: Executive FinTech
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737687'
  outline-variant: '#c2c6d9'
  surface-tint: '#0052dc'
  primary: '#004bca'
  on-primary: '#ffffff'
  primary-container: '#0061ff'
  on-primary-container: '#f1f2ff'
  inverse-primary: '#b4c5ff'
  secondary: '#49607e'
  on-secondary: '#ffffff'
  secondary-container: '#c4dcff'
  on-secondary-container: '#49617f'
  tertiary: '#006443'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f57'
  on-tertiary-container: '#ccffe2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#b0c8eb'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#314865'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  numeric-data:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is rooted in **Modern Minimalism** with a focus on high-end corporate reliability. It aims to evoke a sense of absolute security and technical precision while remaining accessible to a broad audience. The aesthetic prioritizes clarity over decoration, using generous whitespace and a rigorous grid to manage complex financial data.

The visual narrative is "Stability through Clarity." By utilizing a refined color palette and a systematic approach to density, the UI reduces the cognitive load often associated with banking, making the user feel in control of their financial life.

## Colors
The palette is dominated by **Deep Navy (#0A2540)** to establish institutional trust and **Royal Blue (#0061FF)** for primary actions and brand presence. 

- **Primary**: Used for key CTAs, active states, and progress indicators.
- **Secondary**: Reserved for high-level navigation, headings, and footer backgrounds to anchor the layout.
- **Success/Positive**: An **Emerald Green (#10B981)** is used for positive balances, transaction completions, and growth metrics.
- **Error/Alert**: A **Clear Red (#E11D48)** signals critical issues, negative balances, or declined actions.
- **Neutrals**: A range of slate greys handles secondary text, borders, and disabled states to maintain a soft, professional contrast.

## Typography
This design system employs a dual-font strategy. **Plus Jakarta Sans** is used for headlines to provide a modern, slightly soft professional touch. **Inter** is used for all body copy and tabular data due to its exceptional legibility and high x-height.

For financial figures, utilize the `numeric-data` role which enforces tabular lining (tnum) to ensure columns of numbers align perfectly for easy comparison. Hierarchy is maintained through weight rather than just size, ensuring that even dense information remains scannable.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid Grid**. Content is housed in a centered container with a maximum width of 1280px on desktop, utilizing a 12-column grid. On mobile devices, the system shifts to a 4-column grid with reduced margins.

Spacing is governed by an 8px linear scale. Generous vertical spacing (`lg` and `xl`) is encouraged between major sections (e.g., separating Account Overview from Recent Transactions) to prevent the "dashboard clutter" common in banking apps. Internal component padding should default to `md` (24px) for cards to ensure a breathable, premium feel.

## Elevation & Depth
Depth is conveyed through **Ambient Shadows** and **Tonal Layers**. Instead of harsh black shadows, this design system uses low-opacity navy tints to maintain a clean, professional look.

- **Level 0 (Base)**: Pure white (#FFFFFF) for the main application background.
- **Level 1 (Cards)**: White surface with a subtle 1px border (#E2E8F0) and a soft shadow (0px 4px 12px rgba(10, 37, 64, 0.05)).
- **Level 2 (Overlays/Modals)**: White surface with a more pronounced shadow (0px 12px 32px rgba(10, 37, 64, 0.12)) to indicate high-priority interaction.
- **Interactive States**: Subtle scale-down (98%) on press to provide tactile feedback without relying on skeuomorphic gradients.

## Shapes
The shape language is consistently **Rounded**. A base radius of 8px (0.5rem) is applied to all standard components like buttons, input fields, and small cards. Larger containers, such as main dashboard modules, utilize a 16px (1rem) radius. 

This rounding softens the "cold" nature of financial data, making the application feel more approachable and modern while maintaining a structured, professional silhouette.

## Components

### Buttons
- **Primary**: Solid Royal Blue background, white text, 8px radius. Heavy emphasis.
- **Secondary**: Transparent background, Navy 1px border, Navy text. Used for secondary actions like "View Statement."
- **Ghost**: No border or background, Royal Blue text. Used for low-priority utility links.

### Input Fields
Inputs use a light grey background (#F8FAFC) with an 8px radius. On focus, the border transitions to a 2px Royal Blue stroke with a soft blue outer glow to signify a "Secure Entry" state. Labels are always persistent above the field in `label-md`.

### Cards
Cards are the primary container for data. They must always have a white background, the Level 1 shadow, and 24px internal padding. Avoid nesting cards more than one level deep to maintain a flat, clean hierarchy.

### Chips & Badges
Used for transaction categories (e.g., "Shopping", "Bills"). These should use highly desaturated versions of the category color with high-contrast text to ensure accessibility without distracting from the main balance data.

### Data Visualization
Charts should be minimal. Use the Primary Royal Blue for main trends and Emerald Green for growth. Avoid multi-colored "rainbow" charts; stick to the brand palette to maintain a sophisticated, high-end appearance.