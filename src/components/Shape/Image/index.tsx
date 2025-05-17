import { forwardRef } from 'react';
import { ShapeViewProps } from '@/libs/types';

const Image = forwardRef<HTMLDivElement, ShapeViewProps>(
  ({ style, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          backgroundImage: `url(https://i.namu.wiki/i/6Gan-zxEhaYP36aBUs-yL7pMW06cBqd4It6FbLfZopirrtNArvXJoPrBsIjADeadfMiz2tCrBRY8rnsYFIVnJQ.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onMouseDown={onMouseDown}
      />
    );
  }
);

export default Image;
