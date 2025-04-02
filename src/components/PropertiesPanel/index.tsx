import { useContext } from 'react';
import s from './PropertiesPanel.module.css';
import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/utils/context/GraphicEditorContext';
import { GraphicObjectInterface } from '@/utils/types';

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
          <form>
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
          </form>
          <form>
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
          </form>
          <form>
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
          </form>
          <form>
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
          </form>
          <form>
            <label>Color</label>
            <input
              value={viewData.color}
              onChange={e =>
                onChange({
                  color: e.target.value,
                })
              }
            />
          </form>
          <form>
            <label>Z-Index</label>
            <input
              type="number"
              value={viewData.zIndex}
              onChange={e =>
                onChange({
                  zIndex: Number(e.target.value),
                })
              }
            />
          </form>
        </>
      )}
    </div>
  );
};
export default PropertiesPanel;
