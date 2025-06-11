import { Observable } from './Observables';
import {
  GraphicObjectType,
  GraphicObjectInterface,
  GroupInterface,
} from './GraphicObjectInterface';
import { PositionType } from './types';
import objectFactory from '@/models/ObjectFactory';
import walk from '@/utils/walk';

export default class GraphicEditorModel extends Observable {
  private objects: GraphicObjectInterface[] = [];

  get snapshot(): GraphicObjectInterface[] {
    return this.objects;
  }

  add(type: Exclude<GraphicObjectType, 'group'>): GraphicObjectInterface {
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

    const idSet = new Set(ids);
    this.objects = this.objects.map(o => walk(o, idSet, diff));
    this.notify();
  }

  group(ids: string[]) {
    if (ids.length < 2) return;

    const itemsToGroup: GraphicObjectInterface[] = [];
    const remainingObjects: GraphicObjectInterface[] = [];

    this.objects.forEach(o => {
      if (ids.includes(o.id)) {
        itemsToGroup.push(o);
      } else {
        remainingObjects.push(o);
      }
    });

    const group: GroupInterface = {
      id: crypto.randomUUID(),
      title: 'group',
      type: 'group',
      color: 'transparent',
      position: { x: 0, y: 0 },
      rotation: 0,
      children: itemsToGroup,
    };

    this.objects = [group, ...remainingObjects];
    this.notify();
    return group;
  }

  ungroup(ids: string[]) {
    if (!ids.length) return;
    const newRoots: GraphicObjectInterface[] = [];

    this.objects = this.objects.flatMap(o => {
      if (ids.includes(o.id) && o.type === 'group') {
        newRoots.push(...o.children);
        return o.children; // delete the group
      }
      return [o];
    });

    this.notify();
    return newRoots;
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

  public findSelectable(id: string): GraphicObjectInterface | undefined {
    // Helper to recursively search for an ID within an object and its children
    const search = (
      searchId: string,
      node: GraphicObjectInterface
    ): GraphicObjectInterface | null => {
      if (node.id === searchId) return node;
      if (node.type === 'group') {
        for (const child of node.children) {
          const found = search(searchId, child);
          if (found) return node; // Return the group if a child is found
        }
      }
      return null;
    };

    for (const obj of this.objects) {
      const foundRoot = search(id, obj);
      if (foundRoot) return foundRoot;
    }

    return undefined;
  }
}

export const model = new GraphicEditorModel();
