import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

import s from './Text.module.css';

const Text = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Text}
        style={{
          ...style,
          cursor: 'text',
          width: 'fit-content',
          height: 'fit-content',
        }}
        onMouseDown={onMouseDown}
        contentEditable
        suppressContentEditableWarning
      >
        텍스트를 입력하세요
      </div>
    );
  }
);

export default Text;
