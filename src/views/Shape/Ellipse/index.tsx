import { forwardRef } from 'react';

import s from './Ellipse.module.css';

import { EllipseInterface } from '@/models/GraphicObjectModel';
import { ShapeViewProps } from '@/views/Shape/types';

interface EllipseViewProps extends ShapeViewProps {
  object: EllipseInterface;
}
const Ellipse = forwardRef<HTMLDivElement, EllipseViewProps>(
  ({ style, onMouseDown, object }, ref) => {
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
      />
    );
  }
);
export default Ellipse;
