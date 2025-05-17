import { useContext } from 'react';
import s from './Canvas.module.css';
import {
  ControllerContext,
  ObjectsContext,
} from '@/viewModel/GraphicEditorContext';
import Shape from '@/views/Shape';

const Canvas = () => {
  const objects = useContext(ObjectsContext);
  const controller = useContext(ControllerContext);

  const { clearSelect } = controller;

  return (
    <div className={s.Canvas} onMouseDown={clearSelect}>
      {objects
        .slice(0)
        .reverse()
        .map(object => {
          return <Shape key={object.id} object={object} />;
        })}
    </div>
  );
};
export default Canvas;
