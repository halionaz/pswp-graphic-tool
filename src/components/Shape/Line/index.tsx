import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

import s from './Line.module.css';

const Line = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Line}
        style={{ ...style, height: '2px' }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Line;
