# Portfolio Website

A classic multi-page portfolio website built with plain HTML, CSS, and Vanilla JavaScript — structured as a teaching exercise.

## Run & Operate

- Preview runs automatically at `/` — see the **Portfolio Website** in the preview dropdown
- To restart: use the workflow panel or `restart_workflow artifacts/portfolio: web`

## Stack

- **HTML5** — semantic markup (nav, main, section, article, footer, aside)
- **CSS3** — custom properties, Flexbox, Grid, animations, media queries
- **Vanilla JavaScript** — DOM manipulation, localStorage, form validation
- **Vite** — dev server only (zero-framework, serves plain HTML files)

## Pages

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` | Home — hero, skills, featured projects |
| `about.html` | `/about.html` | About — bio, skill bars, timeline |
| `projects.html` | `/projects.html` | Projects — filterable card grid |
| `contact.html` | `/contact.html` | Contact — validated form + info sidebar |
| `dashboard.html` | `/dashboard.html` | Bonus dashboard — localStorage submissions table |

## Where things live

- `artifacts/portfolio/src/style.css` — all styles, with tutor comments explaining each section
- `artifacts/portfolio/src/script.js` — all JavaScript, with tutor comments explaining each concept
- `artifacts/portfolio/*.html` — one file per page

## Architecture decisions

- Single CSS file, single JS file — keeps the learning surface minimal and beginner-friendly
- CSS custom properties at the top of `style.css` act as the design token system
- JS uses `DOMContentLoaded` + guard checks so one file works safely on all pages
- localStorage is used for form submissions — no backend needed for the dashboard bonus
- `textContent` (not `innerHTML`) is used when rendering user data — prevents XSS

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The Vite config is intentionally simplified — no React, no Tailwind, just static HTML serving
- `src/main.tsx` and `src/App.tsx` are unused scaffolding left in place; they don't affect the app
