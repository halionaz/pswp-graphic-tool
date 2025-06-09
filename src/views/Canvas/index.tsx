import { useContext } from 'react';

import s from './Canvas.module.css';

import Shape from '@/views/Shape';
import useSubscribe from '@/hooks/useSubscribe';
import { CommandContext } from '@/commands/GraphicEditorContext';

const Canvas = () => {
  const objects = useSubscribe();
  const command = useContext(CommandContext);

  const { clearSelect } = command;

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
