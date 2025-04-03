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
  rotation: number;
  scale: ScaleType;
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
