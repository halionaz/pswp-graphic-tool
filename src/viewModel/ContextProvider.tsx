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
  // ref를 통해 Model은 한 번만 생성되도록 함
  const modelRef = useRef<GraphicEditorModel>(new GraphicEditorModel());
  const model = modelRef.current;

  // React에서는 Model의 스냅샷, 복제본만 렌더링
  // TODO: 흠 근데 각 오브젝트 View Model이 각각 모델을 구독하고 있어야 하지 않을까
  // TODO: objects State 없애기
  const [objects, setObjects] = useState<GraphicObjectInterface[]>(
    model.snapshot
  );
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

  const reorderLayers = model.reorder;

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
