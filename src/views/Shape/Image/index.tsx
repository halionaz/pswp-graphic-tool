import { forwardRef } from 'react';

import { ShapeViewProps } from '@/views/Shape/types';
import { ImageInterface } from '@/models/GraphicObjectModel';

interface ImageViewProps extends ShapeViewProps {
  object: ImageInterface;
}
const Image = forwardRef<HTMLDivElement, ImageViewProps>(
  ({ style, onMouseDown, object }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          width: object.scale.width,
          height: object.scale.height,
          backgroundImage: `url(${object.imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Image;
