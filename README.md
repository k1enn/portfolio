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

Narrow single-column "cactus" shell (~720px). Home is one scroll: hero → experience
(work + education, newest first) → projects (cards, newest first) → recent writing →
tech → connect → footer. Sections alternate `--bg`/`--panel` for visual rhythm. Blog
lives on its own routes.

## Routes

- `/` — home (hero, experience, projects, recent writing, tech, connect, footer)
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

Footer, Connect, ExperienceFeed, TimelineEntry, ProjectsFeed, ProjectCard,
RecentWriting, PostCard, SectionHeading, Navbar — pure SSR. ExperienceFeed reuses
TimelineEntry (rail + dots, no images); ProjectsFeed renders uniform ProjectCard
items with a "Show more" toggle past 6.

## Design tokens (frozen)

Monochrome palette + DM Sans. One exception: `--font-code` (real monospace) for blog
code blocks only.

## Deploy

GitHub Pages via `dist/`. Domain `k1en.site` via `public/CNAME`.
