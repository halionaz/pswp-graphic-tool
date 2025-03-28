import { GraphicObjectInterface } from '@/utils/types';
import { createContext } from 'react';

interface ControllerContextInterface {
  update: (id: string, updates: Partial<GraphicObjectInterface>) => void;
  select: (id: string) => void;
  clearSelect: () => void;
}

export const ObjectsContext = createContext<GraphicObjectInterface[]>([]);
export const SelectedIndexContext = createContext<number[]>([]);
export const ControllerContext = createContext<
  ControllerContextInterface | undefined
>(undefined);
