// geometry.ts
// helper functions for complex actions

export function rotatePoint(
  x: number,
  y: number,
  cx: number,
  cy: number,
  angleRad: number
) {
  const dx = x - cx;
  const dy = y - cy;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin - dy * cos,
  };
)