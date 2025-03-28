import { forwardRef, MouseEvent } from 'react';
import s from './Rectangle.module.css';
import { GraphicObjectViewInterface } from '@/utils/types';

interface Props extends GraphicObjectViewInterface {
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
          border: isSelected ? '#0a99ff 3px solid' : 'none',
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Rectangle;
