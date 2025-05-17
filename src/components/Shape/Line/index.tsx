import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

const Line = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        style={{ ...style, height: '2px' }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Line;
