import { useContext, useEffect, useRef, useState } from 'react';

import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';
import { ScaleType } from '@/models/types';
import { ControllerContext } from '@/viewModels/GraphicEditorContext';

import s from './Handlers.module.css';

interface Props {
  object: GraphicObjectInterface & { scale: ScaleType };
}

const Handlers = ({ object }: Props) => {
  const { update } = useContext(ControllerContext);
  const [isResizing, setIsResizing] = useState<
    'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null
  >(null);
  const [isRotating, setIsRotating] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const rotationStartAngle = useRef(0);

  const handleResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    type: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  ) => {
    e.stopPropagation();
    setIsResizing(type);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    resizeStartSize.current = {
      width: object.scale.width,
      height: object.scale.height,
    };
  };

  const handleRotateStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsRotating(true);

    // 오브젝트의 중심점 계산
    const centerX = object.position.x;
    const centerY = object.position.y;

    // 시작 각도 계산 (마우스 위치와 중심점을 이용)
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

    rotationStartAngle.current = startAngle;
  };

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return;

      // 회전 각도를 라디안으로 변환
      const rotationRad = (object.rotation * Math.PI) / 180;

      // 마우스 이동 거리
      const dx = e.clientX - resizeStartPos.current.x;
      const dy = e.clientY - resizeStartPos.current.y;

      // 회전된 좌표계에서의 이동 거리 계산
      const rotatedDx = dx * Math.cos(rotationRad) + dy * Math.sin(rotationRad);
      const rotatedDy =
        -dx * Math.sin(rotationRad) + dy * Math.cos(rotationRad);

      let newWidth = resizeStartSize.current.width;
      let newHeight = resizeStartSize.current.height;

      if (isResizing === 'topLeft') {
        newWidth = resizeStartSize.current.width - rotatedDx * 2;
        newHeight = resizeStartSize.current.height - rotatedDy * 2;
      } else if (isResizing === 'topRight') {
        newWidth = resizeStartSize.current.width + rotatedDx * 2;
        newHeight = resizeStartSize.current.height - rotatedDy * 2;
      } else if (isResizing === 'bottomLeft') {
        newWidth = resizeStartSize.current.width - rotatedDx * 2;
        newHeight = resizeStartSize.current.height + rotatedDy * 2;
      } else if (isResizing === 'bottomRight') {
        newWidth = resizeStartSize.current.width + rotatedDx * 2;
        newHeight = resizeStartSize.current.height + rotatedDy * 2;
      }

      update({
        scale: {
          width: Math.max(20, newWidth),
          height: Math.max(20, newHeight),
        },
      });
    };

    const handleRotateMove = (e: MouseEvent) => {
      if (!isRotating) return;

      // 오브젝트의 중심점 계산
      const centerX = object.position.x;
      const centerY = object.position.y;

      // 현재 각도 계산
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

      // 각도 차이 계산 (라디안)
      const angleDiff = currentAngle - rotationStartAngle.current;

      // 각도를 도(degree)로 변환
      let newRotation = object.rotation + (angleDiff * 180) / Math.PI;

      // 각도를 0-360 범위로 정규화
      newRotation = ((newRotation % 360) + 360) % 360;

      update({
        rotation: newRotation,
      });

      // 다음 프레임을 위한 시작 각도 업데이트
      rotationStartAngle.current = currentAngle;
    };

    const handleResizeEnd = () => {
      setIsResizing(null);
    };

    const handleRotateEnd = () => {
      setIsRotating(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    }

    if (isRotating) {
      document.addEventListener('mousemove', handleRotateMove);
      document.addEventListener('mouseup', handleRotateEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.removeEventListener('mousemove', handleRotateMove);
      document.removeEventListener('mouseup', handleRotateEnd);
    };
  }, [isResizing, isRotating, update, object.rotation, object.position]);

  return (
    <>
      <div
        className={`${s.resizeHandler} ${s.resizeHandlerTopLeft}`}
        onMouseDown={e => handleResizeStart(e, 'topLeft')}
      />
      <div
        className={`${s.resizeHandler} ${s.resizeHandlerTopRight}`}
        onMouseDown={e => handleResizeStart(e, 'topRight')}
      />
      <div
        className={`${s.resizeHandler} ${s.resizeHandlerBottomLeft}`}
        onMouseDown={e => handleResizeStart(e, 'bottomLeft')}
      />
      <div
        className={`${s.resizeHandler} ${s.resizeHandlerBottomRight}`}
        onMouseDown={e => handleResizeStart(e, 'bottomRight')}
      />
      <div className={`${s.rotateHandler}`} onMouseDown={handleRotateStart} />
    </>
  );
};

export default Handlers;
