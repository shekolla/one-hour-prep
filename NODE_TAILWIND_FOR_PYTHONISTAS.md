# Node.js & Tailwind CSS — A Guide for Senior Python Engineers

> You know Python deeply. This doc maps every unfamiliar concept to something you already understand.
> Project context: this is a **Next.js 16 + Tailwind CSS 4 + TypeScript** app.

---

## Table of Contents

1. [Node.js — The Runtime](#1-nodejs--the-runtime)
2. [npm — The Package Manager](#2-npm--the-package-manager)
3. [package.json — The pyproject.toml / requirements.txt](#3-packagejson--the-pyprojecttoml--requirementstxt)
4. [TypeScript — Python with Type Hints, but enforced](#4-typescript--python-with-type-hints-but-enforced)
5. [Next.js — The Framework](#5-nextjs--the-framework)
6. [React — The UI Library](#6-react--the-ui-library)
7. [Tailwind CSS — Styling via Class Names](#7-tailwind-css--styling-via-class-names)
8. [How This Project Is Structured](#8-how-this-project-is-structured)
9. [Day-to-Day Commands Cheatsheet](#9-day-to-day-commands-cheatsheet)

---

## 1. Node.js — The Runtime

### Python analogy
Python code runs in the CPython interpreter. JavaScript was originally browser-only. **Node.js is V8 (Chrome's JS engine) extracted and packaged so JS runs on your server/machine** — the same role CPython plays for Python.

```
Python:   your_script.py  →  CPython interpreter  →  runs
JS/TS:    your_script.ts  →  Node.js (+ tsc)       →  runs
```

### Key differences from Python
| Concept | Python | Node.js |
|---|---|---|
| Concurrency model | threads / asyncio (event loop optional) | **single-threaded event loop, always** — no GIL because there's only one thread |
| I/O style | `async def` / `await` optional | callbacks / Promises / `async-await` — I/O is *always* non-blocking |
| Entry point | `if __name__ == "__main__":` | just runs the file top-to-bottom |
| Global scope | module-level variables | `global` object (in browsers: `window`) |

### The event loop (critical mental model)
Think of it like Python's `asyncio` but **you have no choice** — everything is async. There is no `time.sleep()`. You use `setTimeout` / Promises instead. Next.js abstracts most of this away so you rarely think about it directly.

---

## 2. npm — The Package Manager

### Python analogy
| Python | Node / npm |
|---|---|
| `pip` | `npm` |
| `pip install requests` | `npm install axios` |
| `pip install -e .` (editable) | `npm install` (installs everything in `package.json`) |
| `pip install --dev pytest` | `npm install --save-dev jest` |
| `venv/` | `node_modules/` |
| `pip freeze > requirements.txt` | auto-written into `package.json` + `package-lock.json` |

### node_modules is your venv
`node_modules/` is the equivalent of a virtualenv. It lives inside the project. **Never commit it.** Run `npm install` to recreate it from `package.json`, just like `pip install -r requirements.txt`.

```bash
# equivalent workflows
pip install -r requirements.txt   →   npm install
pip install requests              →   npm install axios
pip install --upgrade requests    →   npm update axios
pip uninstall requests            →   npm uninstall axios
```

---

## 3. package.json — The pyproject.toml / requirements.txt

```json
{
  "name": "interview-prep",
  "scripts": {
    "dev": "next dev",       // like a Makefile target
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {          // like install_requires in pyproject.toml
    "next": "^16.2.1",       // ^ means "compatible with 16.x"
    "react": "^19.0.0"
  },
  "devDependencies": {       // like [dev-dependencies] — not shipped to prod
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### Version specifiers
```
^16.2.1   →  >=16.2.1 <17.0.0   (like ~=16.2 in pip)
~16.2.1   →  >=16.2.1 <16.3.0   (patch updates only)
16.2.1    →  exactly this version (like ==16.2.1 in pip)
```

### Scripts
`"scripts"` is a built-in task runner. You run them with `npm run <name>`:
```bash
npm run dev    # starts local dev server with hot-reload
npm run build  # production build
npm run start  # serve the production build
```
Think of it as a `Makefile` or `invoke` tasks embedded in JSON.

### package-lock.json
Equivalent to `pip freeze` output or `poetry.lock`. It pins **exact** transitive dependency versions. Commit it. Do not hand-edit it.

---

## 4. TypeScript — Python with Type Hints, but enforced

TypeScript (`.ts`, `.tsx`) is JavaScript with a compile-time type system. Think of Python type hints (`mypy`) but:
- **Mandatory** — the code won't compile if types are wrong
- **Erased at runtime** — like Python's hints, the output JS has no types

### Syntax mapping

```typescript
// TypeScript
interface Concept {
  id: string;
  title: string;
  basic: string;
  depth: "basic" | "expected" | "deep";  // literal union type
}

function greet(name: string): string {
  return `Hello ${name}`;
}
```

```python
# Python equivalent
from typing import Literal
from dataclasses import dataclass

@dataclass
class Concept:
    id: str
    title: str
    basic: str
    depth: Literal["basic", "expected", "deep"]

def greet(name: str) -> str:
    return f"Hello {name}"
```

### `.tsx` files
`.tsx` = TypeScript + JSX (HTML-like syntax inside JS). Think of it as a template language baked directly into the language — like Jinja2 but it's just Python/JS with angle brackets mixed in.

---

## 5. Next.js — The Framework

### Python analogy
Next.js is to React what **Django is to Python** — it adds routing, server-side rendering, build tooling, and conventions on top of the raw library.

| Django | Next.js |
|---|---|
| `urls.py` routing | **File-system routing** — the file path IS the URL |
| `views.py` | Page components in `app/` |
| `templates/` | JSX returned by components |
| `manage.py runserver` | `npm run dev` |
| `manage.py collectstatic` | `npm run build` |
| Middleware | `middleware.ts` |

### File-system routing (the big idea)
```
app/page.tsx                  →  GET /
app/topics/python/page.tsx    →  GET /topics/python
app/topics/kubernetes/page.tsx→  GET /topics/kubernetes
app/[slug]/page.tsx           →  GET /anything  (dynamic, like Django <str:slug>)
```
No `urls.py`. The directory structure *is* the URL map.

### Server vs Client components
Next.js 13+ introduced a split:

| | Server Component (default) | Client Component (`"use client"` at top) |
|---|---|---|
| Runs on | Server only | Browser (and server for initial render) |
| Can use | databases, secrets, filesystem | `useState`, `useEffect`, browser APIs |
| Python analogy | Django view / template | React SPA code |

```tsx
// Server component — no "use client" — like a Django view
export default async function Page() {
  const data = await fetch("https://api.example.com/data");  // runs on server
  return <div>{data.title}</div>;
}
```

```tsx
"use client";  // signals: this runs in the browser

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);  // browser state
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### `layout.tsx` — the base template
```tsx
// app/layout.tsx — wraps ALL pages, like Django's base.html
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>  {/* children = the specific page */}
    </html>
  );
}
```

---

## 6. React — The UI Library

### The core concept: components are functions
Every UI piece is a function that receives data (`props`) and returns HTML-like JSX.

```tsx
// Python mental model: a function that returns an HTML string
// React reality: a function that returns a virtual DOM node

function ConceptCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Usage — looks like HTML but it's JS
<ConceptCard title="GIL" description="Global Interpreter Lock" />
```

### `useState` — mutable local state
```tsx
// React
const [isOpen, setIsOpen] = useState(false);
setIsOpen(true);  // triggers re-render (like a reactive variable)

// Python analogy: instance variable that, when mutated, re-renders the template
self.is_open = True  # if Django auto-refreshed the template on mutation
```

### JSX rules (common gotchas)
```tsx
// "class" is reserved in JS → use "className"
<div className="text-white">           // NOT class="text-white"

// Self-closing tags mandatory
<img src="..." />                       // NOT <img src="...">

// Curly braces = Python's {{ }} in Jinja
<p>{variable}</p>                       // like {{ variable }} in Jinja2

// Conditional rendering
{isLoggedIn && <Dashboard />}           // like {% if is_logged_in %} in Jinja
{isLoggedIn ? <Dashboard /> : <Login />}
```

---

## 7. Tailwind CSS — Styling via Class Names

### The core idea
Traditional CSS: you write `.card { background: #111; padding: 24px; }` in a `.css` file.
Tailwind: **you apply pre-built single-purpose classes directly in HTML/JSX**. No separate CSS file needed.

```tsx
// Without Tailwind — you'd write CSS elsewhere
<div class="card">...</div>

// With Tailwind — CSS lives in the class names
<div className="bg-gray-900 rounded-xl p-6 border border-gray-800">...</div>
```

Think of it as **inline styles but with a design system built in** — spacing, colors, typography are all on a consistent scale.

### Reading Tailwind classes (the pattern)
Classes follow `property-value` or `property-scale` conventions:

```
bg-gray-900     →  background-color: rgb(17 24 39)       (gray, shade 900)
text-white      →  color: white
text-sm         →  font-size: 0.875rem
font-semibold   →  font-weight: 600
p-6             →  padding: 1.5rem  (scale: 1 unit = 0.25rem)
px-4            →  padding-left + padding-right: 1rem
py-2            →  padding-top + padding-bottom: 0.5rem
m-4             →  margin: 1rem
mt-2            →  margin-top: 0.5rem
rounded-xl      →  border-radius: 0.75rem
border          →  border-width: 1px
border-gray-800 →  border-color: rgb(31 41 55)
flex            →  display: flex
items-center    →  align-items: center
gap-2           →  gap: 0.5rem
space-y-4       →  margin between vertical children: 1rem
w-full          →  width: 100%
min-h-screen    →  min-height: 100vh
hidden          →  display: none
```

### Responsive prefixes
```tsx
<div className="text-sm md:text-base lg:text-lg">
//                      ^           ^
//              ≥768px wide   ≥1024px wide
```
Like CSS media queries but inline. `sm:`, `md:`, `lg:`, `xl:`.

### State prefixes
```tsx
<button className="bg-indigo-600 hover:bg-indigo-500 transition-colors">
//                              ^--- applies only on hover
```
Like CSS `:hover` pseudo-class. Others: `focus:`, `active:`, `disabled:`.

### Opacity modifier (used heavily in this project)
```tsx
className="bg-green-500/10"   // bg-green-500 at 10% opacity
className="border-green-500/30" // border at 30% opacity
```

### The `/` modifier syntax (Tailwind v4)
This project uses Tailwind v4 which is imported as:
```css
/* app/globals.css */
@import "tailwindcss";
```
That single line replaces the old `tailwind.config.js` + `@tailwind base/components/utilities` setup.

### Dark theme in this project
The layout sets `bg-gray-950 text-gray-100` on `<body>` — so the whole app is dark by default. Individual components layer on top of this.

### Real example from this project
```tsx
// components/ConceptCard.tsx — annotated
<div
  className={`
    bg-gray-900          // dark card background
    rounded-xl           // rounded corners
    p-6                  // padding all sides
    space-y-4            // vertical gap between children
    border               // 1px border
    transition-all       // animate all property changes
    ${highlighted
      ? "border-indigo-500/50 ring-1 ring-indigo-500/20"  // highlighted state
      : "border-gray-800"                                   // default state
    }
  `}
>
```

The template literal `` `...${condition ? "a" : "b"}` `` is just JavaScript string interpolation — like Python's f-strings — used to conditionally apply classes.

---

## 8. How This Project Is Structured

```
interview-prep/
├── app/                        # Next.js App Router (routes live here)
│   ├── layout.tsx              # Base template wrapping all pages
│   ├── page.tsx                # Homepage  →  GET /
│   ├── globals.css             # Global CSS (just imports Tailwind)
│   └── topics/
│       ├── python/
│       │   ├── page.tsx        # Server component  →  GET /topics/python
│       │   └── TopicClient.tsx # Client component (uses useState)
│       └── kubernetes/
│           ├── page.tsx
│           └── TopicClient.tsx
├── components/                 # Reusable UI pieces (like Django template tags)
│   ├── ConceptCard.tsx
│   ├── DepthFilter.tsx
│   ├── MentalModelTree.tsx
│   ├── PracticeCard.tsx
│   └── TopicPageLayout.tsx
├── content/                    # Data files (like Django fixtures or seed data)
├── package.json                # Deps + scripts (pyproject.toml equivalent)
├── package-lock.json           # Exact locked versions (poetry.lock equivalent)
├── tsconfig.json               # TypeScript compiler config
├── next.config.ts              # Next.js config (like Django settings.py)
└── node_modules/               # Installed packages (venv equivalent — gitignored)
```

### Data flow (Python analogy)
```
Python/Django:         View  →  Template context  →  HTML rendered
Next.js (server):      page.tsx fetches data  →  passes as props  →  components render JSX
Next.js (client):      useState holds state   →  event triggers setState  →  React re-renders
```

---

## 9. Day-to-Day Commands Cheatsheet

```bash
# Start dev server (hot-reload — like flask --debug or uvicorn --reload)
npm run dev

# Install all dependencies after clone (like pip install -r requirements.txt)
npm install

# Add a new package (like pip install requests)
npm install <package-name>

# Add a dev-only package (like pip install --dev pytest)
npm install --save-dev <package-name>

# Production build (compiles TypeScript, bundles JS, optimises assets)
npm run build

# Serve the production build locally
npm run start

# Check TypeScript errors without building
npx tsc --noEmit
```

### Path alias `@/`
Throughout the code you'll see imports like:
```tsx
import type { Concept } from "@/content/python/data";
```
`@/` is an alias for the project root, configured in `tsconfig.json`. It's equivalent to adding your project root to `PYTHONPATH` so you can do `from content.python.data import Concept`.

---

## Quick Reference: Python → JS/TS Syntax

| Python | TypeScript |
|---|---|
| `f"Hello {name}"` | `` `Hello ${name}` `` |
| `[x for x in items if x.ok]` | `items.filter(x => x.ok)` |
| `[f(x) for x in items]` | `items.map(x => f(x))` |
| `dict.get("key", default)` | `obj?.key ?? default` |
| `None` | `null` / `undefined` |
| `True` / `False` | `true` / `false` |
| `def fn(x: int) -> str:` | `function fn(x: number): string` |
| `lambda x: x * 2` | `x => x * 2` |
| `**kwargs` | `...rest` or object spread `{...obj}` |
| `@dataclass` | `interface` or `type` |
| `Optional[str]` | `string \| undefined` |
| `Union[str, int]` | `string \| number` |
