import { ControllerContext } from '@/models/GraphicEditorContext';
import { useContext } from 'react';

import s from './ToolBar.module.css';

const ToolBar = () => {
  const controller = useContext(ControllerContext);

  return (
    <div className={s.Wrapper}>
      <button onClick={() => controller.add('rectangle')}>Rectangle</button>
      <button onClick={() => controller.add('ellipse')}>Ellipse</button>
      <button onClick={() => controller.add('line')}>Line</button>
      <button onClick={() => controller.add('image')}>Image</button>
      <button onClick={() => controller.add('text')}>Text</button>
      <button onClick={() => controller.remove()}>Delete</button>
      <button onClick={() => controller.clear()}>Clear Canvas</button>
    </div>
  );
};
export default ToolBar;
