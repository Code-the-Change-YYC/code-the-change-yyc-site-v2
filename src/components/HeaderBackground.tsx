import type { ReactNode } from "react";

const CELL = 30; // px per pixel-grid cell
const TILE_COLS = 30; // columns per repeating tile (tile width = CELL * TILE_COLS)

// 1 = filled cell, 0 = empty. Row 0 sits against the header's bottom edge;
// later rows are the "dissolve" — sparser, and not always contiguous with
// the row above, matching the scattered look in the reference design.
const PATTERN: number[][] = [
  [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

function buildTileDataUri(color: string) {
  const w = CELL * TILE_COLS;
  const h = CELL * PATTERN.length;
  const rects = PATTERN.flatMap((row, r) =>
    row.flatMap((filled, c) =>
      filled
        ? [`<rect x="${c * CELL}" y="${r * CELL}" width="${CELL}" height="${CELL}" fill="${color}"/>`]
        : [],
    ),
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

interface HeaderBackgroundProps {
  children: ReactNode;
  /** Lavender fill, used for both the solid field and the pixel tile. */
  color?: string;
  /**
   * Guaranteed height of the solid lavender field, so there's room for nav +
   * hero text even before/without content driving the height itself.
   * Content taller than this still grows the field normally.
   */
  minHeight?: number;
  className?: string;
}

export default function HeaderBackground({
  children,
  color = "#D5CDFE",
  minHeight = 320,
  className = "",
}: HeaderBackgroundProps) {
  const tileWidth = CELL * TILE_COLS;
  const tileHeight = CELL * PATTERN.length;

  return (
    <div className={`relative isolate ${className}`} style={{ minHeight }}>
      {/* Solid field behind the nav/hero content. Contained by `isolate`
          above so this can't escape and paint behind the rest of the page. */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: color }} />

      {/* Padded content area — gives nav + hero text room to breathe instead
          of sitting flush against the edges of the lavender field.
          Top padding is bigger than the bottom on purpose: `Header` is
          `fixed`, so it's not in the document flow here and this content
          has to clear the pill (~64px) plus its `top-4` offset (16px)
          itself, or the hero row renders underneath it. */}
      <div className="px-6 pt-28 pb-10 md:px-10 md:pt-32 md:pb-14">
        {children}
      </div>

      {/* Pixel-dissolve strip, hanging below the solid field into whatever
          section comes next. Needs an ancestor that doesn't clip overflow. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-full"
        style={{
          height: tileHeight,
          backgroundImage: buildTileDataUri(color),
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top left",
          backgroundSize: `${tileWidth}px ${tileHeight}px`,
        }}
      />
    </div>
  );
}
