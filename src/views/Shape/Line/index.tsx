import { forwardRef } from 'react';

import { ShapeViewProps } from '@/views/Shape/types';
import { LineInterface } from '@/models/GraphicObjectModel';

interface LineViewProps extends ShapeViewProps {
  object: LineInterface;
}
const Line = forwardRef<HTMLDivElement, LineViewProps>(
  ({ style, onMouseDown, object }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          width: object.length,
          height: object.strokeWidth,
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Line;
