import { PropsWithChildren, useState } from 'react';

import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/utils/context/GraphicEditorContext';
import { GraphicObjectInterface, GraphicObjectType } from '@/utils/types';

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [objects, setObjects] = useState<GraphicObjectInterface[]>([]);
  const [selectedObjectsID, setSelectedObjectsID] = useState<string[]>([]);

  const add = (type: GraphicObjectType) => {
    const newObject: GraphicObjectInterface = {
      id: crypto.randomUUID(),
      type,
      color: 'gray',
      position: { x: 100, y: 100 }, // TODO: 현재 마우스 위치 or 선택된 오브젝트 옆에 생성
      scale: { height: 100, width: 100 },
      zIndex: 1,
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

  const update = (
    id: string,
    updateProperties: Partial<GraphicObjectInterface>
  ) => {
    setObjects(prev =>
      prev.map(obj => (id === obj.id ? { ...obj, ...updateProperties } : obj))
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

  return (
    <ObjectsContext.Provider value={objects}>
      <SelectedObjectsContext.Provider value={selectedObjectsID}>
        <ControllerContext.Provider
          value={{ add, remove, update, select, clearSelect }}
        >
          {children}
        </ControllerContext.Provider>
      </SelectedObjectsContext.Provider>
    </ObjectsContext.Provider>
  );
};

export default ContextProvider;
