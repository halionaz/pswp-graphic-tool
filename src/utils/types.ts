export interface PositionType {
  x: number;
  y: number;
}

export interface ScaleType {
  width: number;
  height: number;
}

export type GraphicObjectType = 'rectangle' | 'circle';

export interface GraphicObjectInterface {
  id: string;
  type: GraphicObjectType;
  position: PositionType;
  scale: ScaleType;
  color: string;
  zIndex: number;
}

export interface GraphicObjectViewInterface {
  isSelected: boolean;
  position: PositionType;
  scale: ScaleType;
  color: string;
  zIndex: number;
}

export interface ShapeViewProps extends GraphicObjectViewInterface {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}
