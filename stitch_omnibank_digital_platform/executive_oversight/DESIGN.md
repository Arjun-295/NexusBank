---
name: Executive Oversight
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424656'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737687'
  outline-variant: '#c2c6d9'
  surface-tint: '#0052dc'
  primary: '#004bca'
  on-primary: '#ffffff'
  primary-container: '#0061ff'
  on-primary-container: '#f1f2ff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#9d3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#c73f00'
  on-tertiary-container: '#ffefeb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar_width: 260px
  header_height: 64px
  container_max_width: 1600px
---

## Brand & Style
The design system is a high-density, authoritative extension of an executive fintech aesthetic, specifically tailored for administrative oversight and complex data management. It balances the sophisticated "Executive" feel with the utilitarian requirements of an operations dashboard.

The visual style is **Corporate / Modern** with a lean toward **High-Density Minimalism**. It prioritizes information hierarchy and functional clarity over decorative flair. The interface should feel reliable, precise, and instantaneous, evoking a sense of total control for the operator. Soft gradients are replaced by solid fills and crisp strokes to ensure legibility in data-heavy environments.

## Colors
The palette is anchored by the deep blue primary color, signifying stability and institutional trust. 

- **Primary (#0061FF):** Used for primary actions, active navigation states, and key data highlights.
- **Functional Palette:** Precise semantic colors are introduced for status reporting. Success (Emerald), Warning (Amber), and Danger (Rose) are calibrated for high legibility against white and light gray surfaces.
- **Neutrals:** A slate-based neutral scale is used to create structural contrast without the harshness of pure black, aiding in long-term screen endurance for power users.
- **Backgrounds:** A tiered system of cool grays helps separate the navigation (sidebar), the canvas (background), and the content (cards).

## Typography
This design system utilizes **Plus Jakarta Sans** for all UI elements to maintain a modern, professional tone with excellent readability at small sizes. 

- **Weight Strategy:** Bold and Semibold weights are reserved for structural headers and key metrics. Regular weight is used for all body text to maximize legibility in dense tables.
- **Numerical Data:** For transaction IDs, API keys, or ledger entries, a monospaced font (JetBrains Mono) is permitted to ensure character alignment.
- **Scale:** The scale is compact. `body-md` (14px) is the standard for most interface text, allowing for higher data density than consumer-facing applications.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model optimized for wide-screen desktop displays.

- **The Shell:** A fixed-width left sidebar (260px) houses primary navigation. The top header (64px) provides global search and profile actions.
- **The Grid:** A 12-column fluid grid system is used within the main content area. Gutters are kept tight (16px) to maximize horizontal data space.
- **Density:** Padding within components (cards, table cells) is reduced compared to consumer apps. A 4px/8px base unit is strictly followed to maintain a rigorous rhythm.
- **Breakpoints:** On tablets, the sidebar collapses into a rail or hamburger menu. On mobile, the layout reflows to a single column, though the primary use case for this design system is desktop oversight.

## Elevation & Depth
The design system uses **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows to maintain a clean, "pro" aesthetic.

- **Surface 0:** The application background (#F8FAFC).
- **Surface 1:** Primary cards and the sidebar. These use a subtle 1px border (#E2E8F0) to define edges.
- **Elevation High:** Only used for temporary overlays like dropdowns, modals, or tooltips. These utilize a soft, neutral shadow (0px 10px 15px -3px rgba(15, 23, 42, 0.08)) to indicate they sit above the management canvas.
- **Interactive States:** Buttons and clickable rows use a subtle background-color shift rather than a shadow change to indicate hover states.

## Shapes
The shape language is **Soft** and professional. 

- **Core Elements:** Buttons, input fields, and small cards use a 4px (`rounded`) corner radius. This provides a modern feel without appearing overly "bubbly" or consumer-grade.
- **Large Containers:** Dashboard widgets and main content panels use an 8px (`rounded-lg`) radius.
- **Status Indicators:** Chips and badges for status (e.g., "Active", "Pending") use a 100px radius to create a pill shape, making them instantly distinguishable from square-ish buttons.

## Components

- **Data Tables:** The most critical component. Features include 12px vertical cell padding, horizontal zebra striping on hover, and fixed headers. Column headers use `label-sm` in all-caps.
- **Status Badges:** Compact pills with light background tints (e.g., Success is light green background with dark green text). No borders.
- **Action Buttons:** Primary buttons use the primary blue with white text. Secondary buttons use a white fill with a slate-200 border. Sizes are kept compact (32px-40px height).
- **Input Fields:** Minimalist design with a 1px border. On focus, the border changes to the primary blue with a subtle 2px blue "halo" (outer glow).
- **KPI Cards:** Large numeric displays using `display-sm`. Includes a small sparkline or percentage change indicator (using success/danger colors) in the corner.
- **Metric Charts:** Use simplified line and bar charts with the primary blue for the main data series and slate grays for reference lines.
- **Navigation Rails:** Sidebar links use `body-md` semibold. Active states are indicated by a 3px vertical "accent bar" on the left edge and a subtle blue tint on the background.