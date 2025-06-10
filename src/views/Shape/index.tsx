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

interface Props {
  object: GraphicObjectInterface;
}
const Shape = ({ object }: Props) => {
  const selectedIndex = useContext(SelectedObjectsContext);
  const isSelected = selectedIndex.indexOf(object.id) !== -1;

  const { move, select, withSelect } = useContext(ControllerContext);

  const { dragRef, handleMouseDown, isDragging } = useDrag(move);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    const findSelectableId = (o: GraphicObjectInterface): string => {
      if (o.type !== 'group') return o.id;
      return o.id;
    };

    let targetId = object.id;
    const rootGroup = model.snapshot.find(
      o => o.type === 'group' && (o as GroupInterface).children.some(c => c.id === object.id)
    );
    if (rootGroup) targetId = rootGroup.id;

    if (e.shiftKey) {
      // shift가 함께 눌린 상태라면 withSelect
      withSelect(targetId);
    } else {
      // 그렇지 않다면 select
      select(targetId);
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
    case 'group':
      return (
        <>
	  {(object as GroupInterface).children.map(child => (
	    <Shape key={child.id} object={child} />
	  ))}
	</>
      );
  }
};
export default Shape;
