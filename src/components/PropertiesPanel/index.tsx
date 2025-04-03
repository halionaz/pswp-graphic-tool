import { useContext } from 'react';
import s from './PropertiesPanel.module.css';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';
import { GraphicObjectInterface } from '@/libs/types';

const PropertiesPanel = () => {
  // TODO: View, Controller 분리 & 정리
  const objects = useContext(ObjectsContext);
  const controller = useContext(ControllerContext);
  const selectedObjects = useContext(SelectedObjectsContext);

  const data = objects.filter(val => selectedObjects.indexOf(val.id) !== -1);

  const viewData = data[0];

  if (controller === undefined) return <div>Loading ...</div>;

  const { update } = controller;

  const onChange = (updates: Partial<GraphicObjectInterface>) => {
    update(viewData.id, updates);
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
                onChange({
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
                onChange({
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
                onChange({
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
                onChange({
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
                onChange({
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
                onChange({
                  color: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
      <div>
        <h2>Layer</h2>
        {objects.map((val, index) => {
          return <div key={index}>{val.type}</div>;
        })}
      </div>
    </div>
  );
};
export default PropertiesPanel;
