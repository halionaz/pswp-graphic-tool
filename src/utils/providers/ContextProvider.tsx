import { PropsWithChildren, useState } from 'react';

import {
  ControllerContext,
  ObjectsContext,
  SelectedIndexContext,
} from '@/utils/context/GraphicEditorContext';
import { GraphicObjectInterface } from '@/utils/types';

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [objects, setObjects] = useState<GraphicObjectInterface[]>([
    {
      id: '123',
      color: 'gray',
      position: { x: 10, y: 10 },
      scale: { width: 100, height: 100 },
      type: 'rectangle',
      zIndex: 1,
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  const update = (
    id: string,
    updateProperties: Partial<GraphicObjectInterface>
  ) => {
    setObjects(prev =>
      prev.map(obj => (obj.id === id ? { ...obj, ...updateProperties } : obj))
    );
  };

  const select = (id: string) => {
    const objectIndex = objects.findIndex(obj => obj.id === id);
    if (objectIndex !== -1 && selectedIndex.indexOf(objectIndex) === -1) {
      setSelectedIndex(prev => [...prev, objectIndex]);
    }
  };

  const clearSelect = () => {
    setSelectedIndex([]);
  };

  return (
    <ObjectsContext.Provider value={objects}>
      <SelectedIndexContext.Provider value={selectedIndex}>
        <ControllerContext.Provider value={{ update, select, clearSelect }}>
          {children}
        </ControllerContext.Provider>
      </SelectedIndexContext.Provider>
    </ObjectsContext.Provider>
  );
};

export default ContextProvider;
