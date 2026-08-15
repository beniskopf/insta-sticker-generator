// Instagram-style camera glyph, hand-rebuilt as filled SVG paths in a 100x100 box.
// Uses fill-rule="evenodd": nested inner contours subtract from outer ones, so the
// rounded frame and the center ring cut as outlines — plotter-friendly single-color
// filled paths, no strokes.

export const GLYPH_BOX = 100;

function roundedRect(x, y, w, h, r) {
  return (
    `M${x + r},${y}` +
    `h${w - 2 * r}` +
    `a${r},${r} 0 0 1 ${r},${r}` +
    `v${h - 2 * r}` +
    `a${r},${r} 0 0 1 ${-r},${r}` +
    `h${-(w - 2 * r)}` +
    `a${r},${r} 0 0 1 ${-r},${-r}` +
    `v${-(h - 2 * r)}` +
    `a${r},${r} 0 0 1 ${r},${-r}` +
    'z'
  );
}

function circle(cx, cy, r) {
  return (
    `M${cx - r},${cy}` +
    `a${r},${r} 0 1 0 ${2 * r},0` +
    `a${r},${r} 0 1 0 ${-2 * r},0` +
    'z'
  );
}

export function glyphPathData() {
  return [
    roundedRect(6, 6, 88, 88, 26), // outer frame
    roundedRect(16, 16, 68, 68, 18), // inner frame (subtracted)
    circle(50, 50, 23), // outer lens ring
    circle(50, 50, 13), // inner lens (subtracted)
    circle(72, 28, 6), // top-right dot
  ].join(' ');
}
