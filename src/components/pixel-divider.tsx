/**
 * Pixelated edge that hangs off the bottom of a coloured page header
 * (Figma "pixels", 1280x120, 40px squares).
 *
 * The art is a fixed 1280px-wide layout. The SVG is never narrower than 1280px
 * and is anchored to the left, so narrower viewports crop the right side
 * instead of squashing the squares, and wider viewports scale it uniformly.
 */
const PIXELS: ReadonlyArray<readonly [x: number, y: number]> = [
  [0, 0],
  [40, 0],
  [40, 40],
  [0, 80],
  [120, 0],
  [160, 0],
  [200, 40],
  [240, 0],
  [240, 80],
  [280, 0],
  [360, 0],
  [400, 0],
  [400, 40],
  [480, 0],
  [560, 40],
  [600, 0],
  [680, 0],
  [720, 0],
  [720, 40],
  [760, 0],
  [760, 40],
  [760, 80],
  [800, 0],
  [840, 0],
  [920, 0],
  [960, 40],
  [1000, 0],
  [1040, 0],
  [1080, 0],
  [1080, 40],
  [1115, 0],
  [1120, 80],
  [1200, 0],
  [1240, 40],
];

type Props = {
  className?: string;
  /** Any CSS colour value. Defaults to the purple header colour. */
  color?: string;
};

export function PixelDivider({
  className = "",
  color = "var(--color-purple-500)",
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="block h-auto w-full min-w-[1280px]"
        viewBox="0 0 1280 120"
        shapeRendering="crispEdges"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        {PIXELS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="40" height="40" />
        ))}
      </svg>
    </div>
  );
}
