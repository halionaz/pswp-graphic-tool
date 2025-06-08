import { useContext } from 'react';

import s from './Canvas.module.css';

import { ControllerContext } from '@/viewModel/GraphicEditorContext';
import Shape from '@/views/Shape';
import useSubscribe from '@/libs/hooks/useSubscribe';

const Canvas = () => {
  const objects = useSubscribe();
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
