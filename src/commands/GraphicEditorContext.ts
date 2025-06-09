import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';
import { createContext } from 'react';

interface CommandContextInterface {
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

export const SelectedObjectsContext = createContext<string[]>([]);
export const CommandContext = createContext<CommandContextInterface>({
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
