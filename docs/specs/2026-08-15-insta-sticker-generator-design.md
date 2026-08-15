# Insta Sticker Generator — Design

**Date:** 2026-08-15
**Status:** Approved for planning

## Purpose

A small, local (localhost) web app for creating personalized Instagram stickers.
The user types a caption, picks a font, tweaks sizes and colors, and gets a
self-contained SVG. The SVG is intended to be **cut on a single-color vinyl
sticker plotter**, and/or shared as SVG code so someone else can see the exact
design without having the fonts installed.

Personal, private, hobby project. Lives in its own standalone repo.

## Non-Goals (YAGNI)

- No backend / server-side logic — purely client-side.
- No accounts, persistence, or sharing service.
- No multi-color / gradient output (the plotter is single-color).
- No PNG/raster export (plotter needs vectors; SVG is the deliverable).
- No routing/SSR (hence plain Vite + Svelte, not SvelteKit).

## Stack

- **Vite + Svelte** (single-page, client-only). Plain Vite + Svelte, without the
  SvelteKit overhead.
- **opentype.js** — parse bundled fonts and convert the caption text to vector
  outlines at export time.
- **Fonts bundled locally** as `.woff2`/`.ttf` in the repo — offline-capable,
  no external network requests.

## Layout

Two columns:

- **Left — Controls panel**
- **Right — Live preview** rendered on a checkerboard (transparency) background
  so the transparent sticker is obvious.

Responsive enough for a laptop; mobile polish is not a goal.

## Controls

| Control            | Type          | Notes                                             |
|--------------------|---------------|---------------------------------------------------|
| Caption text       | text input    | The sticker text.                                 |
| Font               | select (5)    | Poppins, Bebas Neue, Pacifico, Caveat, Montserrat |
| Font size          | slider        | Text height in SVG units.                         |
| Logo size          | slider        | Instagram glyph size, independent of text.        |
| Text color         | color picker  | For screen preview; export stays single-fill.     |
| Logo color         | color picker  | Same.                                             |
| Logo↔text gap      | slider        | Horizontal spacing.                               |
| Background         | toggle+picker | Transparent (default) or solid color.             |

Single "sticker color" is the common case for the plotter; the two color
pickers default to the same value but can differ for on-screen previews.

## Sticker Composition

- One horizontal row: **Instagram camera glyph** (left) + **caption text**
  (right), vertically centered.
- The glyph is a hand-rebuilt SVG path set (rounded-square outline, inner
  circle, corner dot) — no copyrighted asset committed; recognizable camera
  mark only, for private use.
- The SVG `viewBox` is computed to tightly fit glyph + gap + text, with a small
  configurable margin, so there is no dead space around the sticker.

## Live Preview vs. Export

- **Live preview** renders text as real `<text>` using the loaded web font —
  fast, editable, WYSIWYG.
- **Export** (copy + download) re-renders the text as **vector `<path>`** via
  opentype.js, so the output is fully self-contained and plotter-ready:
  filled paths only, no font dependency, no strokes-only shapes.

This split keeps interaction snappy while guaranteeing a portable result.

## Output

- **Copy SVG** — writes the export SVG markup to the clipboard. This is the
  "code" the user sends so the recipient sees the exact design.
- **Download SVG** — saves a `.svg` file (filename derived from the caption).

Both use the same path-outlined, self-contained SVG string.

## Components (rough)

- `App.svelte` — layout, holds sticker-config state.
- `Controls.svelte` — all inputs, two-way bound to config.
- `Preview.svelte` — renders the WYSIWYG SVG from config + loaded fonts.
- `lib/glyph.ts` — the Instagram camera glyph path data + sizing helper.
- `lib/exportSvg.ts` — builds the final self-contained SVG string, text→paths
  via opentype.js, computes viewBox.
- `lib/fonts.ts` — font registry (family → file, opentype.js loader, CSS
  `@font-face` for preview).

## Error Handling

- Empty caption → render just the glyph; export still valid.
- Font not yet loaded → disable export briefly / show "loading fonts".
- Clipboard API unavailable → fall back to download / show the SVG in a
  copyable textarea.
- Glyph-only / text-only both produce a valid tight viewBox.

## Testing

- Unit: `exportSvg` produces well-formed SVG with a correct viewBox for
  glyph-only, text-only, and glyph+text cases; text becomes `<path>` (no
  `<text>` in export).
- Unit: viewBox math (fit + margin) for a couple of known inputs.
- Manual: run dev server, verify live preview matches, copy + download,
  open the exported SVG in a fresh viewer to confirm it's self-contained.

## Repo

- Location: `~/Development/insta-sticker-generator/` (own git repo).
- Standard Vite scaffold, fonts under `src/assets/fonts/`, `README.md` with
  run instructions (`npm install`, `npm run dev`).
