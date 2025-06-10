import { GraphicObjectInterface } from '@/models/GraphicObjectInterface';

export interface ShapeViewProps {
  style: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  object: GraphicObjectInterface;
  isSelected: boolean;
}
