import { useState, useCallback } from 'react';
import { ContextMenuRequest, TargetType } from '@/viewModel/context-menu/types';

export default function useContextMenu() {
  const [req, setReq] = useState<ContextMenuRequest | null>(null);

  const open = useCallback(
    (
      e: React.MouseEvent,
      target: TargetType,
      selectionIds: string[] = [],
    ) => {
      e.preventDefault();
      setReq({
        x: e.clientX,
        y: e.clientY,
        target,
        selectionIds,
      });
    },
    [],
  );

  const close = useCallback(() => setReq(null), []);

  return { req, open, close };
}
