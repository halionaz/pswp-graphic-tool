import { useContext } from 'react';

import s from './Properties.module.css';

import {
  ControllerContext,
  ObjectsContext,
  SelectedObjectsContext,
} from '@/libs/context/GraphicEditorContext';

const Properties = () => {
  // TODO: View, Controller 분리 & 정리
  const objects = useContext(ObjectsContext);
  const controller = useContext(ControllerContext);
  const selectedObjects = useContext(SelectedObjectsContext);

  const data = objects.filter(val => selectedObjects.indexOf(val.id) !== -1);

  const viewData = data[0];

  if (controller === undefined) return <div>Loading ...</div>;
  if (viewData === undefined) return null;

  const { update } = controller;

  return (
    <div className={s.Container}>
      <h2>{viewData.type}</h2>
      <div className={s.InputForm}>
        <label>Title</label>
        <input
          type="text"
          value={viewData.title}
          onChange={e => update({ title: e.target.value })}
        />
      </div>
      <div className={s.FormContainer}>
        <div className={s.InputForm}>
          <label>Pos X</label>
          <input
            className={s.Input}
            type="number"
            value={viewData.position.x}
            onChange={e =>
              update({
                position: { ...viewData.position, x: Number(e.target.value) },
              })
            }
          />
        </div>
        <div className={s.InputForm}>
          <label>Pos Y</label>
          <input
            className={s.Input}
            type="number"
            value={viewData.position.y}
            onChange={e =>
              update({
                position: { ...viewData.position, y: Number(e.target.value) },
              })
            }
          />
        </div>
      </div>
      <div className={s.InputForm}>
        <label>Rotation</label>
        <div className={s.FormContainer}>
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
          <input
            className={s.Input}
            type="number"
            value={viewData.rotation}
            onChange={e => update({ rotation: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className={s.FormContainer}>
        <div className={s.InputForm}>
          <label>Width</label>
          <input
            className={s.Input}
            type="number"
            value={viewData.scale.width}
            onChange={e =>
              update({
                scale: { ...viewData.scale, width: Number(e.target.value) },
              })
            }
          />
        </div>
        <div className={s.InputForm}>
          <label>Height</label>
          <input
            className={s.Input}
            type="number"
            value={viewData.scale.height}
            onChange={e =>
              update({
                scale: { ...viewData.scale, height: Number(e.target.value) },
              })
            }
          />
        </div>
      </div>
      <div className={s.InputForm}>
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
    </div>
  );
};
export default Properties;
