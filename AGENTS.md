# Agent Context — InterviewPrep

This file helps AI agents (Claude Code, Cursor, Copilot, etc.) resume work on this project without needing a full conversation recap.

---

## What this project is

An interview revision platform for mid-to-senior engineers. Each topic is structured for 30–60 minute pre-interview revision. The product spec lives at `product.md`.

**Core UX idea:** Engineers visit this the night before or day of an interview. They need fast recall, not learning. Every design decision flows from that.

---

## Current state (as of last session)

### Done
- [x] Home page (`app/page.tsx`) — topic list with mode badges and tagline
- [x] Python topic page (`app/topics/python/`) — full content, client-side interactivity
- [x] `ConceptCard` — renders Basic / Expected / Deep depth levels + Interview Answer toggle + Trap + highlighted prop
- [x] `DepthFilter` — depth level switcher, Trap Mode toggle, Last 1 Hour Mode toggle
- [x] `PracticeCard` — code snippet with Show/Hide answer
- [x] `MentalModelTree` (`components/MentalModelTree.tsx`) — interactive collapsible tree, click concept to jump & highlight its card
- [x] Python content (`content/python/data.ts`) — **21 concepts across 7 categories**, 8 interview patterns, 10 mistakes, 8 practice Qs
- [x] Concept categories: Execution Model, Memory Model, Functions, OOP & Data Model, Concurrency, Data Structures, Protocols & Types
- [x] Concept Map section added between Mental Model and Core Concepts
- [x] Core Concepts now grouped by category with headers
- [x] **Kubernetes & Docker topic** (`app/topics/kubernetes/`) — 22 concepts across 8 categories, 8 interview patterns, 12 mistakes, 8 practice Qs
- [x] K8s categories: Container Fundamentals, Docker Images, Docker Runtime, K8s Architecture, Workloads, Networking, Storage & Config, Scheduling & Security
- [x] Shared `content/types.ts` — all common interfaces (Concept, CategoryMeta, TreeNode, TopicData, etc.)
- [x] Shared `components/TopicPageLayout.tsx` — one layout component used by all topics
- [x] Python topic refactored to use `TopicPageLayout` — `TopicClient.tsx` is now a thin wrapper
- [x] Build passes, all 4 pages fully static (SSG): /, /topics/python, /topics/kubernetes
- [x] Dev server runs on `http://localhost:3000`

### Not started yet (next priorities in order)
- [ ] **System Design Basics topic** — `content/system-design/data.ts` + new topic pages (same structure)
- [ ] **Confidence Tracker** — per-concept "Known / Unsure / Unknown" toggle, persisted in localStorage
- [ ] **Cheat Sheet section** — dense one-page summary per topic, printable
- [ ] **Search** — keyword search across concepts within a topic (client-side, no backend needed)
- [ ] **URL-shareable sections** — deep link to specific section/concept via hash or query param
- [ ] **Progress indicator** — "you've read X/6 sections" per topic
- [ ] **Vercel deployment** — first production deploy

---

## How to add a new topic

1. Create `content/<topic>/data.ts` — copy `content/python/data.ts`, replace all content
2. Create `app/topics/<topic>/page.tsx` — copy Python's, update metadata
3. Create `app/topics/<topic>/TopicClient.tsx` — copy Python's, update imports
4. Add entry to `topics` array in `app/page.tsx` with `available: true`

The `TopicClient` component is intentionally not generic/shared yet — each topic may diverge in structure. Generalize only when 2+ topics exist and patterns are clear.

---

## Architecture decisions (don't undo without reason)

- **Content as TypeScript files** — no CMS, no database, no cost. Content lives in `content/<topic>/data.ts`. All fields are typed. This was an explicit choice for Phase 1.
- **Static generation (SSG)** — all pages pre-render at build time. No API routes, no server. Required for Vercel free tier and fast load times.
- **Interactivity is client components** — `TopicClient.tsx` is `"use client"` so depth/trap/mode toggles work. The page wrapper stays server-only to export metadata.
- **Shared `TopicPageLayout` component** — `components/TopicPageLayout.tsx` accepts a `TopicData` object and renders all sections. Each topic's `TopicClient.tsx` is a thin wrapper that imports its data and passes it to the layout. Add new topics by creating `content/<topic>/data.ts` + thin `TopicClient.tsx` + `page.tsx`.
- **Tailwind v4** — uses `@import "tailwindcss"` in globals.css and `@tailwindcss/postcss` plugin. No `tailwind.config.js` needed.

---

## Running the project

```bash
# Requires Node 20+
export PATH="/home/shekolla/.local/share/fnm:$PATH"
eval "$(fnm env --shell bash)"
fnm use 20

cd /home/shekolla/product/one_hour/interview-prep
npm install
npm run dev     # http://localhost:3000
npm run build   # verify static build passes
```

---

## Content quality bar

The product lives or dies on content quality. When writing or reviewing content:
- Every "Deep" entry must explain *why* a behavior exists, not just *what* it is
- Every "Trap" must be a real misconception engineers actually hold — not an obvious one
- "Interview Answer" must be speakable in ~30 seconds, first-person, confident tone
- No filler, no intros, no "Great question!" — pure signal

---

## Tone / UX principles (don't drift from these)

- Dark theme (`bg-gray-950` base) — non-negotiable, engineers read at night
- No long paragraphs in UI — everything bullets or short sentences
- Green = basic, Yellow = expected, Red = deep (consistent color language throughout)
- Indigo = interactive / interview-focused (interview answer cards, active states)
- Orange = warnings / traps
