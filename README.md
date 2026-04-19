# 3WeSolution Website

Official website for **3WeSolution** (3wesolution.com) — an AI-powered web services and Digital Risk Protection company founded in Melbourne, Australia in 2009.

---

## Table of Contents

- [Project Idea](#project-idea)
- [Design Philosophy](#design-philosophy)
- [Site Architecture](#site-architecture)
- [Design System](#design-system)
- [Page Inventory](#page-inventory)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Local Development](#local-development)
- [Change History](#change-history)

---

## Project Idea

3WeSolution needed a professional web presence that:

1. **Positions the brand as AI-forward** — the company uses AI in its web design, threat detection, and SEO workflows and this needs to be immediately clear to visitors
2. **Communicates 15 years of credibility** — founded 2009, the site needed to convey depth of experience without looking dated
3. **Supports dual audiences** — B2B clients looking for web services, and enterprises needing Digital Risk Protection (DRP)
4. **Highlights the Cyberoo.ai partnership** — a 5-year strategic technology partnership (since 2021) that powers the DRP practice, giving 3WeSolution an enterprise-grade AI detection platform
5. **Works without a backend** — the site is fully static HTML/CSS/JS, deployable anywhere, with no build pipeline required

---

## Design Philosophy

The site adopts an **Apple.com-inspired design language** — minimal, typographically strong, with generous whitespace and a restrained colour palette. The key principles:

### Visual Language
- **Pure white (`#ffffff`) and light gray (`#f5f5f7`)** alternating section backgrounds create rhythm without noise
- **Near-black (`#1d1d1f`)** for all body text — the same value Apple uses, warmer than pure black
- **Apple blue (`#0071e3`)** as the single accent colour for links, buttons, labels, and CTAs
- **No gradients on backgrounds** — the only exception is the subtle radial gradient on the homepage hero (5% opacity blue, barely visible)
- **Dark CTA sections** use solid `#1d1d1f`, never a colour gradient — consistent with how Apple handles dark promotional blocks

### Typography
- **SF Pro font stack**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial` — renders natively on Apple devices, falls back gracefully elsewhere
- **Hero headings**: `clamp(48px, 8vw, 88px)`, weight 700, letter-spacing −2.5px — tight and large, exactly as Apple sets product headlines
- **Section titles**: `clamp(32px, 4.5vw, 56px)`, letter-spacing −1.5px
- **Body text**: 17–19px with 1.6–1.7 line-height for comfortable reading

### Card & Grid Pattern
Rather than individual bordered cards, content is presented as **tiled grids**:
```
gap: 2px;  background: #e8e8ed;  border-radius: 24px;  overflow: hidden;
```
The 2px gap creates thin divider lines between tiles. Each tile has a white background that shifts to `#f5f5f7` on hover. This is the same technique Apple uses for feature comparison tables and spec grids — no card shadows, no individual borders.

### Buttons
- **Primary** (`btn-primary`): solid blue pill, `border-radius: 40px`
- **Secondary** (`btn-secondary`): transparent with blue border, fills on hover
- **White** (`btn-white`): used only inside dark CTA sections

### Brand Identity
The **3WeSolution** logotype in the nav:
- `3W` in `#1d1d1f` (black)
- `eSolution` in `#0071e3` (blue) via a `<span>`
- A standalone **three-W icon mark** was designed as SVG (`images/logo.svg`, `images/logo-mark.svg`): three W letterforms at −90°, 0°, and +90° rotations, creating a symmetrical fan/crown shape

---

## Site Architecture

```
CC-3Wesolution/
│
├── index.html              # Homepage
├── about.html              # Company story, values, timeline, team
├── contact.html            # Enquiry form + FAQ accordion
│
├── services/               # One page per service offering
│   ├── website-design.html
│   ├── web-hosting.html
│   ├── certificate.html
│   ├── domain.html
│   ├── email.html
│   ├── social-media.html
│   ├── digitalization.html
│   └── digital-risk.html   # DRP — largest page, page-scoped styles
│
├── css/
│   └── style.css           # Single global stylesheet (~1,100 lines)
│
├── js/
│   └── main.js             # Single global script (~107 lines)
│
├── images/
│   ├── logo.svg            # Full horizontal logo (icon + wordmark)
│   └── logo-mark.svg       # Icon-only mark (three-W symbol)
│
├── CLAUDE.md               # AI coding assistant guidance
└── README.md               # This file
```

### Path Convention
| Page type | CSS/JS path | Back-link |
|---|---|---|
| Root pages (`index`, `about`, `contact`) | `css/style.css` | — |
| Service pages (`services/*.html`) | `../css/style.css` | `../index.html` |

### Shared Components (hand-coded, no framework)
Every page includes the same:
- **Frosted-glass nav** — fixed, `backdrop-filter: blur(20px)`, services dropdown
- **Language switcher** — EN / 中文 (Chinese version directory `cn/` reserved, not yet built)
- **Footer** — dark (`#1d1d1f`), four-column grid with services, company, contact links

---

## Design System

### CSS Variables (`css/style.css` `:root`)

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#ffffff` | Page background |
| `--bg-alt` | `#f5f5f7` | Alternate section background |
| `--text` | `#1d1d1f` | Primary text |
| `--text-muted` | `#6e6e73` | Secondary/caption text |
| `--blue` | `#0071e3` | Accent — links, buttons, labels |
| `--border` | `#d2d2d7` | Input borders |
| `--border-light` | `#e8e8ed` | Tile grid gaps, dividers |
| `--r-sm / md / lg / xl` | `10 / 18 / 24 / 32px` | Border radii |
| `--t` | `0.28s ease` | Standard transition |

### JavaScript (`js/main.js`)
Loaded by every page, provides:
- **Mobile nav** — hamburger toggle with X animation, outside-click close
- **Mobile dropdown** — tap to expand services list on `≤768px`
- **Scroll-reveal** — `IntersectionObserver` fades cards in as they enter viewport
- **Counters** — `.num[data-count]` elements animate from 0 to target on scroll (uses `data-suffix` for units)
- **Contact form** — constructs a `mailto:` URL from form fields and opens the user's email client pre-filled to `3wesolution@gmail.com`

---

## Page Inventory

| Page | Key Sections |
|---|---|
| **index.html** | Hero, Stats bar (4 counters), Services grid (8 cards), AI feature section, Security feature section, Testimonials, CTA |
| **about.html** | Hero, Mission (two-col), Stats bar, Core Values (3×2 grid), Timeline (2009–2021), Team, Partners, CTA |
| **contact.html** | Hero, Contact info card + Enquiry form (with service checkboxes, budget selector), FAQ accordion, CTA |
| **website-design.html** | Hero, 8-feature grid, Process timeline, Pricing (3 tiers), CTA |
| **web-hosting.html** | Hero, Features, Pricing (3 tiers), CTA |
| **certificate.html** | Hero, Features, CTA |
| **domain.html** | Hero, Features, CTA |
| **email.html** | Hero, Features, CTA |
| **social-media.html** | Hero, Features, CTA |
| **digitalization.html** | Hero, Features, CTA |
| **digital-risk.html** | Hero, Cyberoo.ai partner banner, Track-record stats, 8 threat-type cards, 4-phase methodology, Why 3WE section, Pricing (3 tiers), CTA |

---

## Key Features

### Digital Risk Protection Page
The most content-rich service page. Uses a **page-scoped `<style>` block** for components not needed globally: `.partner-banner`, `.threat-grid`, `.threat-card`, `.process-steps`, `.experience-bar`. Highlights the 5-year Cyberoo.ai partnership with explicit stats (8,400+ takedowns, 350+ brands, <4h response).

### Contact Form → Email
The contact form (`contact.html`) is a **purely static mailto solution** — no server, no third-party form service. On submit, JavaScript constructs a pre-filled `mailto:` URL from all form fields (name, email, company, selected services, budget, message) and opens the visitor's default email client addressed to `3wesolution@gmail.com`.

### Animated Counters
The homepage stats bar uses `data-count` / `data-suffix` HTML attributes driven by `main.js`. Example:
```html
<div class="num" data-count="500" data-suffix="+">500+</div>
```

---

## Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | Plain HTML5 | No build step, universally deployable |
| Styling | Vanilla CSS (single file) | Full control, zero dependencies |
| Scripting | Vanilla JS (single file) | No framework overhead for a brochure site |
| Fonts | System font stack | Zero network requests, native rendering on Apple devices |
| Icons | Unicode emoji | No icon library needed |
| Hosting | Static (any CDN/host) | No server-side requirements |
| Version control | Git → GitHub | `gavinw2006/CC-3Wesolution` |

---

## Change History

### 2026-04-19 — Initial Commit (`5036b65`)
Full site built from scratch in a single session. All pages, styles, and scripts committed together.

**Pages created:**
- `index.html` — homepage with hero, 8-service grid, stats, testimonials
- `about.html` — company story with milestone timeline (2009–2021), 3×2 values grid, team, partners
- `contact.html` — enquiry form with mailto integration, FAQ accordion
- `services/digital-risk.html` — DRP page with Cyberoo.ai partnership, threat coverage, pricing
- 7 additional service pages (website-design, web-hosting, certificate, domain, email, social-media, digitalization)

**Design decisions made:**
- Adopted Apple.com aesthetic: system font stack, `#1d1d1f` / `#f5f5f7` / `#0071e3` palette, tiled card grids, dark CTA sections
- Removed gradient backgrounds and coloured card borders that were present in early drafts
- Pricing "featured" tier uses solid blue fill (Apple convention) rather than a border highlight
- CTA sections changed from blue gradient to solid dark `#1d1d1f`
- Nav logo: text-only `3W` (black) + `eSolution` (blue) — SVG icon mark explored then removed in favour of clean wordmark

**Content facts established:**
- Founded: 2009, Melbourne, Australia
- 15+ years experience, 350+ clients, 8,400+ threat takedowns
- Cyberoo.ai partnership: 5 years (since 2021)
- Business hours: AEST (UTC+10)
- Contact: 3wesolution@gmail.com
- Copyright: © 2026 3WeSolution

---

## Contact

**3wesolution@gmail.com**

© 2026 3WeSolution. All rights reserved.
