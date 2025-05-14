import {
  GraphicObjectChangeableInterface,
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/libs/types';
import { createContext } from 'react';

interface ControllerContextInterface {
  add: (type: GraphicObjectType) => void;
  remove: () => void;
  update: (updates: Partial<GraphicObjectInterface>) => void;
  updateByDiff: (updates: Partial<GraphicObjectChangeableInterface>) => void;
  select: (id: string) => void;
  clearSelect: () => void;
  clear: () => void;
  reorderLayers: (id: string, idx: number) => void;
  withSelect: (id: string) => void;
}

export const ObjectsContext = createContext<GraphicObjectInterface[]>([]);
export const SelectedObjectsContext = createContext<string[]>([]);
export const ControllerContext = createContext<
  ControllerContextInterface | undefined
>(undefined);
