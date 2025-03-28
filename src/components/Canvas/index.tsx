import Object from '@/controllers/Object';
import s from './Canvas.module.css';

const Canvas = () => {
  return (
    <div className={s.Canvas}>
      <Object isSelected={false} setIsSelected={() => {}} />
    </div>
  );
};
export default Canvas;
