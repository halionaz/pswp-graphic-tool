import useDrag from '@/utils/hooks/useDrag';
import { GraphicObjectViewInterface, PositionType } from '@/utils/types';
import Rectangle from '@/views/shapes/Rectangle';

interface Props extends GraphicObjectViewInterface {
  setIsSelected: () => void;
  setPosition: (newPos: PositionType) => void;
}

const Shape = ({ setPosition, setIsSelected, ...props }: Props) => {
  const { dragRef, handleMouseDown } = useDrag(setPosition);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleMouseDown(e);
    setIsSelected();
  };

  return <Rectangle {...props} ref={dragRef} onMouseDown={onMouseDown} />;
};
export default Shape;
