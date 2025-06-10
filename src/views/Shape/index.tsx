import useDrag from '@/hooks/useDrag';
import { GraphicObjectInterface, GroupInterface } from '@/models/GraphicObjectInterface';
import {
  ControllerContext,
  SelectedObjectsContext,
} from '@/commands/GraphicEditorContext';
import Ellipse from '@/views/Shape/Ellipse';
import Image from '@/views/Shape/Image';
import Line from '@/views/Shape/Line';
import Rectangle from '@/views/Shape/Rectangle';
import Text from '@/views/Shape/Text';
import { useContext } from 'react';
import { model } from '@/models/GraphicEditorModel';

const getObjectAABB = (object: GraphicObjectInterface) => {
  let width = 0;
  let height = 0;

  switch(object.type) {
    case 'rectangle':
    case 'ellipse':
    case 'image':
      width = object.scale.width;
      height = object.scale.height;
      break;
    case 'line':
      width = object.length;
      height = object.strokeWidth;
      break;
    case 'text':
      // This is an approximation. A real solution would measure the DOM element.
      width = object.text.length * (object.textSize * 0.6);
      height = object.textSize;
      break;
    default:
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  
  const minX = object.position.x - width / 2;
  const minY = object.position.y - height / 2;
  
  return { minX, minY, maxX: minX + width, maxY: minY + height };
};

const calculateRecursiveBoundingBox = (object: GraphicObjectInterface) => {
  if (object.type !== 'group') {
    return getObjectAABB(object);
  }

  // If it's a group, recurse
  if (object.children.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  let globalMinX = Infinity, globalMinY = Infinity, globalMaxX = -Infinity, globalMaxY = -Infinity;

  object.children.forEach(child => {
    const childBox = calculateRecursiveBoundingBox(child);
    if (childBox.minX < globalMinX) globalMinX = childBox.minX;
    if (childBox.minY < globalMinY) globalMinY = childBox.minY;
    if (childBox.maxX > globalMaxX) globalMaxX = childBox.maxX;
    if (childBox.maxY > globalMaxY) globalMaxY = childBox.maxY;
  });

  return { minX: globalMinX, minY: globalMinY, maxX: globalMaxX, maxY: globalMaxY };
};


interface Props {
  object: GraphicObjectInterface;
  isParentSelected?: boolean;
}
const Shape = ({ object, isParentSelected = false }: Props) => {
  const selectedIds = useContext(SelectedObjectsContext);
  const { move, select, withSelect } = useContext(ControllerContext);
  const { dragRef, handleMouseDown, isDragging } = useDrag(move);

  const isActive = selectedIds.includes(object.id) || isParentSelected;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    const selectableObject = model.findSelectable(object.id);
    const targetId = selectableObject ? selectableObject.id : object.id;

    if (e.shiftKey) {
      // shift가 함께 눌린 상태라면 withSelect
      withSelect(targetId);
    } else {
      if (!(selectedIds.length === 1 && selectedIds[0] === targetId)) {
        select(targetId);
      }
    }
    handleMouseDown(e);
  };

  const sharedStyle: React.CSSProperties = {
    position: 'absolute',
    left: object.position.x,
    top: object.position.y,

    transformOrigin: '50% 50%',
    transform: `translate(-50%, -50%) rotate(${object.rotation}deg)`,

    backgroundColor: object.color,
    outline: isActive ? '#0a99ff 3px solid' : 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const shapeProps = {
    style: sharedStyle,
    ref: dragRef,
    onMouseDown,
    isSelected: isActive,
  };

  switch (object.type) {
    case 'rectangle':
      return <Rectangle {...shapeProps} object={object} />;
    case 'ellipse':
      return <Ellipse {...shapeProps} object={object} />;
    case 'line':
      return <Line {...shapeProps} object={object} />;
    case 'image':
      return <Image {...shapeProps} object={object} />;
    case 'text':
      return <Text {...shapeProps} object={object} />;
    case 'group':
      const isGroupSelected = selectedIds.includes(object.id);
      const box = calculateRecursiveBoundingBox(object);
      const boxStyle = {
        position: 'absolute',
        left: box.minX,
        top: box.minY,
        width: box.maxX - box.minX,
        height: box.maxY - box.minY,
        outline: isGroupSelected ? '#0a99ff 2px dashed' : 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      };
      return (
        <>
          <div ref={dragRef} onMouseDown={onMouseDown} style={boxStyle} />
          {object.children.map(child => (
            <Shape key={child.id} object={child} isParentSelected={isGroupSelected} />
          ))}
          
        </>
      );
  }
};

export default Shape;
