import useDrag from '@/hooks/useDrag';
import Rectangle from '@/views/shapes/Rectangle';

interface Props {
  isSelected: boolean;
  color: string;
  position: {
    x: number;
    y: number;
  };
  scale: {
    width: number;
    height: number;
  };
  zIndex: number;
  setPosition: (newPos: { x: number; y: number }) => void;
}
const Shape = ({ setPosition, ...props }: Props) => {
  const { dragRef, handleMouseDown } = useDrag(setPosition);
  return <Rectangle {...props} ref={dragRef} onMouseDown={handleMouseDown} />;
};
export default Shape;
