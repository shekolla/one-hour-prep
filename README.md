# InterviewPrep

> Revise any tech topic in under 1 hour. High-signal content for mid to senior engineers.

A fast, static revision platform built for engineers cramming before technical interviews. No login, no fluff — just structured content designed for rapid recall.

**10 topics. 250+ concepts. Depth levels. Knowledge trees. A compressed "Last 1 Hour" cheatsheet mode.**

---

## Topics

| Topic | Concepts | Level | Tag |
|---|---|---|---|
| Python | 25 | Mid–Senior | Backend |
| JavaScript | 28 | Mid–Senior | Frontend / Fullstack |
| Node.js | 29 | Mid–Senior | Backend |
| Java | 25 | Mid–Senior | Backend |
| Kubernetes & Docker | — | Mid–Senior | DevOps |
| DSA | 29 | Mid–Senior | Coding Interview |
| System Design | 32 | Senior | Architecture |
| High-Level Design | 31 | Senior | Architecture |
| Low-Level Design | 24 | Mid–Senior | OOP / Patterns |
| Databases | 29 | Mid–Senior | Data |

---

## Features

- **Depth Levels** — Basic (green), Expected (yellow), Deep (red). Filter to your comfort level.
- **Interview Answer Mode** — Toggle to see a ready-made answer for each concept.
- **Trap Mode** — Reveal common interview traps and gotchas per concept.
- **Knowledge Tree** — Visual diagram of every concept organized by category with importance levels.
- **Last 1 Hour Mode** — Compressed cheatsheet with key takeaways, must-know one-liners, and top traps.
- **Practice Questions** — Code scenarios with toggleable answers.
- **Interview Patterns** — Real interview questions with model answers, "why asked" context, and traps.
- **Common Mistakes** — Wrong vs correct pairs for quick review.

---

## Running locally

### With Node.js

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static export to ./out)
```

Node 20+ required.

### With Docker

```bash
# Development (hot reload)
docker compose up dev          # http://localhost:3000

# Production (nginx)
docker compose up prod         # http://localhost:8080

# Static export (writes to ./out)
docker compose run --rm export
```

---

## Project structure

```
interview-prep/
├── app/
│   ├── layout.tsx                    # Root layout, Inter font, dark theme, SEO
│   ├── page.tsx                      # Home — topic listing with stats
│   └── topics/
│       └── <topic>/
│           ├── page.tsx              # Server component with SEO metadata
│           └── TopicClient.tsx       # Client component, spreads topicData
├── components/
│   ├── ConceptCard.tsx               # Concept with depth levels, interview answer, traps
│   ├── DepthFilter.tsx               # Depth toggle + Trap Mode + Last 1 Hour Mode
│   ├── KnowledgeTreeVisual.tsx       # Visual tree diagram with category cards
│   └── PracticeCard.tsx              # Code snippet with toggleable answer
├── content/
│   ├── types.ts                      # Shared TypeScript interfaces
│   └── <topic>/
│       └── data.ts                   # All topic content as typed data
├── Dockerfile                        # Multi-stage: node builder -> nginx
├── docker-compose.yml                # dev, prod, export services
└── next.config.ts                    # Static export config
```

---

## Content model

Each topic lives in `content/<topic>/data.ts` and exports `topicData: TopicData` containing:

| Field | Type | Description |
|---|---|---|
| `mentalModel` | `MentalModel` | What it is, why it exists, when to use, where it fails |
| `categories` | `CategoryMeta[]` | Topic area groupings with descriptions |
| `mentalModelTree` | `TreeNode` | Hierarchical knowledge tree for visual diagram |
| `concepts` | `Concept[]` | Core concepts with basic/expected/deep/interviewAnswer/trap |
| `interviewPatterns` | `InterviewPattern[]` | Q&A with model answer, why asked, and trap |
| `commonMistakes` | `CommonMistake[]` | Wrong / correct pairs |
| `practiceQuestions` | `PracticeQuestion[]` | Code scenario + toggleable answer |
| `lastHourSummary` | `LastHourSummary` | Key takeaways, must-know one-liners, top traps |
| `lastHourConceptIds` | `string[]` | IDs of highest-signal concepts for Last 1 Hour mode |

### Adding a new topic

1. Create `content/<topic>/data.ts` — export `topicData: TopicData` following the types in `content/types.ts`
2. Create `app/topics/<topic>/page.tsx` (server, SEO metadata) + `TopicClient.tsx` (client, `<TopicPageLayout {...topicData} />`)
3. Add the topic to the `topics` array in `app/page.tsx`
4. Update the stats bar count on the home page

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static export, great SEO |
| Styling | Tailwind CSS v4 | Zero runtime, fast iteration |
| Language | TypeScript | Content is typed, no runtime surprises |
| Content | Static `.ts` files | No database, no cost, version-controlled |
| Deployment | Docker (nginx) or any static host | `output: "export"` produces plain HTML/CSS/JS |

---

## Deployment

### Static export (any host)

```bash
npm run build    # or: docker compose run --rm export
# Upload the ./out directory to any static host (S3, Cloudflare Pages, Netlify, etc.)
```

### Docker

```bash
docker compose up prod    # nginx on port 8080
```

### Vercel

```bash
vercel --prod
```

All pages are pre-rendered as static HTML at build time — no server required.
