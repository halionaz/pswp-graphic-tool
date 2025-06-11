import useDrag from '@/hooks/useDrag';
import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';
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
import Group from '@/views/Shape/Group';

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
      return <Group {...shapeProps} object={object} />;
  }
};

export default Shape;
