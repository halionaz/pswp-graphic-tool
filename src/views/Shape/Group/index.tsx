import { GroupInterface } from '@/models/GraphicObjectInterface';
import calculateRecursiveBoundingBox from '@/utils/calculateRecursiveBoundingBox';

import Shape from '@/views/Shape';
import { ShapeViewProps } from '@/views/Shape/types';
import { forwardRef } from 'react';

interface GroupViewProps extends ShapeViewProps {
  object: GroupInterface;
}

const Group = forwardRef<HTMLDivElement, GroupViewProps>(
  ({ object, style, onMouseDown, isSelected }, ref) => {
    const box = calculateRecursiveBoundingBox(object);
    return (
      <>
        <div
          ref={ref}
          onMouseDown={onMouseDown}
          style={{
            ...style,
            left: box.minX,
            top: box.minY,
            width: box.maxX - box.minX,
            height: box.maxY - box.minY,
            transformOrigin: '0 0',
            transform: `none`,
            outline: isSelected ? '#0a99ff 3px dashed' : 'none',
          }}
        />
        {object.children.map(child => (
          <Shape key={child.id} object={child} isParentSelected={isSelected} />
        ))}
      </>
    );
  }
);
export default Group;
