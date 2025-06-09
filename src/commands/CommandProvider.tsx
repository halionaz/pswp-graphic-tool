import { PropsWithChildren, useState } from 'react';
import {
  CommandContext,
  SelectedObjectsContext,
} from './GraphicEditorContext';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';
import { model } from '@/models/GraphicEditorModel';

const CommandProvider = ({ children }: PropsWithChildren) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 커맨드
  const add = (type: GraphicObjectType) => {
    const obj = model.add(type);
    setSelectedIds([obj.id]);
  };

  const remove = () => {
    model.remove(selectedIds);
    clearSelect();
  };

  const update = (patch: Partial<GraphicObjectInterface>) =>
    model.update(selectedIds, patch);

  const move = (diff: PositionType) => model.move(selectedIds, diff);

  const select = (id: string) => setSelectedIds([id]);
  const withSelect = (id: string) =>
    setSelectedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  const clearSelect = () => setSelectedIds([]);

  const clear = () => {
    clearSelect();
    model.remove(model.snapshot.map(o => o.id));
  };

  const reorderLayers = (id: string, idx: number) => model.reorder(id, idx);

  const command = {
    add,
    remove,
    update,
    move,
    select,
    withSelect,
    clearSelect,
    clear,
    reorderLayers,
  };

  return (
    <SelectedObjectsContext.Provider value={selectedIds}>
      <CommandContext.Provider value={command}>
        {children}
      </CommandContext.Provider>
    </SelectedObjectsContext.Provider>
  );
};

export default CommandProvider;
