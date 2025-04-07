import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

const Rectangle = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return <div ref={ref} style={style} onMouseDown={onMouseDown} />;
  }
);

export default Rectangle;
