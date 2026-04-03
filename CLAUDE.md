# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test runner is configured yet.

## Architecture

This is a React 19 + Vite 8 SPA at an early stage (one commit past initial scaffold). The entry point is `src/main.jsx`, which mounts `src/App.jsx` into `#root`. Routing is available via `react-router-dom` (already installed) but not yet wired up.

- `src/App.jsx` — root component; currently the default Vite starter page
- `src/index.css` — global styles
- `src/App.css` — component-scoped styles for App
- `public/` — static assets served at `/` (favicon, SVG icon sprite)
- `src/assets/` — assets imported directly by components (processed by Vite)

The `@vitejs/plugin-react` plugin uses Oxc for transforms (not SWC).
