import { model } from '@/models/GraphicEditorModel';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';
import { PositionType } from '@/models/types';

export abstract class Command {
  private prevStates: GraphicObjectInterface[] = [];
  execute() {
    this.prevStates = model.snapshot;
  }
  undo() {
    model.restore(this.prevStates);
  }
}

export class AddCommand extends Command {
  private type: GraphicObjectType;

  constructor(type: GraphicObjectType) {
    super();
    this.type = type;
  }

  execute() {
    super.execute();
    return model.add(this.type);
  }
}

export class RemoveCommand extends Command {
  private ids: string[];

  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }

  execute() {
    super.execute();
    model.remove(this.ids);
  }
}

export class UpdateCommand extends Command {
  private ids: string[];
  private patch: Partial<GraphicObjectInterface>;

  constructor(ids: string[], patch: Partial<GraphicObjectInterface>) {
    super();
    this.ids = ids;
    this.patch = patch;
  }

  execute() {
    super.execute();
    model.update(this.ids, this.patch);
  }
}

export class MoveCommand extends Command {
  private ids: string[];
  private diff: PositionType;

  constructor(ids: string[], diff: PositionType) {
    super();
    this.ids = ids;
    this.diff = diff;
  }

  execute() {
    super.execute();
    model.move(this.ids, this.diff);
  }
}

export class RemoveAllCommand extends Command {
  execute() {
    super.execute();
    model.remove(model.snapshot.map(o => o.id));
  }
}

export class ReorderLayersCommand extends Command {
  private id: string;
  private idx: number;

  constructor(id: string, idx: number) {
    super();
    this.id = id;
    this.idx = idx;
  }

  execute(): void {
    super.execute();
    model.reorder(this.id, this.idx);
  }
}
