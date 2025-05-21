import { forwardRef } from 'react';
import { ShapeViewProps } from '@/views/Shape/types';
import { RectangleInterface } from '@/models/GraphicObjectModel';
import Handlers from '@/views/Shape/Handlers';

interface RectangleViewProps extends ShapeViewProps {
  object: RectangleInterface;
}
const Rectangle = forwardRef<HTMLDivElement, RectangleViewProps>(
  ({ style, onMouseDown, object, isSelected }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          width: object.scale.width,
          height: object.scale.height,
        }}
        onMouseDown={onMouseDown}
      >
        {isSelected && <Handlers object={object} />}
      </div>
    );
  }
);

export default Rectangle;
