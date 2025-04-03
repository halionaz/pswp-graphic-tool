import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

import s from './Circle.module.css';

const Circle = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Circle}
        style={style}
        onMouseDown={onMouseDown}
      />
    );
  }
);
export default Circle;
