import useDrag from '@/libs/hooks/useDrag';
import { GraphicObjectInterface } from '@/models/GraphicObjectModel';
import {
  ControllerContext,
  SelectedObjectsContext,
} from '@/models/GraphicEditorContext';
import Ellipse from '@/views/Shape/Ellipse';
import Image from '@/views/Shape/Image';
import Line from '@/views/Shape/Line';
import Rectangle from '@/views/Shape/Rectangle';
import Text from '@/views/Shape/Text';
import { useContext } from 'react';

interface Props {
  object: GraphicObjectInterface;
}
const Shape = ({ object }: Props) => {
  const controller = useContext(ControllerContext);
  const selectedIndex = useContext(SelectedObjectsContext);
  const isSelected = selectedIndex.indexOf(object.id) !== -1;

  const { move, select, withSelect } = controller;

  const { dragRef, handleMouseDown, isDragging } = useDrag(move);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.shiftKey) {
      // shift가 함께 눌린 상태라면 withSelect
      withSelect(object.id);
    } else {
      // 그렇지 않다면 select
      select(object.id);
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
    outline: isSelected ? '#0a99ff 3px solid' : 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const shapeProps = {
    style: sharedStyle,
    ref: dragRef,
    onMouseDown,
    isSelected,
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
  }
};
export default Shape;
