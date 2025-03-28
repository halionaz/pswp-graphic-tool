import Shape from '@/components/Shape';
import { useState } from 'react';

interface Props {
  isSelected: boolean;
  setIsSelected: () => void;
}
const Object = ({ isSelected, setIsSelected }: Props) => {
  const [color, setColor] = useState('gray');
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [scale, setScale] = useState({ width: 100, height: 100 });
  const [zIndex, setZIndex] = useState(1);

  return (
    <Shape
      isSelected={isSelected}
      color={color}
      position={position}
      scale={scale}
      zIndex={zIndex}
      setPosition={setPosition}
    />
  );
};
export default Object;
