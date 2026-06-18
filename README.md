# JARVIS Platform

> Just A Really Very Intelligent System — an AI agent platform built for shipping work.

A production-grade landing page + interactive demo for the JARVIS agent platform. Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion. Deploys to Vercel in 60 seconds.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Build

```bash
npm run build        # → dist/
npm run preview      # preview the production build
```

## Deploy to Vercel

### One-click
Click the button below or visit [`vercel.com/new`](https://vercel.com/new) and import this repo:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/jarvis-platform)

### CLI
```bash
npm i -g vercel
vercel              # first deploy (preview)
vercel --prod       # promote to production
```

### Git integration
Push to `main` → Vercel auto-deploys.

## Stack

- **Vite 5** — fast dev server, ESM-native
- **React 18** + **TypeScript 5** — type-safe UI
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — animations
- **Lucide React** — icons (available, light-weight)
- **Vercel** — edge deployment

## Architecture

```
jarvis-platform/
├── public/                # static assets (favicon)
├── src/
│   ├── components/        # UI components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LiveDemo.tsx   # interactive scenario player
│   │   ├── Skills.tsx     # 64-skill catalog
│   │   ├── Architecture.tsx
│   │   ├── UseCases.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── data/              # content (skills, scenarios, architecture)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css          # design system + tokens
├── index.html
├── vercel.json            # deployment config
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Design System

- **Dark-first** aesthetic with electric cyan + plasma violet accents
- **Fluid type** scale using `clamp()` (12px → 128px)
- **4px spacing** scale via CSS custom properties
- **Glass-morphism** cards with backdrop blur
- **Subtle motion** — every transition is opinionated, nothing is gratuitous
- **WCAG AA** contrast in both themes
- **Reduced-motion** respected

## Customization

### Colors
Edit `src/index.css` `:root` block. Primary = cyan (188°), Accent = violet (265°).

### Content
- Skills: `src/data/skills.ts`
- Demo scenarios: `src/data/scenarios.ts`
- Architecture: `src/data/architecture.ts`

### Adding a page
Create a new component in `src/components/`, import in `src/App.tsx`.

## Performance

- **0 external runtime dependencies** beyond React + Framer Motion
- **CSS-only** effects — no JS scroll listeners
- **Lazy loaded** — Framer Motion features are tree-shaken
- **Static output** — serves from CDN, no origin server

## License

MIT
