import useDrag from '@/utils/hooks/useDrag';
import {
  GraphicObjectType,
  GraphicObjectViewInterface,
  PositionType,
} from '@/utils/types';
import Circle from '@/components/Shape/Circle';
import Rectangle from '@/components/Shape/Rectangle';

interface Props extends GraphicObjectViewInterface {
  type: GraphicObjectType;
  setIsSelected: () => void;
  setPosition: (newPos: PositionType) => void;
}

const Shape = ({ type, setPosition, setIsSelected, ...props }: Props) => {
  const { dragRef, handleMouseDown } = useDrag(setPosition);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMouseDown(e);
    setIsSelected();
  };

  const shapeProps = { ...props, ref: dragRef, onMouseDown };

  switch (type) {
    case 'rectangle':
      return <Rectangle {...shapeProps} />;
    case 'circle':
      return <Circle {...shapeProps} />;
  }
};
export default Shape;
