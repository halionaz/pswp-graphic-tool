import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MenuItem } from '../../context-menu/types';

interface Props {
  x: number; y: number;
  items: MenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click / esc
  useEffect(() => {
    const off = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && onClose();
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('mousedown', off);
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('mousedown', off); window.removeEventListener('keydown', esc); };
  }, [onClose]);

  return createPortal(
    <div ref={ref} style={{ position:'fixed', top:y, left:x, zIndex:9999 }}
         className="rounded bg-white shadow-lg border text-sm">
      {items.map(i =>
        <div key={i.id}
             onClick={() => { if (!i.disabled) { i.action(); onClose(); } }}
             className={`px-3 py-1 hover:bg-gray-100 ${i.disabled && 'opacity-50 pointer-events-none'}`}>{i.label}</div>
      )}
    </div>,
    document.body
  );
}
