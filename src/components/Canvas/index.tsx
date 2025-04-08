import { useContext } from 'react';
import s from './Canvas.module.css';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';
import Shape from '@/components/Shape';
import { PositionType } from '@/libs/types';

const Canvas = () => {
  const objects = useContext(ObjectsContext);
  const selectedIndex = useContext(SelectedObjectsContext);
  const controller = useContext(ControllerContext);

  if (controller === undefined) return <div>Loading . . .</div>;

  const { updateByDiff, select, clearSelect } = controller;

  return (
    <div className={s.Canvas} onMouseDown={clearSelect}>
      {objects.map(({ type, color, position, scale, id, rotation }, index) => {
        return (
          <Shape
            key={index}
            type={type}
            isSelected={selectedIndex.indexOf(id) !== -1}
            color={color}
            scale={scale}
            rotation={rotation}
            position={position}
            updatePosition={(diff: PositionType) =>
              updateByDiff({ position: diff })
            }
            setIsSelected={() => select(id)}
          />
        );
      })}
    </div>
  );
};
export default Canvas;
