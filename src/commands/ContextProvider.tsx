import { PropsWithChildren, useState } from 'react';
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
  MoveCommand,
  RemoveAllCommand,
  RemoveCommand,
  ReorderLayersCommand,
  UpdateCommand,
} from '@/commands/Command';

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
    const cmd = new UpdateCommand(selectedIds, patch);
    commandManager.executeCommand(cmd);
  };

  const move = (diff: PositionType) => {
    const cmd = new MoveCommand(selectedIds, diff);
    commandManager.executeCommand(cmd);
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
  const redo = () => commandManager.redo();

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
    redo,
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
