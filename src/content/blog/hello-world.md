---
title: "Hello, World"
description: "First post — why I rebuilt this site as a narrow column with a timeline and a blog."
publishDate: 2026-06-08
tags: ["Meta", "Astro"]
draft: false
---

This is a placeholder post so the blog has something to render. Swap it for the real thing.

## Why a timeline

A grid of project cards hides the *story*. A dated timeline shows what I worked on and
when — work, study, and side projects on one line, newest first.

## A code block

Syntax highlighting is wired through Shiki. Code blocks render in a fixed dark panel so
they read the same in light and dark mode:

```ts
function gradProgress(start: number, end: number): number {
  const elapsed = Date.now() - start;
  return Math.min(Math.max((elapsed / (end - start)) * 100, 0), 100);
}
```

Inline code like `const x = 1` uses the palette, not the dark panel.

> Keep it small. Ship it. Write about what you learn.

That's it for now.
