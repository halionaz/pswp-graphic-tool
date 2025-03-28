import { ControllerContext } from '@/utils/context/GraphicEditorContext';
import { useContext } from 'react';

import s from './ToolBar.module.css';

const ToolBar = () => {
  const controller = useContext(ControllerContext);
  if (controller === undefined) return <div>Loading . . .</div>;
  return (
    <div className={s.Wrapper}>
      <button onClick={() => controller.add('rectangle')}>네모</button>
      <button onClick={() => controller.remove()}>삭제</button>
    </div>
  );
};
export default ToolBar;
