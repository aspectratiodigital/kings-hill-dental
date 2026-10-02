# Kings Hill Dental — website rebuild

Static site for a dental practice. Two generations exist on disk, but **only one is active**:

- `site-v2/` — the current, actively-developed redesign. **This is what you work on.**
- `_archive/`, `site/`, `build-wix/` — a frozen, Wix-faithful rebuild from an earlier phase. Kept on the original developer's machine for reference only; **not in this git repo** (see Repo scope below). Don't try to open or build these.

## Build pipeline

`site-v2/` is generated from templates, except CSS/JS which are hand-written and served as-is.

- **Templates → HTML**: `build-v2/pages-a.js`, `pages-b.js`, `pages-home.js`, `parts.js`, `about-intro-options.js` are required by `build-v2/build.js`, which writes every `site-v2/**/index.html`. After editing any of these `.js` files, run:
  ```
  node build-v2/build.js
  ```
- **CSS/JS are NOT templated.** Edit `site-v2/css/main.css`, `site-v2/css/home.css`, `site-v2/js/main.js` directly — no rebuild step, just reload the browser. (`home.css` despite its name is a sitewide stylesheet, loaded on every page *after* `main.css` — on tied specificity, `home.css` wins.)
- **Images**: raw source photos live in top-level folders (`Team/`, `KHD Stock/`, `Practice/`, `Home/`, `Partner Logos/`, `Icons/`, `Stock Assets/`, `External Stock/`). `build-v2/images.js` converts/resizes them into `site-v2/img/*.webp` via `sharp`. It auto-generates a `practice-*.webp` for every file in `Practice/` (slugified filename), plus an explicit job list for everything else. Run after adding/changing a source image:
  ```
  node build-v2/images.js
  ```

### First-time setup / fresh clone (e.g. a new cloud session after `git pull`)

`node_modules` are gitignored. Install before building or testing:
```
npm install --prefix _capture
npm install --prefix build-v2
```
`_capture/node_modules` provides `sharp` and `puppeteer-core`, used by `build-v2/images.js`, `crop-logos.js`, `vectors.js`. `build-v2/node_modules` provides `potrace`.

### Dev server

```
npx serve site-v2 -l 5174
```
or use the `khd-v2` entry in `.claude/launch.json` (Claude Code's Browser-pane preview). The `khd-site` entry in that same file points at `site/`, which isn't in this repo — ignore it.

### Regression tests

From `_capture/`, with the dev server running on :5174:
```
node v2c.js   # crawl: console errors, broken images, horizontal overflow at 1440px/390px
node v2t.js   # interaction tests: accordions, forms, mega menu, carousels, etc.
```
Known pre-existing failure that is **not** a regression: 2 placeholder-image flags on `/about/`. (`v2t.js` previously had a handful of failures here too — `plan toggle`, `quote next`, `team carousel next`, `gallery chip` — from stale selectors against removed UI; these were fixed or deleted and `v2t.js` now passes cleanly.) Only chase new failures beyond the one above.

## Repo scope (`.gitignore`)

This repo intentionally excludes:
- `_archive/`, `site/`, `build-wix/` — the old frozen rebuild (kept locally only, not needed going forward)
- `_old_concept_a/` — an abandoned early concept
- `_capture/*` except `package.json`, `package-lock.json`, `copy.json`, `acc-fees.json`, `v2c.js`, `v2t.js` — the rest is a 1GB+ scrape/debug dump from building the archived rebuild, not needed for `site-v2`
- `node_modules/`

`copy.json` and `acc-fees.json` (page copy and fee-table data) ARE required by `build-v2/pages-a.js` / `pages-b.js` at build time — don't remove them.

## Design system quick reference

- Colors: `--cream #fff6ec`, `--cream-2 #fbe9d9`, `--brown #461c11`, `--pink #e0a192`, `--blush #ffd0c5`, `--rose #bc7b69`, `--clay #905849`, `--umber`, `--coral`. Ink/line derived from brown.
- Fonts (self-hosted woff2 in `site-v2/fonts/`): `--serif` "KHD Serif" = Cormorant Garamond SemiBold (all headings/titles), `--sans` "KHD Body" = Lato (everything else), `--ui` is an alias of `--sans` (buttons/labels/nav).
- Easing: `--ease: cubic-bezier(.22, 1, .36, 1)` — use for anything site-authored (not browser defaults).
- Brand tone: warm and professional, cream/brown/pink palette, serif headings with occasional italic accents. Subtle interactive polish (reveal-on-scroll via `[data-reveal]`/`[data-split]`, accordions, hover underlines) rather than flashy motion.
- Shared components worth reusing before inventing new ones: `.acc` (accordion, supports multiple instances + `data-single`), `.timeline` (numbered vertical steps with scroll progress), `.checklist` (tick-list with draw-in SVG), `.choice`/`.check` (pill/checkbox inputs), `.cx-tabs` (sliding-pill tab bar, driven by `--w`/`--x` custom properties), `.tx-layout` + `asideCard()` (2-col treatment page layout with sticky booking card).

## Current status / open items

- **Mega menu** (Dentistry nav dropdown): reworked into a single card — dropdown A (categories) and B (active category's items) share one background/shadow/radius; hovering a category grows the card's width to reveal B ("wall sliding out"), and height follows whichever category is tallest. B is sized to its own content, not a fixed width. This took several iterations to get right — see git log for the reasoning if it needs further adjustment.
- **Three treatment-page design concepts** are built as *review drafts*, awaiting the client's feedback on which layout ideas to keep:
  - `/dentistry/general-preventative/dental-examinations/` — "The Visit Journey" (process rail + stat strip; real copy, no new claims)
  - `/dentistry/general-preventative/childrens-dentistry/` — "A Gentle Start" (new page; age-milestone tabs + reassurance icon grid)
  - `/dentistry/general-preventative/bruxism/` — "Recognise & Resolve" (new page; interactive symptom self-check + causes/treatment comparison)
  - Each has a small dashed-border "Design concept" callout (`.design-note` class) explaining the rationale — these are annotations for the client, not final copy, and should be stripped once a direction is picked.
  - **Children's Dentistry and Bruxism body copy beyond the original one-sentence blurb is draft text**, written to fill the layouts realistically — it has not had a clinical read-through and shouldn't ship as-is.
  - `/dentistry/general-preventative/hygiene-gum-health/` is the intentional design *baseline* — left untouched for comparison. Don't redesign it without being asked.

## Working conventions (from the person who's been building this)

- Verify UI changes visually (screenshots / real interaction) before reporting them fixed — this codebase has a long history of CSS specificity bugs where a fix looked right on paper but a pre-existing rule elsewhere (often in the *other* CSS file) silently won the cascade.
- When a `getComputedStyle` check taken immediately after a synthetic JS-triggered state change looks wrong (e.g. stuck at 0, or an animation that appears frozen), don't trust it blindly — this environment's automated browser tooling can report stale values for elements behind a `visibility:hidden` ancestor right after a change. Re-check with a real mouse hover + screenshot, or by artificially slowing the transition, before concluding there's a real bug.
- On Windows/Git Bash, redirecting to `nul` (e.g. `cmd > nul`) creates a literal file called `nul`, not the null device — if `git add`/`git status` chokes, check for and delete stray `nul` files.
- Prefer the Edit tool over inline shell one-liners for JS/regex edits — the shell mangles backslashes and `$`.
