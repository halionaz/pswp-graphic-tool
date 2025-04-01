import { useContext } from 'react';
import s from './Canvas.module.css';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/utils/context/GraphicEditorContext';
import Shape from '@/components/Shape';
import { PositionType } from '@/utils/types';

const Canvas = () => {
  const objects = useContext(ObjectsContext);
  const selectedIndex = useContext(SelectedObjectsContext);
  const controller = useContext(ControllerContext);

  if (controller === undefined) return <div>Loading . . .</div>;

  const { update, select, clearSelect } = controller;

  return (
    <div className={s.Canvas} onMouseDown={clearSelect}>
      {objects.map(({ type, color, position, scale, zIndex, id }, index) => {
        // TODO: Apply Factory Pattern
        const setPosition = (newPos: PositionType) => {
          update(id, { position: newPos });
        };
        const setIsSelected = () => {
          select(id);
        };

        return (
          <Shape
            key={index}
            type={type}
            isSelected={selectedIndex.indexOf(id) !== -1}
            color={color}
            scale={scale}
            zIndex={zIndex}
            position={position}
            setPosition={setPosition}
            setIsSelected={setIsSelected}
          />
        );
      })}
    </div>
  );
};
export default Canvas;
