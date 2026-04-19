# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS website for **3WeSolution** (3wesolution.com) — an AI-powered web services and Digital Risk Protection company based in Melbourne, Australia. No build tools, no framework, no package manager. Open any `.html` file directly in a browser to preview.

## Preview

```bash
open index.html                        # homepage
open about.html                        # about page
open contact.html                      # contact page
open services/digital-risk.html        # any service page
```

## File Structure & Architecture

```
/
├── index.html                  # Homepage
├── about.html                  # About page
├── contact.html                # Contact page (includes FAQ accordion + form)
├── css/style.css               # Single stylesheet — all pages share this
├── js/main.js                  # Single JS file — loaded by every page
├── images/
│   ├── logo.svg                # Full horizontal logo (icon + wordmark)
│   └── logo-mark.svg           # Icon-only (three-W mark)
└── services/                   # 8 service detail pages
    ├── website-design.html
    ├── web-hosting.html
    ├── certificate.html
    ├── domain.html
    ├── email.html
    ├── social-media.html
    ├── digitalization.html
    └── digital-risk.html       # Has substantial page-scoped <style> block
```

## CSS Architecture

`css/style.css` is the single source of truth for all visual design. Key design decisions:

- **Design language**: Apple.com aesthetic — pure white (`#ffffff`) / light gray (`#f5f5f7`) backgrounds, near-black (`#1d1d1f`) text, Apple blue (`#0071e3`), SF Pro font stack via `-apple-system`
- **CSS variables** defined in `:root` — always use these (`--bg`, `--bg-alt`, `--text`, `--text-muted`, `--blue`, `--border`, `--border-light`, `--r-sm/md/lg/xl`, `--t`, `--sh-sm/md/lg`)
- **Card pattern**: tiled grid — `gap: 2px; background: var(--border-light); border-radius: var(--r-xl); overflow: hidden` on the grid, cards inside have `background: var(--bg)` and `hover: var(--bg-alt)`. No individual card borders or box-shadows.
- **Sections**: `padding: 120px 0`, alternating `background: var(--bg)` and `.bg-secondary`
- **CTA sections**: always `background: #1d1d1f` (dark), never gradient

## JS Architecture

`js/main.js` runs one `DOMContentLoaded` handler providing:
- Mobile nav toggle (hamburger → X animation)
- Mobile dropdown accordion (`.nav-dropdown.open`)
- Scroll-reveal via `IntersectionObserver` on all card types
- Animated counters: `.num[data-count]` with `data-suffix` attribute
- Contact form submit handler (looks for `#contact-form`)

## Nav & Branding Rules

Every page nav follows this exact structure — **do not diverge**:
```html
<a class="nav-logo" href="[../]index.html">3W<span>eSolution</span></a>
```
- Root pages (`index.html`, `about.html`, `contact.html`): `href="index.html"`
- Service pages (`services/*.html`): `href="../index.html"`, assets at `../css/` and `../js/`
- Brand colours: **"3W"** = `#1d1d1f` (inherits), **"eSolution"** = `#0071e3` (via `<span>`)
- Footer copyright year: **2026**
- Business hours timezone: **AEST (UTC+10)**
- double check all the logos and icons, as well as the contents are consistent with the brand guidelines provided by the client. Ensure that the colors, fonts, and overall design align with the client's branding to maintain a cohesive and professional appearance across the website.
## Page-Level Conventions

- Service pages load `../css/style.css` and `../js/main.js`
- `digital-risk.html` contains a page-scoped `<style>` block for components not in the global CSS (`.partner-banner`, `.threat-grid`, `.threat-card`, `.process-steps`, `.experience-bar`). Add similar blocks for other one-off page components rather than polluting the global stylesheet.
- The `cn/` directory contains the full Chinese mirror (11 pages). All CN pages share the same `css/style.css` and `js/main.js` as the English version.

## Bilingual Design Consistency Rule

**The Chinese version must always match the English version's design exactly.** This is a hard rule:

- Never add, remove, or alter layout, colours, spacing, or components in `cn/` without making the identical change to the English counterpart, and vice versa.
- Both versions share one stylesheet (`css/style.css`) and one script (`js/main.js`) — do not create separate CN-only stylesheets.
- The only permitted CN-specific CSS is `body.cn { font-family: ... }` in `style.css` for the Chinese font stack (PingFang SC / Hiragino Sans GB / Microsoft YaHei).
- When a page-scoped `<style>` block is added to an English service page, copy the identical block to its CN counterpart.
- When content or structure changes in any English page, apply the equivalent change (translated) to the matching CN page in the same commit.

## Key Business Facts (for content accuracy)

- Founded: **2009**, Melbourne, Australia
- Experience: **15+ years** in web services and Digital Risk Protection
- Cyberoo.ai partnership: **5 years** (since 2021), for AI-driven scam detection
- Contact: **3wesolution@gmail.com**
- Services (8 total): Website Design, Web Hosting & Ops, Certificate Mgmt, Domain Mgmt, Email Mgmt, Social Media Mgmt, Digitalization, Digital Risk Protection
