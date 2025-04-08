export interface PositionType {
  x: number;
  y: number;
}

export interface ScaleType {
  width: number;
  height: number;
}

export type GraphicObjectType =
  | 'rectangle'
  | 'ellipse'
  | 'line'
  | 'image'
  | 'text';

// Diff 값을 통해 제어 가능한 요소입니다
export interface GraphicObjectChangeableInterface {
  position: PositionType;
  rotation: number;
  scale: ScaleType;
}

export interface GraphicObjectInterface
  extends GraphicObjectChangeableInterface {
  id: string;
  type: GraphicObjectType;
  color: string;
}

export interface GraphicObjectViewInterface {
  isSelected: boolean;
  position: PositionType;
  rotation: number;
  scale: ScaleType;
  color: string;
}

export interface ShapeViewProps {
  style: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}
