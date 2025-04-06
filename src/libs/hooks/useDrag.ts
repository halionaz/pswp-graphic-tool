import { PositionType } from '@/libs/types';
import { getTranslateValues } from '@/libs/utils/getTranslateValues';
import { useCallback, useRef } from 'react';

const useDrag = (setPosition: (newPos: PositionType) => void) => {
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (dragRef.current === null) return;

      const startX = event.clientX;
      const startY = event.clientY;
      const rect = getTranslateValues(dragRef.current);
      const initialX = rect.x;
      const initialY = rect.y;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPosition({ x: initialX + dx, y: initialY + dy });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [setPosition]
  );

  return { dragRef, handleMouseDown };
};

export default useDrag;
