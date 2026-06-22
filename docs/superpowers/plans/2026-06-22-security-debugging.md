# Security and Debugging Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove confirmed lint failure, harden public contact endpoint and external TFF asset handling, then verify production behavior.

**Architecture:** Keep current Next.js App Router structure. Move contact validation and local rate limiting into a small server utility tested with Node's built-in test runner; keep Resend call in route. Restrict scraped crest URLs at parsing boundary and add response security headers in Next config.

**Tech Stack:** Next.js 15.5.8, React 19, TypeScript 5, ESLint 8, Node test runner, Tailwind CSS 3.

## Global Constraints

- Preserve current UI and routing.
- Do not expose `RESEND_API_KEY`.
- Do not add runtime services or unnecessary dependencies.
- Keep Vercel-compatible server code.

---

### Task 1: Restore lint command

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `.npmrc`

- [ ] Pin `eslint-config-next` to `15.5.8`, matching `next`.
- [ ] Replace deprecated `next lint` script with `eslint .`.
- [ ] Reinstall dependency metadata and run `npm run lint`; expected exit code: `0`.

### Task 2: Contact endpoint validation and abuse controls

**Files:**
- Create: `src/lib/contact.ts`
- Create: `tests/contact.test.ts`
- Modify: `src/app/api/contact/route.ts`
- Modify: `src/components/Iletisim.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `validateContactPayload(value: unknown): ValidationResult`
- Produces: `ContactRateLimiter.check(key: string, now?: number): RateLimitResult`
- Consumes: validated `{ name, email, message }` in contact route.

- [ ] Write tests proving invalid types, oversized fields, control characters, honeypot input, and rate-window exhaustion are rejected.
- [ ] Run `npm test`; expected failure because utility does not exist.
- [ ] Implement validator and fixed-window limiter with bounded map cleanup.
- [ ] Enforce JSON content type, body byte limit, validation, and per-client request limit before Resend call.
- [ ] Add matching browser `maxLength`, `minLength`, and honeypot controls.
- [ ] Run `npm test`; expected all tests pass.

### Task 3: External asset boundary and security headers

**Files:**
- Modify: `src/lib/tff.ts`
- Create: `tests/tff.test.ts`
- Modify: `next.config.ts`
- Create: `tests/next-config.test.ts`

**Interfaces:**
- Produces: `normalizeTffCrestUrl(src: string): string | undefined`.

- [ ] Write tests proving only HTTPS `tffistanbul.org` image URLs pass.
- [ ] Write config test requiring CSP, anti-sniffing, frame, referrer, and permissions headers.
- [ ] Run `npm test`; expected failures for missing behavior.
- [ ] Apply host allowlist, fetch timeout/response-size guard, and security headers compatible with current Google Maps/fonts/TFF images.
- [ ] Run `npm test`; expected all tests pass.

### Task 4: Full verification

**Files:**
- Review all modified files and git diff.

- [ ] Run `npm audit --json`; expected zero known vulnerabilities.
- [ ] Run `npm test`; expected zero failures.
- [ ] Run `npm run lint`; expected zero errors.
- [ ] Run `npx tsc --noEmit`; expected exit code `0`.
- [ ] Run `npm run build`; expected exit code `0` without lint error.
- [ ] Inspect production headers and contact error responses locally.
