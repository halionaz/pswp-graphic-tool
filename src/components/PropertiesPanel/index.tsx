import { useContext, useState } from 'react';
import s from './PropertiesPanel.module.css';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';

const PropertiesPanel = () => {
  // TODO: View, Controller 분리 & 정리
  const objects = useContext(ObjectsContext);
  const controller = useContext(ControllerContext);
  const selectedObjects = useContext(SelectedObjectsContext);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const data = objects.filter(val => selectedObjects.indexOf(val.id) !== -1);

  const viewData = data[0];

  if (controller === undefined) return <div>Loading ...</div>;

  const { update, reorderLayers, select } = controller;

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
      {viewData && (
        <>
          <h1>{viewData.type}</h1>
          <div>
            <label>Pos X</label>
            <input
              type="number"
              value={viewData.position.x}
              onChange={e =>
                update({
                  position: { ...viewData.position, x: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label>Pos Y</label>
            <input
              type="number"
              value={viewData.position.y}
              onChange={e =>
                update({
                  position: { ...viewData.position, y: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label>Rotation</label>
            <input
              type="range"
              min="0"
              max="360"
              value={viewData.rotation}
              onChange={e =>
                update({
                  rotation: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label>Width</label>
            <input
              type="number"
              value={viewData.scale.width}
              onChange={e =>
                update({
                  scale: { ...viewData.scale, width: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              value={viewData.scale.height}
              onChange={e =>
                update({
                  scale: { ...viewData.scale, height: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label>Color</label>
            <input
              type="color"
              value={viewData.color}
              onChange={e =>
                update({
                  color: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
      <div>
        <h2>Layer</h2>
        <div className={s.LayerList}>
          {objects.map((val, index) => {
            const isSelected = selectedObjects.indexOf(val.id) !== -1;
            const isDragging = draggedItem === val.id;
            const isDragOver = dragOverIndex === index;

            return (
              <div
                key={index}
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
    </div>
  );
};
export default PropertiesPanel;
