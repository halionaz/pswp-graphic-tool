import { GraphicObjectInterface } from '@/models/GraphicObjectModel';
import { ScaleType } from '@/models/types';
import Handlers from '@/views/Shape/Handlers';
import { ShapeViewProps } from '@/views/Shape/types';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

// TODO: 현재 적용되지 않는 코드. HOC 또는 더 좋은 방식으로 데코레이터 패턴 적용하기
const withHandlers = <T extends ShapeViewProps>(
  WrappedComponent: ForwardRefExoticComponent<T & RefAttributes<HTMLDivElement>>
) => {
  return function WithHandlers(
    props: T & { object: GraphicObjectInterface & { scale: ScaleType } }
  ) {
    console.log(props.isSelected);
    return (
      <>
        {props.isSelected && (
          <div
            style={{
              ...props.style,
              backgroundColor: 'transparent',
              outline: 'none',
              width: props.object.scale.width,
              height: props.object.scale.height,
            }}
          >
            <Handlers object={props.object} />
          </div>
        )}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withHandlers;
