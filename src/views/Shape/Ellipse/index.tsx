import { forwardRef } from 'react';

import s from './Ellipse.module.css';

import { EllipseInterface } from '@/models/GraphicObjectModel';
import { ShapeViewProps } from '@/views/Shape/types';
import Handlers from '@/views/Shape/Handlers';

interface EllipseViewProps extends ShapeViewProps {
  object: EllipseInterface;
}
const Ellipse = forwardRef<HTMLDivElement, EllipseViewProps>(
  ({ style, onMouseDown, object, isSelected }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Ellipse}
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
export default Ellipse;
