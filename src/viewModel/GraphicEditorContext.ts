import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectModel';
import { PositionType } from '@/models/types';
import { createContext } from 'react';

interface ControllerContextInterface {
  add: (type: GraphicObjectType) => void;
  remove: () => void;
  update: (updates: Partial<GraphicObjectInterface>) => void;
  move: (diff: PositionType) => void;
  select: (id: string) => void;
  clearSelect: () => void;
  clear: () => void;
  reorderLayers: (id: string, idx: number) => void;
  withSelect: (id: string) => void;
}

export const ObjectsContext = createContext<GraphicObjectInterface[]>([]);
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
});
