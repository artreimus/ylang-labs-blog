---
version: alpha
name: Ylang Labs
description: Content-first AI engineering publication and project showcase design system.
colors:
  primary: '#efc003'
  primary-50: '#fefde8'
  primary-100: '#fffdc2'
  primary-200: '#fff787'
  primary-300: '#ffeb43'
  primary-400: '#ffd702'
  primary-500: '#efc003'
  primary-600: '#ce9500'
  primary-700: '#a46a04'
  primary-800: '#88520b'
  primary-900: '#734310'
  primary-950: '#432305'
  secondary: '#75b34a'
  secondary-50: '#f3f8ed'
  secondary-100: '#e3f0d7'
  secondary-200: '#c9e3b3'
  secondary-300: '#a7d086'
  secondary-400: '#87bb60'
  secondary-500: '#75b34a'
  secondary-600: '#507f31'
  secondary-700: '#3e6229'
  secondary-800: '#354f25'
  secondary-900: '#2f4423'
  secondary-950: '#16240f'
  white: '#ffffff'
  black: '#000000'
  gray-50: '#f9fafb'
  gray-100: '#f3f4f6'
  gray-200: '#e5e7eb'
  gray-300: '#d1d5db'
  gray-400: '#9ca3af'
  gray-500: '#6b7280'
  gray-600: '#4b5563'
  gray-700: '#374151'
  gray-800: '#1f2937'
  gray-900: '#111827'
  gray-950: '#030712'
  surface: '#ffffff'
  surface-muted: '#f9fafb'
  surface-dark: '#030712'
  surface-dark-muted: '#111827'
  on-surface: '#111827'
  on-surface-muted: '#4b5563'
  on-surface-dark: '#f3f4f6'
  on-surface-dark-muted: '#9ca3af'
  border: '#e5e7eb'
  border-dark: '#374151'
  indigo-code: '#6366f1'
  error: '#dc2626'
typography:
  display:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 96px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.05em
  headline-xl:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 60px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.6
  body-md:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.25
  label-caps:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.08em
  code-md:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: 0px
  sm: 2px
  md: 6px
  lg: 8px
  xl: 12px
  '2xl': 16px
  '3xl': 24px
  full: 9999px
spacing:
  '0': 0px
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  '12': 48px
  '16': 64px
  '20': 80px
  '24': 96px
  header-height: 120px
  footnote-margin-top: 48px
  footnote-padding-top: 32px
  content-anchor-offset: -24px
  container-sm: 768px
  container-md: 1024px
  container-lg: 1280px
components:
  button-primary:
    backgroundColor: '{colors.primary-500}'
    textColor: '{colors.gray-950}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px
    height: 48px
  button-primary-hover:
    backgroundColor: '{colors.primary-600}'
    textColor: '{colors.gray-950}'
  button-secondary:
    backgroundColor: '{colors.secondary-600}'
    textColor: '{colors.white}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 12px
    height: 48px
  button-secondary-hover:
    backgroundColor: '{colors.secondary-700}'
    textColor: '{colors.white}'
  link-inline:
    textColor: '{colors.primary-500}'
    typography: '{typography.body-md}'
  link-inline-hover:
    textColor: '{colors.primary-600}'
  link-inline-invert-hover:
    textColor: '{colors.primary-400}'
  code-inline:
    textColor: '{colors.indigo-code}'
    typography: '{typography.code-md}'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.xl}'
    padding: 24px
  card-dark:
    backgroundColor: '{colors.surface-dark-muted}'
    textColor: '{colors.on-surface-dark}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.xl}'
    padding: 24px
  input-search:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.full}'
    padding: 20px
    height: 48px
  tag:
    backgroundColor: '{colors.secondary-600}'
    textColor: '{colors.white}'
    typography: '{typography.label-caps}'
    rounded: '{rounded.sm}'
    padding: 8px
  navbar-floating:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.full}'
    padding: 8px
  mobile-menu:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: 24px
    padding: 16px
  footnotes:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    typography: '{typography.body-sm}'
    padding: 32px
---

# Ylang Labs Design System

## Overview

Ylang Labs is a content-first AI engineering publication and project showcase. The interface should feel technical, editorial, and approachable: generous reading space, clear hierarchy, strong imagery, and restrained motion that supports discovery without competing with the writing.

The brand language is built around a white or near-black canvas, crisp Helvetica typography, black-and-gray editorial structure, and two botanical accents: golden yellow for primary action and attention, and leaf green for secondary action, tags, and support signals. The system should look like a practical engineering journal rather than a marketing splash page.

## Colors

The palette comes directly from `tailwind.config.js` and the existing logo assets. `primary`, `secondary`, and `gray` are Tailwind theme scales, so implementation should prefer classes such as `text-primary-500`, `hover:text-primary-600`, `dark:text-primary-400`, `bg-secondary-500`, and `dark:bg-gray-950` over one-off hex values.

- **Primary Yellow (#efc003):** Main brand action color. Use for primary links, active states, selected controls, and key hero emphasis. `primary-400` (#ffd702) is the brighter logo/highlight yellow; `primary-600` (#ce9500) and darker steps are for hover, borders, and high-contrast text pairings.
- **Secondary Green (#75b34a):** Supporting brand color. Use for project/category emphasis, tags, secondary buttons, and diagrams. Prefer `secondary-600` (#507f31) or darker when white text is required.
- **White (#ffffff) and Gray 50 (#f9fafb):** Main light surfaces. Keep most reading and listing pages white; use gray-50 for muted sections, search surfaces, and inactive controls.
- **Gray 900 (#111827), Gray 950 (#030712), and Black (#000000):** Primary text and dark-mode surfaces. Dark mode should be near-black, not blue-black.
- **Gray 500/600 (#6b7280/#4b5563):** Body metadata, summaries, timestamps, helper copy, and icon defaults.
- **Gray 200/300 (#e5e7eb/#d1d5db):** Dividers, borders, input outlines, and card rings.
- **Error Red (#dc2626):** Use only for destructive/error states; do not use red as a decorative accent.

Light mode defaults to `bg-white text-black`; dark mode defaults to `bg-gray-950 text-white`. Preserve both modes for every new component.

## Typography

The production font stack is Helvetica, Arial, sans-serif. The site relies on weight, scale, and spacing rather than decorative type families. Existing hero copy occasionally uses `font-serif`; keep that as a rare editorial flourish, not a default component font.

- **Hero/display:** Large, tight, high-confidence headings. Current homepage hero reaches `text-8xl` with tight tracking and bold weight. Use this only for true first-screen statements.
- **Page titles:** 40-60px equivalent, bold or extra-bold, tight tracking, gray-900 in light mode and gray-50/white in dark mode.
- **Section headings:** 24-36px equivalent, bold, tight line height. Pair with a short gray summary when needed.
- **Body copy:** 16px, regular, relaxed line height. Long-form article content should use the typography plugin and preserve generous line-height.
- **Metadata and tags:** 12-14px, medium to semibold, often uppercase with tracking. Use sparingly so cards remain scannable.
- **Code:** Use the default monospace stack. Code blocks should remain visually distinct with gray surfaces and primary-yellow highlights for active lines or key marks.

The Tailwind typography plugin is part of the design contract:

- Default prose links use `primary-500`; hover uses `primary-600`.
- In inverted prose, links still use `primary-500`; hover moves to `primary-400`.
- `h1` and `h2` in prose are weight 700 with Tailwind `tracking-tight`.
- `h3` in prose is weight 600.
- Inline prose code uses Tailwind `indigo-500`; link-contained code uses `primary-400`.
- In inverted prose, all headings use `gray-100`.

Do not introduce a new web font unless the project intentionally rebrands. Use Tailwind type utilities and the existing typography plugin patterns.

## Layout

The layout is responsive, centered, and content-led.

- **Primary content container:** Use `max-w-3xl px-4 sm:px-6 xl:max-w-5xl` for article-centered pages and the default shell.
- **Index/listing pages:** Use wider containers where cards or grids need room: `max-w-5xl` for blog lists and `max-w-7xl` for project grids.
- **Section rhythm:** Use 48-96px vertical spacing for major sections. Existing page sections commonly use `pt-12`, `pb-24`, `mt-16`, and `gap-8`.
- **Grid behavior:** Collapse to one column on mobile. Use two columns around medium/large viewports and three columns only when cards have enough width to keep titles and summaries readable.
- **Horizontal discovery rows:** The homepage uses horizontally scrollable card rows with hidden scrollbars. Keep these as compact discovery surfaces; do not use them for long-form reading.
- **Sticky/floating navigation:** Header height is 120px. The navbar becomes glassy and rounded after scrolling, then hides on downward scroll. Keep page content padded below the header.

Spacing follows Tailwind's 4px base scale. Avoid arbitrary values unless they preserve a fixed format already present in the codebase, such as card dimensions or header offset.

Implementation source-of-truth:

- `app/layout.tsx` imports `css/tailwind.css`; new global utilities should normally live there.
- `app/globals.css` currently defines `.hide-scrollbar`, while `css/tailwind.css` defines `.no-scrollbar`. Existing homepage rows use `hide-scrollbar`, so keep both names consistent until the CSS imports are consolidated.
- `css/tailwind.css` also defines article-adjacent utilities: task list markers are hidden, footnotes use `mt-12 border-t border-gray-200 pt-8 dark:border-gray-700`, CSL bibliography entries use `my-5`, KaTeX display blocks scroll horizontally, content header anchor links reveal on hover, and `.flow-line` uses a 1 second linear dash animation.
- `tailwind.config.js` adds line-height utilities `leading-11` through `leading-14`; `leading-14` is used on large page titles and should remain available for dense hero/page-heading layouts.
- `tailwind.config.js` adds z-index utilities `z-60`, `z-70`, and `z-80`; reserve them for layered navigation, search, theme controls, menus, and overlays.

## Elevation & Depth

Depth is light and modern, mostly created through borders, rings, image scale, and subtle shadows.

- **Default surfaces:** No shadow; use whitespace and dividers.
- **Cards:** Use `border border-gray-200`, `ring-1`, or `shadow-sm` by default. Elevate on hover with `shadow-lg` or `shadow-2xl` only for project cards and image-forward cards.
- **Navbar and dropdowns:** Use translucent surfaces, backdrop blur, rounded-full or rounded-3xl shapes, and soft multi-layer shadows.
- **Image cards:** Use overflow-hidden rounded corners, object-cover imagery, and subtle hover scale. Overlays may use black gradients only to keep text readable on images.
- **Dark mode:** Replace shadows with borders/rings where possible; heavy shadows disappear against gray-950.
- **Footnotes and citations:** Use the global footnote treatment from `css/tailwind.css`: a top border, 48px top margin, and 32px top padding. Bibliography/CSL entries should keep the existing `my-5` rhythm.

Avoid decorative glow fields and unrelated background effects. Gradients are allowed only when already part of a hero/about composition or image readability overlay.

## Shapes

The shape language is soft, rounded, and approachable.

- **Primary buttons and search inputs:** Full pills (`rounded-full`).
- **Navbar:** Rounded-full while floating; mobile menu uses rounded-3xl.
- **Cards:** Rounded-lg to rounded-xl for article/project cards; rounded-2xl and rounded-3xl are reserved for larger feature panels and mobile overlays.
- **Tags:** Small rounded rectangles (`rounded-sm`) with tight padding.
- **Avatars and icon clusters:** Full circles when representing people or compact controls.

Do not mix sharp enterprise rectangles with the existing pill/card system. A component may be square only when it is a code block, diagram, image frame, or table-like utility surface.

## Components

### Navigation

Use the existing header pattern: left logo, centered nav links on desktop, right search and theme controls, and a compact mobile menu. Desktop nav items are small Helvetica labels with pill hover backgrounds. Mobile nav rows are tall, simple, and text-forward.

Layered navigation should use the repo's custom z-index utilities, especially `z-70` for controls that must sit above hover pills and translucent navbar surfaces.

### Buttons and Links

Primary CTAs should be pill-shaped, 48px tall, medium weight, and use the yellow brand scale. Existing code has some `text-white` on `primary-500`; for new small-text controls, prefer gray-950/black on yellow or darken the background enough to pass contrast. Secondary CTAs use green, preferably `secondary-600` or darker with white text.

Inline links use `primary-500` in light and dark mode, with hover shifting toward `primary-600` in light mode and `primary-400` in dark mode. Link text should be concise and action-oriented.

### Cards

There are two primary card families:

- **Editorial image cards:** Fixed or aspect-ratio image cards with rounded corners, object-cover imagery, compact title overlays, and a subtle image scale on hover.
- **Structured content cards:** White/dark surfaces with borders or rings, rounded-xl corners, 16-24px padding, clear title, short summary, metadata row, and a restrained hover lift.

Cards should never contain another card. Use dividers or internal spacing for nested information.

### Tags and Metadata

Tags are compact, uppercase, and green by default. Use at most three tags in list contexts and one tag on dense image cards. Reading time, dates, and author metadata should be gray and visually secondary.

### Search and Inputs

Search inputs are rounded-full with white/dark surfaces, gray borders, 48px height, and primary-yellow focus rings. Use clear placeholder copy and a right-aligned search icon. Standard form inputs may use rounded-md when following shadcn defaults, but public-facing search should remain pill-shaped.

### Article Content

Articles use the typography plugin with generous spacing, readable line lengths, clear heading hierarchy, and primary-yellow links. Code and diagrams should be legible in both modes. Image headers should use wide aspect ratios and object-cover behavior.

Keep article support utilities aligned with `css/tailwind.css`: hidden task-list markers, hover-revealed heading anchors, horizontally scrollable KaTeX display blocks, footnote borders, and CSL entry spacing. These are part of the reading experience, not incidental CSS.

### Motion

Use small entrance animations, image scale, and button/card hover transforms. Keep motion purposeful: reveal content, suggest clickability, or guide the eye. `tailwind.config.js` defines `typewriter`, `blinkCaret`, and `typewriterWithCaret`; use those named animations instead of inventing local duplicates. Continuous motion should be limited to technical diagrams such as `.flow-line`, where motion explains process flow.

## Do's and Don'ts

- Do preserve light and dark mode classes for every new component.
- Do use the existing Tailwind `primary`, `secondary`, and `gray` scales rather than hardcoding one-off colors.
- Do keep global utility additions in the active stylesheet (`css/tailwind.css`) unless `app/globals.css` is intentionally imported.
- Do keep `hide-scrollbar` and `no-scrollbar` behavior equivalent while both names exist.
- Do keep pages content-first: readable headings, short summaries, useful imagery, and clear metadata.
- Do use rounded-full for public CTAs, navigation hovers, and search inputs.
- Do prefer borders, rings, and subtle shadows over heavy elevation.
- Do keep article and blog surfaces readable before adding visual effects.
- Do use the existing `typewriter`, `blinkCaret`, `typewriterWithCaret`, and `flow-line` animation names when those behaviors fit.
- Don't introduce blue, purple, orange, or pink accents for core UI; yellow and green are the brand accents.
- Don't use white text on yellow for new small-text buttons or labels; use gray-950/black or darken the background enough to pass contrast.
- Don't add a second global stylesheet source of truth for the same utility class.
- Don't add nested cards, oversized decorative panels, or marketing-style hero sections to operational/content pages.
- Don't make new pages depend on gradients or glow effects for brand identity.
- Don't remove or bypass the existing Helvetica/Tailwind typography conventions without a deliberate rebrand.
