import * as opentypeNS from 'opentype.js';
import { FONTS } from './fonts.js';
import { glyphPathData, GLYPH_BOX } from './glyph.js';

// opentype.js is CommonJS; grab whichever shape Vite hands us.
const opentype = opentypeNS.default ?? opentypeNS;

const fontCache = new Map();

async function getFont(id) {
  if (fontCache.has(id)) return fontCache.get(id);
  const entry = FONTS.find((f) => f.id === id) ?? FONTS[0];
  const res = await fetch(entry.url);
  if (!res.ok) throw new Error(`Font "${entry.label}" konnte nicht geladen werden (${res.status})`);
  const buffer = await res.arrayBuffer();
  const font = opentype.parse(buffer);
  fontCache.set(id, font);
  return font;
}

/** Parse all fonts up front so previews and exports never wait. */
export async function preloadFonts() {
  await Promise.allSettled(FONTS.map((f) => getFont(f.id)));
}

const round = (n) => Math.round(n * 100) / 100;

/**
 * Build a fully self-contained sticker SVG for the given config.
 * Text is converted to vector paths (no font dependency, plotter-ready).
 */
export async function buildStickerSvg(cfg) {
  const font = await getFont(cfg.fontId);
  const margin = cfg.margin ?? 20;
  const logo = cfg.logoSize;
  const text = (cfg.text ?? '').trim();

  // Text → vector path, baseline at origin.
  let textPathData = '';
  let tW = 0;
  let tH = 0;
  let tx1 = 0;
  let ty1 = 0;
  let hasText = false;
  if (text) {
    const path = font.getPath(text, 0, 0, cfg.fontSize);
    const bb = path.getBoundingBox();
    if (Number.isFinite(bb.x1) && bb.x2 > bb.x1) {
      hasText = true;
      tx1 = bb.x1;
      ty1 = bb.y1;
      tW = bb.x2 - bb.x1;
      tH = bb.y2 - bb.y1;
      textPathData = path.toPathData(2);
    }
  }

  const gap = hasText ? cfg.gap : 0;
  const contentW = logo + gap + tW;
  const contentH = Math.max(logo, tH);
  const W = contentW + margin * 2;
  const H = contentH + margin * 2;

  // Glyph placement (scaled from its 100x100 box), vertically centered.
  const scale = logo / GLYPH_BOX;
  const gx = margin;
  const gy = margin + (contentH - logo) / 2;

  // Text placement, left edge after the glyph + gap, vertically centered.
  const textStartX = margin + logo + gap;
  const txT = textStartX - tx1;
  const tyT = margin + (contentH - tH) / 2 - ty1;

  const parts = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(W)} ${round(H)}" width="${round(W)}" height="${round(H)}">`,
  );
  if (cfg.bgOn) {
    parts.push(`<rect x="0" y="0" width="${round(W)}" height="${round(H)}" fill="${cfg.bgColor}"/>`);
  }
  parts.push(
    `<g transform="translate(${round(gx)} ${round(gy)}) scale(${scale.toFixed(4)})" fill="${cfg.logoColor}" fill-rule="evenodd"><path d="${glyphPathData()}"/></g>`,
  );
  if (hasText) {
    parts.push(
      `<path transform="translate(${round(txT)} ${round(tyT)})" fill="${cfg.textColor}" d="${textPathData}"/>`,
    );
  }
  parts.push('</svg>');
  return parts.join('');
}
