// One color drives both the logo and the text. Only these three are selectable.
export const COLORS = [
  { id: 'black', label: 'Schwarz', value: '#000000' },
  { id: 'red', label: 'Rot', value: '#E4002B' },
  { id: 'white', label: 'Weiß', value: '#FFFFFF' },
];

export const DEFAULT_COLOR = '#000000';

export function isColorValue(value) {
  return COLORS.some((c) => c.value.toLowerCase() === String(value).toLowerCase());
}

// Background is always white and cannot be changed.
export const BACKGROUND = '#FFFFFF';
