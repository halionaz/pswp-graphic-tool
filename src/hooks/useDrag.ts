import { PositionType } from '@/models/types';
import { useCallback, useEffect, useRef, useState } from 'react';

const useDrag = (updatePosition: (diff: PositionType) => void) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (dragRef.current === null) return;

    setIsDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      if (dragRef.current === null) return;

      setStartPosition({ x: moveEvent.clientX, y: moveEvent.clientY });
      updatePosition({
        x: moveEvent.clientX - startPosition.x,
        y: moveEvent.clientY - startPosition.y,
      });
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, updatePosition, startPosition]);

  return { dragRef, handleMouseDown, isDragging };
};

export default useDrag;
