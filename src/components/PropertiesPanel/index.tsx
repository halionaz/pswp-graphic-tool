import { useContext } from 'react';
import s from './PropertiesPanel.module.css';
import {
  ObjectsContext,
  SelectedObjectsContext,
} from '@/utils/context/GraphicEditorContext';

const PropertiesPanel = () => {
  const objects = useContext(ObjectsContext);
  const selectedObjects = useContext(SelectedObjectsContext);

  const data = objects.filter(val => selectedObjects.indexOf(val.id) !== -1);

  const viewData = data[0];

  return (
    <div className={s.Container}>
      {viewData && (
        <>
          <h1>{viewData.type}</h1>
          <form>
            <label>Pos X</label>
            <input value={viewData.position.x} />
          </form>
          <form>
            <label>Pos Y</label>
            <input value={viewData.position.y} />
          </form>
          <form>
            <label>Width</label>
            <input value={viewData.scale.width} />
          </form>
          <form>
            <label>Height</label>
            <input value={viewData.scale.height} />
          </form>
          <form>
            <label>Color</label>
            <input value={viewData.color} />
          </form>
          <form>
            <label>Z-Index</label>
            <input value={viewData.zIndex} />
          </form>
        </>
      )}
    </div>
  );
};
export default PropertiesPanel;
