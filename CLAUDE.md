# Portfolio-front

Public portfolio of Axel Baldocchi (Maengdok), served at https://maengdok.fr. Audience: recruiters and potential freelance clients. Priorities, in order: content visible to search engines, clarity for non-technical readers, performance, then visual polish.

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4, plus one `style.css` per component (current state)
- TanStack Query and TanStack Form
- Docker (dev: `docker/Dockerfile`, prod: `docker/prod.Dockerfile`), behind Traefik

## Commands

```bash
npm run dev      # dev server on :3000
npm run lint     # ESLint (next core-web-vitals + typescript)
npm run build    # production build — must pass before any PR
docker compose up -d   # dev in Docker, exposed on ${PORT:-3998}; needs the external `portfolio` network
```

## Structure

```
src/
├── app/                 layout, page, providers, hooks, utils (normalizers, observers)
├── component/
│   ├── layout/<name>/   index.tsx + style.css (body, sidePanel, projectList, projectDetails, resume…)
│   └── ui/<name>/       reusable pieces (card, icon, locale)
├── i18n/                i18nContext + locales/{fr,en,ko}.json
├── service/             API calls (apiRequest, api/*.api.ts)
└── types/               api/*.type.ts mirror the back-end responses
```

Import alias: `@/*` → `src/*`.

## Current state and target

The site is being migrated (plan, phase 2). Today everything renders client-side and navigation is React state on a single route, so search engines see almost nothing. Target:

- Routes per locale: `/[locale]`, `/[locale]/projets/[slug]`, `/[locale]/cv`.
- Public data fetched in **Server Components** from the back-end over a dedicated Docker network shared only by the front and the back (never the shared `portfolio` network), cached with `revalidate` and tags. React Query stays only for interactive client features.
- Metadata, `robots.ts`, `sitemap.ts`, JSON-LD and OG images generated per page.

Until the migration is done, **do not add new client-side fetching for public content**. New pages go into the target structure.

## Design direction

"Carnet de campagne": the site reads like a tabletop RPG rulebook set with the rigour of a CV. Game vocabulary stays in small labels; headings and content stay professional.

- Colours: paper `#f4f1e9` (background), ink `#1c1b18` (text), one accent vermilion `#a93b27`, muted text `#5a5548`, rules `#d9d2c1`.
- Type: Spectral (headings and body), IBM Plex Mono (labels, metadata), Nanum Myeongjo (Korean touches only).
- Signature components: form-style `Field` (value above a rule, small label below), `SectionHeader` (roman numeral, title, italic subtitle, Korean word), `SkillMeter` (three diamonds, never text glyphs).
- `/fiche` is the full character sheet (bonus page): `character.json` tab, "Lancer 1d4", print view; reachable from the hero, the ⌘K palette and easter eggs (Konami code, typing "roll").
- Never: gradients, glassmorphism, emoji, parchment textures, medieval fonts, invented numbers.
- Every screen is designed mobile-first as well (390 px wide).

## Conventions

- Components: function components, named with PascalCase, one folder per component with `index.tsx`.
- New styling uses Tailwind with the design tokens defined in `@theme` (phase 3). Do not add new global CSS or hard-coded colours.
- Types for API responses live in `src/types/api/` and must match the back-end contract (OpenAPI once P9.4 is done).
- Every visible string goes through i18n. When you add a key, add it to **fr, en and ko** in the same commit; if you cannot translate Korean confidently, copy the English text and flag it in the PR.
- Accessibility is required: semantic HTML, alt text, visible focus, keyboard navigation.
- Analytics events are sent only through `track()` from `@maengdok/telemetry` (phase 4), never by calling Umami directly.

## Security and privacy (GDPR)

- Fonts are self-hosted with `next/font`; never load Google Fonts or any third-party font/CDN at runtime.
- No third-party script, iframe or embed without an explicit task (and consent handling when it sets cookies).
- A strict Content-Security-Policy with a per-request nonce is planned: never add inline `<script>` or inline event handlers that would need `unsafe-inline`.
- Forms that collect personal data show a short information notice next to the submit button and collect the minimum (name, email, message).

## Environment

- `NEXT_PUBLIC_BACK_END_URL`: current back-end URL (client-side). To be replaced by a server-only `BACKEND_INTERNAL_URL` during phase 2.
- Never commit `.env`; keep the example env file (`.env.sample` or `.env.example`, whichever the repo uses) up to date.

## Operations

- Deploy with the production compose file only. Never tear down the production stack.
- Deploy and rollback procedures are in the private ops handbook: follow it, and update it in the same pull request when a change affects operations.

## Definition of done

1. `npm run lint` and `npm run build` pass.
2. Every acceptance criterion in the task file is checked, with the command or URL used.
3. Pages touched still render with JavaScript disabled (content present in the HTML).
4. No change to `docker-compose.prod.yaml` or Traefik labels unless the task asks for it.
