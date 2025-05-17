import useDrag from '@/libs/hooks/useDrag';
import {
  GraphicObjectType,
  GraphicObjectViewInterface,
  PositionType,
} from '@/libs/types';
import Ellipse from '@/components/Shape/Ellipse';
import Rectangle from '@/components/Shape/Rectangle';
import Line from '@/components/Shape/Line';
import Image from '@/components/Shape/Image';
import Text from '@/components/Shape/Text';

interface Props extends GraphicObjectViewInterface {
  type: GraphicObjectType;
  select: () => void;
  withSelect: () => void;
  updatePosition: (diff: PositionType) => void;
}

const Shape = ({
  type,
  updatePosition,
  select,
  withSelect,
  color,
  position,
  scale,
  isSelected,
  rotation,
}: Props) => {
  const { dragRef, handleMouseDown, isDragging } = useDrag(updatePosition);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.shiftKey) {
      // shift가 함께 눌린 상태라면 withSelect
      withSelect();
    } else {
      // 그렇지 않다면 select
      select();
    }
    handleMouseDown(e);
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,

    width: scale.width,
    height: scale.height,
    transformOrigin: '50% 50%',
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,

    backgroundColor: color,
    border: isSelected ? '#0a99ff 3px solid' : 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  const shapeProps = { style, ref: dragRef, onMouseDown };

  switch (type) {
    case 'rectangle':
      return <Rectangle {...shapeProps} />;
    case 'ellipse':
      return <Ellipse {...shapeProps} />;
    case 'line':
      return <Line {...shapeProps} />;
    case 'image':
      return <Image {...shapeProps} />;
    case 'text':
      return <Text {...shapeProps} />;
  }
};
export default Shape;
