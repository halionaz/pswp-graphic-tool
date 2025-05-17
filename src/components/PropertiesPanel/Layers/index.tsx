import { useContext, useState } from 'react';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';

import s from './Layers.module.css';

const Layers = () => {
  const objects = useContext(ObjectsContext);
  const selectedObjects = useContext(SelectedObjectsContext);
  const controller = useContext(ControllerContext);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (controller === undefined) return <div>Loading ...</div>;

  const { reorderLayers, select } = controller;

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedItem) {
      reorderLayers(draggedItem, targetIndex);
      setDraggedItem(null);
      setDragOverIndex(null);
    }
  };

  return (
    <div className={s.Container}>
      <h2>Layers</h2>
      <div className={s.LayerList}>
        {objects.map((val, index) => {
          const isSelected = selectedObjects.indexOf(val.id) !== -1;
          const isDragging = draggedItem === val.id;
          const isDragOver = dragOverIndex === index;

          return (
            <div
              key={val.id}
              className={`${s.LayerItem} 
            ${isSelected ? s.Selected : ''} 
            ${isDragging ? s.Dragging : ''} 
            ${isDragOver ? s.DragOver : ''}`}
              draggable
              onDragStart={() => handleDragStart(val.id)}
              onDragOver={e => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, index)}
              onClick={() => select(val.id)}
            >
              {val.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Layers;
