# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Palette Atelier

An interactive color-theory tool for fashion styling, built with React. Pick a base hue on a draggable color wheel, choose a harmony rule (complementary, analogous, triadic, split-complementary, or monochromatic), and adjust shade — the app generates a matching color palette with styling notes on how to wear each combination.

## Live concept

Fashion color pairing is really just geometry on a color wheel. This app makes that visible and interactive:

- **Complementary** — colors directly opposite each other (180° apart) for maximum contrast
- **Analogous** — neighboring colors (±30°) that blend smoothly into cohesive, tonal outfits
- **Triadic** — three colors evenly spaced (120° apart) for balanced vibrancy
- **Split-Complementary** — a softer version of complementary, using the two colors adjacent to the true opposite
- **Monochromatic** — a single hue expressed across several lightness levels, for easy head-to-toe dressing

## Tech stack

- React (function components + hooks: `useState`, `useRef`, `useCallback`)
- Vite (dev server and build tool)
- Plain CSS-in-JS (inline styles, no external UI library)
- No backend — all color math runs client-side

## Getting started

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR-USERNAME/fashion-palette.git
cd fashion-palette
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

To build for production:

```bash
npm run build
```

## How it works

- **`hslToHex(h, s, l)`** converts a color from HSL (hue/saturation/lightness) into a hex code the browser can render. HSL is used throughout the app because color harmonies are naturally expressed as angles on a wheel (e.g. "180° opposite"), which HSL's hue value maps to directly.
- **`HARMONIES`** is a lookup table where each harmony rule is defined as a function mapping a base hue to an array of related hues, plus a short fashion-styling note.
- **`buildPalette(hue, harmonyKey, lightness)`** combines the current hue, selected harmony, and shade level into the final array of colors rendered as swatches.
- **`ColorWheel`** is a custom draggable picker built with `Math.atan2` to convert a mouse position into an angle (hue), with pointer-drag support via `pointermove`/`pointerup` listeners.

## Project structure

```
fashion-palette/
├── src/
│   ├── App.jsx      # Main component: color math, wheel, and UI
│   ├── main.jsx      # React entry point (renders <App /> into #root)
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## Possible next steps

- Fix the complementary harmony offset (currently `h + 100`, should be `h + 180` for a true opposite)
- Add a saturation slider alongside the existing shade (lightness) slider
- Save favorite palettes to `localStorage`
- Add "outfit slots" (top / bottom / accessory) that each pull one color from the generated palette
- Click-to-copy hex codes

## What this project covers

Built as a learning project to practice:
- React state and derived values (`useState`, computing palettes fresh on every render rather than storing them)
- Custom pointer/drag interactions without external libraries
- HSL color theory and its relationship to real-world color harmony rules
- Debugging common React/JS pitfalls: missing `return` statements, parameter/argument mismatches, and `NaN` propagation from missing function arguments
