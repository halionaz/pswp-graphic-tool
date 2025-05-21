import { MenuHandler } from '../MenuHandler';
import { ContextMenuRequest, MenuItem } from '../types';

export default class GroupHandler extends MenuHandler {
  protected build(req: ContextMenuRequest, acc: MenuItem[]): void {
    if (req.target !== 'group') return;

    acc.push(
      {
        id: 'ungroup',
        label: 'Ungroup',
        action: () => {/* hook into your ungroup API */},
      },
    );
  }
}
