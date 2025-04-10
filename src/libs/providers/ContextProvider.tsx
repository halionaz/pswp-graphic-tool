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
    const scale = { height: 100, width: 100};
    const newObject: GraphicObjectInterface = {
      id: crypto.randomUUID(),
      type,
      color: '#919191',
      position: {
        x: Math.max((window.innerWidth - scale.width) / 2, 0),
        y: Math.max((window.innerHeight - scale.height) / 2, 0),
      }, // TODO: 현재 마우스 위치 or 선택된 오브젝트 옆에 생성
      scale: scale,
      rotation: 0,
    };
    setObjects(prev => [...prev, newObject]);
    setSelectedObjectsID(prev => [...prev, newObject.id]);
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

  return (
    <ObjectsContext.Provider value={objects}>
      <SelectedObjectsContext.Provider value={selectedObjectsID}>
        <ControllerContext.Provider
          value={{
            add,
            remove,
            update,
            select,
            clearSelect,
            clear,
            updateByDiff,
          }}
        >
          {children}
        </ControllerContext.Provider>
      </SelectedObjectsContext.Provider>
    </ObjectsContext.Provider>
  );
};

export default ContextProvider;
