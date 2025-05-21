import { ContextMenuRequest, MenuItem } from './types';
import CanvasHandler from './handlers/CanvasHandler';
import ShapeHandler from './handlers/ShapeHandler';
import GroupHandler from './handlers/GroupHandler';

export function buildMenu(req: ContextMenuRequest): MenuItem[] {
  const items: MenuItem[] = [];
  const root = new CanvasHandler();
  root.setNext(new ShapeHandler()).setNext(new GroupHandler());
  root.handle(req, items);
  return items;
}
