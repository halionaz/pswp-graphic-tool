import { useContext } from 'react';

import s from './Properties.module.css';

import {
  ControllerContext,
  SelectedObjectsContext,
} from '@/viewModel/GraphicEditorContext';
import useObjectsSubscribe from '@/libs/hooks/useSubscribe';

const Properties = () => {
  const objects = useObjectsSubscribe();
  const controller = useContext(ControllerContext);
  const selectedObjects = useContext(SelectedObjectsContext);

  const data = objects.filter(val => selectedObjects.indexOf(val.id) !== -1);

  const viewData = data[0];

  if (viewData === undefined) return null;

  const hasScale =
    viewData.type === 'rectangle' ||
    viewData.type === 'ellipse' ||
    viewData.type === 'image';
  const isText = viewData.type === 'text';
  const isLine = viewData.type === 'line';
  const isImage = viewData.type === 'image';

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
      {hasScale && (
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
      )}
      {isLine && (
        <div className={s.FormContainer}>
          <div className={s.InputForm}>
            <label>Length</label>
            <input
              className={s.Input}
              type="number"
              value={viewData.length}
              onChange={e => update({ length: Number(e.target.value) })}
            />
          </div>
          <div className={s.InputForm}>
            <label>Stroke</label>
            <input
              className={s.Input}
              type="number"
              value={viewData.strokeWidth}
              onChange={e =>
                update({
                  strokeWidth: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      )}
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
      {isImage && (
        <div className={s.InputForm}>
          <label>Image</label>
          <input
            type="file"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  update({ imgSrc: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}
      {isText && (
        <div className={s.FormContainer}>
          <div className={s.InputForm}>
            <label>Text Color</label>
            <input
              type="color"
              value={viewData.textColor}
              onChange={e => update({ textColor: e.target.value })}
            />
          </div>
          <div className={s.InputForm}>
            <label>Font Size</label>
            <input
              className={s.Input}
              type="number"
              value={viewData.textSize}
              onChange={e => update({ textSize: Number(e.target.value) })}
            />
          </div>
          <div className={s.InputForm}></div>
        </div>
      )}
    </div>
  );
};
export default Properties;
