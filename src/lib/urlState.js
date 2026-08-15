import LZString from 'lz-string';
import { sanitizeConfig } from './config.js';

const KEY = 's';

// Short keys keep the compressed payload small.
function pack(cfg) {
  return { t: cfg.text, f: cfg.fontId, s: cfg.fontSize, l: cfg.logoSize, g: cfg.gap, c: cfg.color, w: cfg.widthCm };
}
function unpack(p) {
  return { text: p.t, fontId: p.f, fontSize: p.s, logoSize: p.l, gap: p.g, color: p.c, widthCm: p.w };
}

export function encodeConfig(cfg) {
  return LZString.compressToEncodedURIComponent(JSON.stringify(pack(cfg)));
}

/** Serialize config into the URL hash (no new history entry). */
export function writeUrl(cfg) {
  const enc = encodeConfig(cfg);
  const url = `${location.pathname}${location.search}#${KEY}=${enc}`;
  history.replaceState(null, '', url);
}

/**
 * Read config from the URL hash.
 * Returns { config, error }:
 *  - no hash present      → { config: null, error: false }  (normal fresh start)
 *  - hash present, broken → { config: null, error: true }   (corrupted/mistyped link)
 *  - hash present, valid  → { config: <sanitized>, error: false }
 */
export function readUrl() {
  const hash = location.hash.replace(/^#/, '');
  const enc = new URLSearchParams(hash).get(KEY);
  if (!enc) return { config: null, error: false };
  try {
    const json = LZString.decompressFromEncodedURIComponent(enc);
    if (!json) return { config: null, error: true };
    return { config: sanitizeConfig(unpack(JSON.parse(json))), error: false };
  } catch {
    return { config: null, error: true };
  }
}
