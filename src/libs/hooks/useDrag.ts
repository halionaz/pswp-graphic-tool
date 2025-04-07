import { PositionType } from '@/libs/types';
import { getTranslateValues } from '@/libs/utils/getTranslateValues';
import { useCallback, useRef, useState } from 'react';

const useDrag = (setPosition: (newPos: PositionType) => void) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (dragRef.current === null) return;

      const startX = event.clientX;
      const startY = event.clientY;
      const rect = getTranslateValues(dragRef.current);
      const initialX = rect.x;
      const initialY = rect.y;
      setIsGrabbing(true);

      const onMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPosition({ x: initialX + dx, y: initialY + dy });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        setIsGrabbing(false);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [setPosition]
  );

  return { dragRef, handleMouseDown, isGrabbing };
};

export default useDrag;
