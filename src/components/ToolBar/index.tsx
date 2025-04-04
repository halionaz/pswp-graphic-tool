import { ControllerContext } from '@/libs/context/GraphicEditorContext';
import { useContext } from 'react';

import s from './ToolBar.module.css';

const ToolBar = () => {
  const controller = useContext(ControllerContext);
  if (controller === undefined) return <div>Loading . . .</div>;
  return (
    <div className={s.Wrapper}>
      <button onClick={() => controller.add('rectangle')}>네모</button>
      <button onClick={() => controller.add('circle')}>원</button>
      <button onClick={() => controller.remove()}>삭제</button>
      <button onClick={() => controller.clear()}>초기화</button>
    </div>
  );
};
export default ToolBar;
