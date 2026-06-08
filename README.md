# Portfolio — Astro

Migration of `portfolio-react` (CRA + Chakra UI) to Astro 5 + React islands.

## Stack

- Astro 5 (static site generation)
- React 18 islands for interactive components
- Framer Motion for animations
- React Icons for iconography
- Plain CSS (no UI framework) — design tokens via CSS variables

## Scripts

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/
npm run preview   # serve dist/
```

## Layout

Narrow single-column "cactus" shell (~720px). Home is one scroll: hero → combined
career timeline (work + education + projects, newest first) → recent writing → tech →
connect → footer. Blog lives on its own routes.

## Routes

- `/` — home (hero, timeline, recent writing, tech, connect, footer)
- `/blog` — all posts
- `/blog/[slug]` — a post
- `/tags/[tag]` — posts filtered by tag
- `/rss.xml` — RSS feed

## Structure

```
src/
  layouts/
    Layout.astro           shared head + global CSS
    BlogPost.astro         blog post layout (prose)
  pages/
    index.astro            home route
    blog/index.astro       post list
    blog/[...slug].astro   post pages
    tags/[tag].astro       tag pages
    rss.xml.js             RSS feed
  components/
    *.astro                pure static Astro components
    *.jsx                  React islands (client:load)
  content/blog/*.md        blog posts (content collection)
  content.config.ts        collection schema
  data/timeline.json       combined timeline entries
  data/technologies.json   tech list
  utils/slugify.ts         tag -> slug
  styles/                  global + prose stylesheets
```

## Islands (React, client:load)

Header, Technology — anything that uses `window`, scroll listeners, or mount-time state.

## Static Astro components

Footer, Connect, TimelineFeed, TimelineEntry, RecentWriting, PostCard, SectionHeading,
Navbar — pure SSR; timeline reveal via a small inline IntersectionObserver (visible by
default, reduced-motion safe).

## Design tokens (frozen)

Monochrome palette + DM Sans. One exception: `--font-code` (real monospace) for blog
code blocks only.

## Deploy

GitHub Pages via `dist/`. Domain `k1en.site` via `public/CNAME`.
