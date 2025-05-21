import { ContextMenuRequest, MenuItem } from './types';

export abstract class MenuHandler {
  private next?: MenuHandler;

  setNext(next: MenuHandler): MenuHandler {
    this.next = next;
    return next;
  }

  handle(req: ContextMenuRequest, acc: MenuItem[]): void {
    this.build(req, acc);
    this.next?.handle(req, acc);
  }

  protected abstract build(req: ContextMenuRequest, acc: MenuItem[]): void;
}
