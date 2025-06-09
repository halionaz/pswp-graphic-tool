import { CommandContext } from '@/commands/GraphicEditorContext';
import { useContext } from 'react';

import s from './ToolBar.module.css';

const ToolBar = () => {
  const command = useContext(CommandContext);

  return (
    <div className={s.Wrapper}>
      <button onClick={() => command.add('rectangle')}>Rectangle</button>
      <button onClick={() => command.add('ellipse')}>Ellipse</button>
      <button onClick={() => command.add('line')}>Line</button>
      <button onClick={() => command.add('image')}>Image</button>
      <button onClick={() => command.add('text')}>Text</button>
      <button onClick={() => command.remove()}>Delete</button>
      <button onClick={() => command.clear()}>Clear Canvas</button>
    </div>
  );
};
export default ToolBar;
