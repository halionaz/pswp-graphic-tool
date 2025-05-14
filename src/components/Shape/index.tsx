import useDrag from '@/libs/hooks/useDrag';
import {
  GraphicObjectType,
  GraphicObjectViewInterface,
  PositionType,
} from '@/libs/types';
import Ellipse from '@/components/Shape/Ellipse';
import Rectangle from '@/components/Shape/Rectangle';

interface Props extends GraphicObjectViewInterface {
  type: GraphicObjectType;
  setIsSelected: () => void;
  updatePosition: (diff: PositionType) => void;
}

const Shape = ({
  type,
  updatePosition,
  setIsSelected,
  color,
  position,
  scale,
  isSelected,
  rotation,
}: Props) => {
  const { dragRef, handleMouseDown, isDragging } = useDrag(updatePosition);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelected();
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
  }
};
export default Shape;
