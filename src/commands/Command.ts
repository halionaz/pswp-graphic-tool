import { model } from '@/models/GraphicEditorModel';
import {
  GraphicObjectInterface,
  GraphicObjectType,
} from '@/models/GraphicObjectInterface';

export class Command {
  private prevStates: GraphicObjectInterface[] = [];
  execute() {
    this.prevStates = [...model.snapshot];
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
