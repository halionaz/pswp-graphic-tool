import { forwardRef } from 'react';
import s from './Rectangle.module.css';
import { ShapeViewProps } from '@/utils/types';

const Rectangle = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ isSelected, color, position, scale, zIndex, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Rectangle}
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

export default Rectangle;
