# Final Security and Debugging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden new TFF player scraping, close responsive/modal regressions, and prove production CSP remains strict.

**Architecture:** Keep existing App Router pages and Node test runner. Export parser boundaries for fixture tests, minimize public player data at parse time, and use source-faithful TFF names. Keep UI fixes local to Navbar and lightbox components.

**Tech Stack:** Next.js 15.5.19, React 19, TypeScript 5, Node test runner, Tailwind CSS 3.

## Global Constraints

- Preserve current routes and visual identity.
- Do not add dependencies.
- Production CSP must never include `unsafe-eval` or websocket wildcards.
- Public player output must not aggregate full birth dates or license numbers.

---

### Task 1: Player parser integrity and data minimization

**Files:**
- Create: `tests/players.test.mjs`
- Modify: `tests/run-tests.mjs`
- Modify: `src/lib/players.ts`
- Modify: `src/app/sporcular/page.tsx`

- [ ] Add fixture tests for TFF rows, hostile profile paths, seven-page pagination, foreign uppercase names, and birth-year extraction.
- [ ] Run `npm test`; expected failure because parser helpers are private and output exposes full identifiers.
- [ ] Export parser helpers, preserve source spelling, emit only `name`, `birthYear`, and allowlisted `profileUrl`, then deduplicate by profile URL.
- [ ] Update table to display name and birth year only.
- [ ] Run `npm test`; expected all player tests pass.

### Task 2: CSP fail-closed behavior

**Files:**
- Modify: `tests/next-config.test.mjs`
- Modify: `next.config.ts`

- [ ] Add environment-isolated tests: development includes `unsafe-eval`/`ws:`, production and unknown environments exclude both.
- [ ] Run `npm test`; expected unknown-environment assertion failure.
- [ ] Change development detection to exact `NODE_ENV === "development"`.
- [ ] Run `npm test`; expected all CSP tests pass.

### Task 3: Responsive navigation and modal lifecycle

**Files:**
- Modify: `tests/navbar.test.mjs`
- Create: `tests/lightbox.test.mjs`
- Modify: `tests/run-tests.mjs`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/PhotoLightbox.tsx`
- Modify: `src/components/VideoLightbox.tsx`

- [ ] Add regression tests requiring `xl` navigation breakpoint and modal body-scroll/focus lifecycle.
- [ ] Run `npm test`; expected targeted failures.
- [ ] Switch desktop navigation to `xl` and hamburger to `xl:hidden`.
- [ ] Lock body scrolling, focus close controls on open, and restore focus/scroll state on close in both lightboxes.
- [ ] Run `npm test`; expected all tests pass.

### Task 4: Full verification

**Files:**
- Review all modified files and final diff.

- [ ] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm audit --json`, and `npm run build`.
- [ ] Verify `/sporcular`, navigation breakpoints, gallery dialogs, media, console, and production headers in browser.
