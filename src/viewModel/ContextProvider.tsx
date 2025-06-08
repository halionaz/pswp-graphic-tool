import { PropsWithChildren, useRef, useState } from 'react';
import {
  ControllerContext,
  ModelContext,
  SelectedObjectsContext,
} from './GraphicEditorContext';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectModel';
import { PositionType } from '@/models/types';
import GraphicEditorModel from '@/models/GraphicEditorModel';

const ContextProvider = ({ children }: PropsWithChildren) => {
  // ref를 통해 Model은 한 번만 생성되도록 함
  const modelRef = useRef<GraphicEditorModel>(new GraphicEditorModel());
  const model = modelRef.current;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* ---------- 3 컨트롤러(커맨드 프록시) ---------- */
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

  return (
    <ModelContext.Provider value={model}>
      <SelectedObjectsContext.Provider value={selectedIds}>
        <ControllerContext.Provider
          value={{
            add,
            remove,
            update,
            move,
            select,
            withSelect,
            clearSelect,
            clear,
            reorderLayers,
          }}
        >
          {children}
        </ControllerContext.Provider>
      </SelectedObjectsContext.Provider>
    </ModelContext.Provider>
  );
};

export default ContextProvider;
