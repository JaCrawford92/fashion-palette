import React, { useState, useRef, useCallback } from 'react';

// Color Math //

function hslToHex(h, s, l){
  s /= 100; l /= 100;
  const k = (n) => (n + h/ 30) %12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x) .toString(16).padStart(2, "0");

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

const normalize= (h) => ((h % 360) + 360) % 360;

const HARMONIES = {
  complementary: {
    label: "complementary",
    hues: (h) => [h, h + 100],
    note: "Opposite hues create maximum contrast...",
  },
  analogous: {
    label: "Analogous",
    hues: (h) => [h - 30, h, h + 30],
    note: "Neighbors on the wheel blend easily and read as calm, cohesive outfits. Good for tonal dressing — a knit, trouser, and coat that all sit in the same family.",
  },
  triadic: {
    label: "Triadic",
    hues: (h) => [h, h + 120, h + 240],
    note: "Three evenly spaced hues give vibrant balance. Let one dominate (60–70% of the look), a second support it, and use the third as a small accent — jewelry, a bag, a lip color.",
  },
  splitComp: {
    label: "Split-Complementary",
    hues: (h) => [h, h + 150, h + 210],
    note: "A softer alternative to straight complementary — same contrast energy, less clash. A forgiving choice for pattern mixing.",
  },
  monochrome: {
    label: "Monochromatic",
    hues: (h) => [h, h, h, h, h],
    note: "One hue, several lightness levels. This is the easiest palette to wear head-to-toe and instantly reads as intentional and polished — think tonal head-to-toe camel or navy.",
  },
};

function buildPalette(hue, harmonyKey) {
  const cfg = HARMONIES[harmonyKey];
};