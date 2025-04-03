import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

import s from './Rectangle.module.css';

const Rectangle = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Rectangle}
        style={style}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Rectangle;
