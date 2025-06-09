import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';
import { createContext } from 'react';

export interface ControllerContextInterface {
  add: (type: GraphicObjectType) => void;
  remove: () => void;
  update: (updates: Partial<GraphicObjectInterface>) => void;
  move: (diff: PositionType) => void;
  select: (id: string) => void;
  clearSelect: () => void;
  clear: () => void;
  reorderLayers: (id: string, idx: number) => void;
  withSelect: (id: string) => void;
  undo: () => void;
  redo: () => void;
}

export const SelectedObjectsContext = createContext<string[]>([]);
export const ControllerContext = createContext<ControllerContextInterface>({
  add: () => {},
  remove: () => {},
  update: () => {},
  move: () => {},
  select: () => {},
  clearSelect: () => {},
  clear: () => {},
  reorderLayers: () => {},
  withSelect: () => {},
  undo: () => {},
  redo: () => {},
});
