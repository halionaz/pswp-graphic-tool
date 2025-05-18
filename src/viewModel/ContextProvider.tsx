import { PropsWithChildren, useState } from 'react';

import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/viewModel/GraphicEditorContext';
import { PositionType } from '@/models/types';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectModel';
import objectFactory from '@/viewModel/ObjectFactory';

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [objects, setObjects] = useState<GraphicObjectInterface[]>([]);
  const [selectedObjectsID, setSelectedObjectsID] = useState<string[]>([]);

  const add = (type: GraphicObjectType) => {
    const newObject = objectFactory(type);
    setObjects(prev => [newObject, ...prev]);
    setSelectedObjectsID([newObject.id]);
  };

  const remove = () => {
    setObjects(prev =>
      prev.filter(({ id }) => selectedObjectsID.indexOf(id) === -1)
    );
    clearSelect();
  };

  /**
   * 새로운 값을 넣어 프로퍼티를 업데이트합니다.
   * @param updateProperties 새로운 값입니다.
   */
  const update = <T extends GraphicObjectInterface>(
    updateProperties: Partial<T>
  ) => {
    setObjects(prev =>
      prev.map(obj =>
        selectedObjectsID.indexOf(obj.id) === -1
          ? obj
          : { ...obj, ...updateProperties }
      )
    );
  };

  /**
   * diff를 넣어 오브젝트를 이동시킵니다.
   * @param diff 달라지는 위치 값 정보입니다.
   */
  const move = (diff: PositionType) => {
    setObjects(prev =>
      prev.map(obj => {
        if (selectedObjectsID.indexOf(obj.id) === -1) return obj;
        return {
          ...obj,
          position: {
            x: obj.position.x + diff.x,
            y: obj.position.y + diff.y,
          },
        };
      })
    );
  };

  const select = (id: string) => {
    if (selectedObjectsID.indexOf(id) === -1) {
      setSelectedObjectsID([id]);
    }
  };

  const withSelect = (id: string) => {
    if (selectedObjectsID.indexOf(id) === -1) {
      setSelectedObjectsID(prev => [...prev, id]);
    }
  };

  const clearSelect = () => {
    setSelectedObjectsID([]);
  };

  const clear = () => {
    clearSelect();
    setObjects([]);
  };

  const reorderLayers = (id: string, idx: number) => {
    let targetObject: GraphicObjectInterface | null = null;
    const newObjects = objects.filter(obj => {
      if (obj.id === id) targetObject = obj;
      return obj.id !== id;
    });
    if (targetObject && idx >= 0) {
      newObjects.splice(idx, 0, targetObject);
    }
    setObjects(newObjects);
  };

  return (
    <ObjectsContext.Provider value={objects}>
      <SelectedObjectsContext.Provider value={selectedObjectsID}>
        <ControllerContext.Provider
          value={{
            add,
            remove,
            update,
            select,
            withSelect,
            clearSelect,
            clear,
            move,
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
