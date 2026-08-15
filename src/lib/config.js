import { DEFAULT_FONT_ID, isFontId } from './fonts.js';
import { DEFAULT_COLOR, isColorValue } from './palette.js';

// Instagram handles are at most 30 characters (letters, digits, "." and "_").
export const MAX_TEXT_LENGTH = 30;

export const RANGES = {
  fontSize: { min: 20, max: 320 },
  logoSize: { min: 20, max: 320 },
  gap: { min: 0, max: 160 },
};

export const MARGIN = 24;

export const DEFAULT_CONFIG = {
  text: 'yourhandle',
  fontId: DEFAULT_FONT_ID,
  fontSize: 140,
  logoSize: 120,
  gap: 30,
  color: DEFAULT_COLOR,
};

function clampNumber(value, { min, max }, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Coerce arbitrary (e.g. URL-provided) input into a safe, complete config. */
export function sanitizeConfig(input) {
  const src = input ?? {};
  const d = DEFAULT_CONFIG;
  return {
    text: typeof src.text === 'string' ? src.text.slice(0, MAX_TEXT_LENGTH) : d.text,
    fontId: isFontId(src.fontId) ? src.fontId : d.fontId,
    fontSize: clampNumber(src.fontSize, RANGES.fontSize, d.fontSize),
    logoSize: clampNumber(src.logoSize, RANGES.logoSize, d.logoSize),
    gap: clampNumber(src.gap, RANGES.gap, d.gap),
    color: isColorValue(src.color) ? src.color : d.color,
  };
}
