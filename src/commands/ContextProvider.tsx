import { PropsWithChildren, useRef, useState } from 'react';
import {
  ControllerContext,
  ControllerContextInterface,
  SelectedObjectsContext,
} from './GraphicEditorContext';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';
import { commandManager } from '@/commands/CommandManager';
import {
  AddCommand,
  Command,
  RemoveAllCommand,
  RemoveCommand,
  ReorderLayersCommand,
} from '@/commands/Command';
import { model } from '@/models/GraphicEditorModel';

const DEBOUNCE_TIME = 500;

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const debounceTimerRef = useRef<number>(null);

  // 커맨드
  const add = (type: GraphicObjectType) => {
    const cmd = new AddCommand(type);
    const addedObject = commandManager.executeCommand(
      cmd
    ) as unknown as GraphicObjectInterface;
    setSelectedIds([addedObject.id]);
  };

  const remove = () => {
    const cmd = new RemoveCommand(selectedIds);
    commandManager.executeCommand(cmd);
    clearSelect();
  };

  const update = (patch: Partial<GraphicObjectInterface>) => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    } else {
      const cmd = new Command();
      commandManager.executeCommand(cmd);
    }

    model.update(selectedIds, patch);
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
    }, DEBOUNCE_TIME);
  };

  const move = (diff: PositionType) => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    } else {
      const cmd = new Command();
      commandManager.executeCommand(cmd);
    }

    model.move(selectedIds, diff);
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
    }, DEBOUNCE_TIME);
  };

  const select = (id: string) => setSelectedIds([id]);
  const withSelect = (id: string) =>
    setSelectedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  const clearSelect = () => setSelectedIds([]);

  const clear = () => {
    clearSelect();
    const cmd = new RemoveAllCommand();
    commandManager.executeCommand(cmd);
  };

  const reorderLayers = (id: string, idx: number) => {
    const cmd = new ReorderLayersCommand(id, idx);
    commandManager.executeCommand(cmd);
  };

  const undo = () => commandManager.undo();

  const controller: ControllerContextInterface = {
    add,
    remove,
    update,
    move,
    select,
    withSelect,
    clearSelect,
    clear,
    reorderLayers,
    undo,
  };

  return (
    <SelectedObjectsContext.Provider value={selectedIds}>
      <ControllerContext.Provider value={controller}>
        {children}
      </ControllerContext.Provider>
    </SelectedObjectsContext.Provider>
  );
};

export default ContextProvider;
