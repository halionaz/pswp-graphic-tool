import { MenuHandler } from '../MenuHandler';
import { ContextMenuRequest, MenuItem } from '../types';

export default class CanvasHandler extends MenuHandler {
  protected build(req: ContextMenuRequest, acc: MenuItem[]): void {
    if (req.target !== 'canvas') return;

    acc.push({
      id: 'paste',
      label: 'Paste',
      action: () => document.execCommand?.('paste'),
    });
  }
}
