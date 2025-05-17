import { forwardRef } from 'react';
import { ShapeViewProps } from '@/views/Shape/types';
import { RectangleInterface } from '@/models/GraphicObjectModel';

interface RectangleViewProps extends ShapeViewProps {
  object: RectangleInterface;
}
const Rectangle = forwardRef<HTMLDivElement, RectangleViewProps>(
  ({ style, onMouseDown, object }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          width: object.scale.width,
          height: object.scale.height,
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Rectangle;
