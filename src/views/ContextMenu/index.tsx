import { useEffect, useRef } from 'react';
import { MenuItem } from '@/viewModel/context-menu/types';
import styles from './ContextMenu.module.css';

interface Props {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    window.addEventListener('mousedown', down);
    return () => window.removeEventListener('mousedown', down);
  }, [onClose]);

  return (
    <ul
      ref={ref}
      className={styles.menu}
      style={{ left: x, top: y }}
    >
      {items.map((m, i) =>
        m.separator ? (
          <li key={`sep-${i}`} className={styles.separator} />
        ) : (
          <li
            key={m.id}
            className={m.enabled === false ? styles.disabled : styles.item}
            onClick={() => {
              if (m.enabled === false) return;
              m.action();
              onClose();
            }}
          >
            {m.label}
          </li>
        ),
      )}
    </ul>
  );
}
