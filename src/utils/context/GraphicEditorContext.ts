import { GraphicObjectInterface, GraphicObjectType } from '@/utils/types';
import { createContext } from 'react';

interface ControllerContextInterface {
  add: (type: GraphicObjectType) => void;
  remove: () => void;
  update: (id: string, updates: Partial<GraphicObjectInterface>) => void;
  select: (id: string) => void;
  clearSelect: () => void;
}

export const ObjectsContext = createContext<GraphicObjectInterface[]>([]);
export const SelectedObjectsContext = createContext<string[]>([]);
export const ControllerContext = createContext<
  ControllerContextInterface | undefined
>(undefined);
