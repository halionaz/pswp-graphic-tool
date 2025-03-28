import { forwardRef, MouseEvent } from 'react';
import s from './Rectangle.module.css';

interface Props {
  isSelected: boolean;
  color: string;
  position: {
    x: number;
    y: number;
  };
  scale: {
    width: number;
    height: number;
  };
  zIndex: number;
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
}

const Rectangle = forwardRef<HTMLDivElement, Props>(
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
          border: isSelected ? '#0a99ff 5px solid' : 'none',
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Rectangle;
