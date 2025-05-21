export type TargetType = 'canvas' | 'shape' | 'group';

export interface ContextMenuRequest {
  x: number;
  y: number;
  target: TargetType;
  selectionIds: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  enabled?: boolean;
  separator?: boolean;
  action: () => void;
}