import { PropsWithChildren, useEffect, useRef, useState } from 'react';
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
  CommandWithDebounce,
  RemoveAllCommand,
  RemoveCommand,
  ReorderLayersCommand,
} from '@/commands/Command';
import { model } from '@/models/GraphicEditorModel';

const DEBOUNCE_TIME = 500;

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const debounceRef = useRef<{
    timer: number;
    cmd: CommandWithDebounce;
  } | null>(null);

  // Clean Up Debounce Timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current.timer);
      }
    };
  }, []);

  // Controller Functions
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
    let cmd: CommandWithDebounce;
    if (debounceRef.current !== null) {
      cmd = debounceRef.current.cmd;
      clearTimeout(debounceRef.current.timer);
    } else {
      cmd = new CommandWithDebounce();
      commandManager.executeCommand(cmd);
    }

    model.update(selectedIds, patch);

    debounceRef.current = {
      timer: setTimeout(() => {
        debounceRef.current = null;
        cmd.setDoneStates();
      }, DEBOUNCE_TIME),
      cmd,
    };
  };

  const move = (diff: PositionType) => {
    let cmd: CommandWithDebounce;
    if (debounceRef.current !== null) {
      cmd = debounceRef.current.cmd;
      clearTimeout(debounceRef.current.timer);
    } else {
      cmd = new CommandWithDebounce();
      commandManager.executeCommand(cmd);
    }

    model.move(selectedIds, diff);

    debounceRef.current = {
      timer: setTimeout(() => {
        debounceRef.current = null;
        cmd.setDoneStates();
      }, DEBOUNCE_TIME),
      cmd,
    };
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
