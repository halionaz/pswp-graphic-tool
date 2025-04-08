import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

import s from './Ellipse.module.css';

const Ellipse = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Ellipse}
        style={style}
        onMouseDown={onMouseDown}
      />
    );
  }
);
export default Ellipse;
