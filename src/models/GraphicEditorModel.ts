import { Observable } from './Observables';
import {
  GraphicObjectType,
  GraphicObjectInterface,
} from './GraphicObjectInterface';
import { PositionType } from './types';
import objectFactory from '@/models/ObjectFactory';

const walk = (
  node: GraphicObjectInterface,
  fn: (o: GraphicObjectInterface) => GraphicObjectInterface)
  : GraphicObjectInterface => {
  if (node.type === 'group') {
    return {
      ...fn(node),
      children: node.children.map(c => walk(c, fn)),
    };
  }
  return fn(node);
};

export default class GraphicEditorModel extends Observable {
  private objects: GraphicObjectInterface[] = [];

  get snapshot(): GraphicObjectInterface[] {
    return this.objects;
  }

  add(type: GraphicObjectType): GraphicObjectInterface {
    const obj = objectFactory(type);
    this.objects.unshift(obj);
    this.notify();
    return obj;
  }

  remove(ids: string[]) {
    if (ids.length === 0) return;
    this.objects = this.objects.filter(o => !ids.includes(o.id));
    this.notify();
  }

  update<T extends GraphicObjectInterface>(ids: string[], patch: Partial<T>) {
    if (ids.length === 0) return;
    this.objects = this.objects.map(o =>
      ids.includes(o.id) ? { ...o, ...patch } : o
    );
    this.notify();
  }

  move(ids: string[], diff: PositionType) {
    if (!ids.length) return;
    const mover = (o: GraphicObjectInterface): GraphicObjectInterface => {
      if (ids.includes(o.id)) {
        return {
          ...o,
          position: { x: o.position.x + diff.x, y: o.position.y + diff.y },
        };
      }
      return o;
    };
    this.objects = this.objects.map(o => walk(o, mover));
    this.notify();
  }

  group(ids: string[]) {
    if (ids.length < 2) return;

    // pull only root-level objects; if a child is selected the caller
    // should already have bubbled the group id up.
    const picked: GraphicObjectInterface[] = [];
    this.objects = this.objects.filter(o => {
      if (ids.includes(o.id)) {
        picked.push(o);
        return false;            // remove from root list
      }
      return true;
    });

    if (!picked.length) return;

    const group: GroupInterface = {
      id: crypto.randomUUID(),
      title: 'group',
      type: 'group',
      color: 'transparent',
      position: { x: 0, y: 0 },     // not rendered
      rotation: 0,
      children: picked,
    };

    this.objects.unshift(group);
    this.notify();
  }

  ungroup(ids: string[]) {
    if (!ids.length) return;
    const newRoots: GraphicObjectInterface[] = [];

    this.objects = this.objects.flatMap(o => {
      if (ids.includes(o.id) && o.type === 'group') {
        newRoots.push(...o.children);
        return [];               // delete the group
      }
      return [o];
    });

    // keep original Z-order by pushing at the top
    this.objects.unshift(...newRoots);
    this.notify();
  }

  reorder(id: string, targetIdx: number) {
    const idx = this.objects.findIndex(o => o.id === id);
    if (idx === -1 || targetIdx < 0) return;
    const [obj] = this.objects.splice(idx, 1);
    this.objects.splice(targetIdx, 0, obj);
    this.notify();
  }

  restore(objects: GraphicObjectInterface[]) {
    this.objects = objects;
    this.notify();
  }
}

export const model = new GraphicEditorModel();
