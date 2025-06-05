import { Observable } from './Observables';
import {
  GraphicObjectType,
  GraphicObjectInterface,
} from './GraphicObjectModel';
import { PositionType } from './types';
import objectFactory from '@/viewModel/ObjectFactory';

interface Command {
  execute(): void;
  undo(): void;
}

export default class GraphicEditorModel extends Observable {
  private objects: GraphicObjectInterface[] = [];

  get snapshot(): GraphicObjectInterface[] {
    // React 리렌더를 유도하려면 얕은 복사본이 필요
    return [...this.objects];
  }

  add(type: GraphicObjectType): GraphicObjectInterface {
    const obj = objectFactory(type);
    this.objects.unshift(obj);
    this.notify();
    return obj;
  }

  remove(ids: string[]) {
    if (!ids.length) return;
    this.objects = this.objects.filter(o => !ids.includes(o.id));
    this.notify();
  }

  update(ids: string[], patch: Partial<GraphicObjectInterface>) {
    if (!ids.length) return;
    this.objects = this.objects.map(o =>
      ids.includes(o.id) ? { ...o, ...patch } : o,
    );
    this.notify();
  }

  move(ids: string[], diff: PositionType) {
    if (!ids.length) return;
    this.objects = this.objects.map(o =>
      ids.includes(o.id)
        ? {
            ...o,
            position: { x: o.position.x + diff.x, y: o.position.y + diff.y },
          }
        : o,
    );
    this.notify();
  }

  reorder(id: string, targetIdx: number) {
    const idx = this.objects.findIndex(o => o.id === id);
    if (idx === -1 || targetIdx < 0) return;
    const [obj] = this.objects.splice(idx, 1);
    this.objects.splice(targetIdx, 0, obj);
    this.notify();
  }

  /* TODO: Undo/Redo */
}
