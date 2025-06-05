import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from './GraphicEditorContext';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectModel';
import { PositionType } from '@/models/types';
import GraphicEditorModel from '@/models/GraphicEditorModel';

const ContextProvider = ({ children }: PropsWithChildren) => {
  /* ---------- 1 모델 한 개 생성 ---------- */
  const modelRef = useRef<GraphicEditorModel>();
  if (!modelRef.current) modelRef.current = new GraphicEditorModel();
  const model = modelRef.current;

  /* ---------- 2 React 쪽에 스냅샷만 보여준다 ---------- */
  const [objects, setObjects] = useState<GraphicObjectInterface[]>(model.snapshot);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* 모델이 notify()될 때마다 스냅샷 갱신 */
  useEffect(() => {
    const unsubscribe = model.subscribe(() => setObjects(model.snapshot));
    return unsubscribe;
  }, [model]);

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
    <ObjectsContext.Provider value={objects}>
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
    </ObjectsContext.Provider>
  );
};

export default ContextProvider;
