import { GraphicObjectInterface } from '@/models/GraphicObjectModel';

export interface ShapeViewProps {
  style: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  object: GraphicObjectInterface;
  isSelected: boolean;
}
