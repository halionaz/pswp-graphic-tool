import { useRef } from 'react';
import styles from './Canvas.module.css';
import useContextMenu from '@/libs/hooks/useContextMenu';
import ContextMenu from '@/views/ContextMenu';
import { buildMenu } from '@/viewModel/context-menu';
import ShapeLayer from '@/views/Shape';              // adjust if path differs

export default function Canvas() {
  const ref = useRef<HTMLDivElement>(null);
  const { req, open, close } = useContextMenu();

  return (
    <>
      <div
        ref={ref}
        className={styles.canvas}
        onContextMenu={(e) => open(e, 'canvas')}
      >
        <ShapeLayer
          onShapeContextMenu={(e: React.MouseEvent, id: string) =>
            open(e, 'shape', [id])
          }
          onGroupContextMenu={(
            e: React.MouseEvent,
            ids: string[],
          ) => open(e, 'group', ids)}
        />
      </div>

      {req && (
        <ContextMenu
          x={req.x}
          y={req.y}
          items={buildMenu(req)}
          onClose={close}
        />
      )}
    </>
  );
}
