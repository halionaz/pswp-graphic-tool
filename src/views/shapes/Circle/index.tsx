import { ShapeViewProps } from '@/utils/types';
import { forwardRef } from 'react';

import s from './Circle.module.css';

const Circle = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ isSelected, color, position, scale, zIndex, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Circle}
        style={{
          backgroundColor: color,
          top: position.y,
          left: position.x,
          width: scale.width,
          height: scale.height,
          zIndex,
          border: isSelected ? '#0a99ff 3px solid' : 'none',
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);
export default Circle;
