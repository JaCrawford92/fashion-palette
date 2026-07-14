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
  const hues = cfg.hues(hue).map(normalize);
  return hues.map((h, i) => ({
    hue: h,
    hex: hslToHex(
      h,
      harmonyKey === "monochrome" ? 55 : 68,
      harmonyKey === "monochrome" ? 22 + i * 14 : 54
    ),
  }));
};

// Color Wheel Picker //

function ColorWheel({ hue, onChange }) {
  const ref = useRef(null);

  const updateFromEvent = useCallback(
    (clientX, clientY) => {
      const react = ref.current.getBoundingClientReact();
      const cx = react.left + react.width / 2;
      const cy= react.top + react.height / 2;

      const angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);

      onChange(normalize(angle + 90));
    },
    [onChange]
  );

  const handlePointerDown = (e) => {
    e.preventDefault();
    updateFromEvent(e.clientX, e.clientY);

    const move = (ev) => updateFromEvent(ev.clientX, ev.clientY);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const stops = Array.from({ length: 24 }, (_, i) => {
    const h = i * 15;
    return `hsl(${h},70%,55%) ${i * (100 / 24)}%, hsl(${h},70%,55%) ${(i + 1) * (100 / 24)}%`;
  }).join(", ");

  const rad = ((hue - 90) * Math.PI) / 180;
  const knobX = 50 + 42 * Math.cos(rad);
  const knobY = 50 + 42 * Math.sin(rad);

  <div
      ref={ref}
      onPointerDown={handlePointerDown}
      style={{
        width: 220,
        height: 220,
        borderRadius: "50%",
        position: "relative",
        cursor: "grab",
        background: `conic-gradient(${stops})`,
        boxShadow: "0 0 0 1px rgba(243,239,230,0.15), 0 20px 40px -12px rgba(0,0,0,0.6)",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "#161513",
          transform: "translate(-50%,-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: hslToHex(hue, 70, 55),
            boxShadow: "0 0 0 2px rgba(243,239,230,0.4)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: `${knobX}%`,
          top: `${knobY}%`,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#F3EFE6",
          border: "3px solid #161513",
          transform: "translate(-50%,-50%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        }}
      />
    </div>
};

// Main App //

export default function FashionPalette() {
  const [hue, setHue] = useState(212);
  const [harmonyKey, setHarmonyKey] = useState("complementary");
  const palette = buildPalette(hue, harmonyKey);
  const cfg = HARMONIES[harmonyKey];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#161513",
        color: "#F3EFE6",
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: "48px 24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {/* Masthead */}
        <div style={{ marginBottom: 48, borderBottom: "1px solid rgba(243,239,230,0.2)", paddingBottom: 24 }}>
          <div
            style={{
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: 10,
            }}
          >
            Vol. 01 — Color Theory for Dressing
          </div>
          <h1 style={{ fontSize: 44, margin: 0, fontWeight: 400, letterSpacing: "-0.01em" }}>
            Palette Atelier
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Wheel + harmony picker */}
          <div style={{ flex: "0 0 auto" }}>
            <ColorWheel hue={hue} onChange={setHue} />
            <div
              style={{
                marginTop: 24,
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontSize: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.5,
                textAlign: "center",
              }}
            >
              Drag the wheel to choose a base hue
            </div>

            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 6 }}>
              {Object.entries(HARMONIES).map(([key, h]) => (
                <button
                  key={key}
                  onClick={() => setHarmonyKey(key)}
                  style={{
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                    textAlign: "left",
                    padding: "10px 14px",
                    background: harmonyKey === key ? "#F3EFE6" : "transparent",
                    color: harmonyKey === key ? "#161513" : "#F3EFE6",
                    border: "1px solid rgba(243,239,230,0.25)",
                    borderRadius: 2,
                    fontSize: 13,
                    letterSpacing: "0.03em",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Swatches */}
          <div style={{ flex: "1 1 320px", minWidth: 300 }}>
            <div
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.6,
                marginBottom: 16,
              }}
            >
              {cfg.label} Palette
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              {palette.map((c, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 84,
                      height: 108,
                      background: c.hex,
                      borderRadius: 3,
                      boxShadow: "0 12px 24px -8px rgba(0,0,0,0.5)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Helvetica Neue, Arial, sans-serif",
                      fontSize: 11,
                      marginTop: 8,
                      opacity: 0.7,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {c.hex.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 17,
                lineHeight: 1.6,
                opacity: 0.85,
                maxWidth: 460,
                fontStyle: "italic",
              }}
            >
              {cfg.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}