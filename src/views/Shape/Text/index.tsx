import { forwardRef } from 'react';

import s from './Text.module.css';

import { ShapeViewProps } from '@/views/Shape/types';
import { TextInterface } from '@/models/GraphicObjectInterface';

interface TextViewProps extends ShapeViewProps {
  object: TextInterface;
}
const Text = forwardRef<HTMLDivElement, TextViewProps>(
  ({ style, onMouseDown, object }, ref) => {
    return (
      <div
        ref={ref}
        className={s.Text}
        style={{
          ...style,
          cursor: 'text',
          color: object.textColor,
          fontSize: object.textSize,
        }}
        onMouseDown={onMouseDown}
        contentEditable
        suppressContentEditableWarning
      >
        {object.text}
      </div>
    );
  }
);

export default Text;
