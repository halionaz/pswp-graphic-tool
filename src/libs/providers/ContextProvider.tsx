import { PropsWithChildren, useState } from 'react';

import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';
import {
  GraphicObjectChangeableInterface,
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/libs/types';

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [objects, setObjects] = useState<GraphicObjectInterface[]>([]);
  const [selectedObjectsID, setSelectedObjectsID] = useState<string[]>([]);

  const add = (type: GraphicObjectType) => {
    const newObject: GraphicObjectInterface = {
      id: crypto.randomUUID(),
      title: `new ${type}`,
      type,
      color: '#D9D9D9',
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      scale: { width: 100, height: 100 },
      rotation: 0,
    };
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
  const update = (updateProperties: Partial<GraphicObjectInterface>) => {
    setObjects(prev =>
      prev.map(obj =>
        selectedObjectsID.indexOf(obj.id) === -1
          ? obj
          : { ...obj, ...updateProperties }
      )
    );
  };

  /**
   * diff를 넣어 프로퍼티를 업데이트합니다.
   * @param diff 달라지는 값 정보입니다. position, rotation, scale을 지정할 수 있습니다.
   */
  const updateByDiff = (diff: Partial<GraphicObjectChangeableInterface>) => {
    setObjects(prev =>
      prev.map(obj => {
        if (selectedObjectsID.indexOf(obj.id) === -1) return obj;

        const updateProperties = {
          position: diff.position
            ? {
                x: obj.position.x + diff.position.x,
                y: obj.position.y + diff.position.y,
              }
            : obj.position,
          rotation: diff.rotation ? obj.rotation + diff.rotation : obj.rotation,
          scale: diff.scale
            ? {
                width: obj.scale.width + diff.scale.width,
                height: obj.scale.height + diff.scale.height,
              }
            : obj.scale,
        };

        return {
          ...obj,
          ...updateProperties,
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
    if (targetObject) {
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
            updateByDiff,
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
