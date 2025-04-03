import useDrag from '@/libs/hooks/useDrag';
import {
  GraphicObjectType,
  GraphicObjectViewInterface,
  PositionType,
} from '@/libs/types';
import Circle from '@/components/Shape/Circle';
import Rectangle from '@/components/Shape/Rectangle';

interface Props extends GraphicObjectViewInterface {
  type: GraphicObjectType;
  setIsSelected: () => void;
  setPosition: (newPos: PositionType) => void;
}

const Shape = ({
  type,
  setPosition,
  setIsSelected,
  color,
  position,
  scale,
  isSelected,
  rotation,
}: Props) => {
  const { dragRef, handleMouseDown } = useDrag(setPosition);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMouseDown(e);
    setIsSelected();
  };

  const style: React.CSSProperties = {
    backgroundColor: color,
    transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
    width: scale.width,
    height: scale.height,
    border: isSelected ? '#0a99ff 3px solid' : 'none',
  };
  const shapeProps = { style, ref: dragRef, onMouseDown };

  switch (type) {
    case 'rectangle':
      return <Rectangle {...shapeProps} />;
    case 'circle':
      return <Circle {...shapeProps} />;
  }
};
export default Shape;
