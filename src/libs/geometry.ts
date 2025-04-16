// geometry.ts
// helper functions for complex actions

import { GraphicObjectInterface } from '@/libs/types';

export function getObjectCenter(obj: GraphicObjectInterface) {
  return {
    x: obj.position.x + obj.scale.width / 2,
    y: obj.position.y + obj.scale.height / 2,
  };
}

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
}