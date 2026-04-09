# InterviewPrep — Project Context

## What This Is
A free, open-source interview revision platform for mid-to-senior software engineers. Built with Next.js 16 (App Router, static export), TypeScript, and Tailwind CSS 4. Dark theme only.

## Tech Stack
- **Framework**: Next.js 16 with `output: "export"` (fully static, no server)
- **Styling**: Tailwind CSS 4 (dark theme)
- **Deployment**: Vercel (free tier) or Docker (multi-stage: node builder → nginx)
- **State**: localStorage only (no backend, no auth, no database)

## Architecture

### Content Structure
Each topic lives in `content/{slug}/data.ts` and exports `topicData: TopicData`.

**10 topics**: python, javascript, nodejs, java, kubernetes, dsa, system-design, hld, lld, databases

Each topic contains:
- `mentalModel` — what/why/when/where-it-fails
- `categories[]` — groupings for concepts
- `mentalModelTree` — TreeNode hierarchy for visual knowledge tree
- `concepts[]` — the core content (287 total), each with:
  - `basic` / `expected` / `deep` — 3 depth levels
  - `interviewAnswer` — ready-to-speak answer
  - `trap` — common misconception
  - `memoryAnchor` — vivid analogy for memorization
- `interviewPatterns[]` (80 total), `commonMistakes[]` (119 total), `practiceQuestions[]`
- `lastHourConceptIds[]` — subset for compressed revision mode
- `lastHourSummary` — key takeaways, must-know concepts, top traps

### Key Components
- `TopicPageLayout` — main orchestrator (depth filter, section nav, back-to-top, scroll feedback)
- `ConceptCard` — renders concept with depth levels, memory anchor, interview answer, trap, review checkbox
- `KnowledgeTreeVisual` — interactive tree visualization
- `DepthFilter` — toolbar with depth, traps, last-1-hour toggles
- `GlobalSearch` — Cmd+K search across all 287 concepts
- `PracticeCard` — code challenge with reveal answer

### Search
`content/searchIndex.ts` builds a flat index from all 10 topics. `components/GlobalSearch.tsx` provides real-time search with ranked results on the home page.

### Adding a New Topic
1. Create `content/{slug}/data.ts` exporting `topicData: TopicData`
2. Create `app/topics/{slug}/page.tsx` and `TopicClient.tsx` (copy existing pattern)
3. Add to `topics[]` array in `app/page.tsx`
4. Add to `content/searchIndex.ts` imports
5. Update `public/sitemap.xml`
6. Update stats on home page if counts changed

## Features Implemented
- 3 depth levels (basic/expected/deep) with color-coded cards
- Memory anchors (vivid analogies) on every concept
- Interview answer toggle per concept
- Trap/misconception warnings
- Last 1 Hour compressed revision mode
- Knowledge tree visual navigation
- Global search (Cmd+K) across all concepts
- Progress tracking (localStorage checkboxes per concept)
- Back-to-top button, scroll feedback on tree click
- Print styles for cheatsheet printing
- SEO (favicon, OG image, robots.txt, sitemap.xml, meta tags)
- Accessibility (ARIA labels, focus-visible, touch targets, semantic HTML)
- Content freshness indicator (lastUpdated per topic)

## Content Quality Notes
- All content was accuracy-reviewed and corrected (JS typeof null attribution, Java finalize(), DSA radix sort, System Design Paxos dates, etc.)
- All `lastHourConceptIds` verified against actual concept IDs
- All category IDs verified as used by concepts
- Stats on home page are accurate counts from data files
