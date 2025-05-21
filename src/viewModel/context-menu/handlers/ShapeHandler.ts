import { MenuHandler } from '../MenuHandler';
import { ContextMenuRequest, MenuItem } from '../types';

export default class ShapeHandler extends MenuHandler {
  protected build(req: ContextMenuRequest, acc: MenuItem[]): void {
    if (req.target !== 'shape') return;

    acc.push(
      {
        id: 'cut',
        label: 'Cut',
        action: () => document.execCommand?.('cut'),
      },
      {
        id: 'copy',
        label: 'Copy',
        action: () => document.execCommand?.('copy'),
      },
      { separator: true } as MenuItem,
      {
        id: 'delete',
        label: 'Delete',
        action: () => {/* hook into your delete API */},
      },
    );
  }
}
