import { useContext, useState } from 'react';

import s from './Layers.module.css';

import useSubscribe from '@/hooks/useSubscribe';
import {
  ControllerContext,
  SelectedObjectsContext,
} from '@/commands/GraphicEditorContext';

const Layers = () => {
  const objects = useSubscribe();
  const selectedObjects = useContext(SelectedObjectsContext);
  const { reorderLayers, select } = useContext(ControllerContext);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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
