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

export class CommandWithDebounce extends Command {
  private doneStates: GraphicObjectInterface[] | null = null;

  execute(): void {
    super.execute();
    if (this.doneStates !== null) {
      model.restore(this.doneStates);
      return;
    }
  }

  setDoneStates() {
    this.doneStates = [...model.snapshot];
  }
}

export class AddCommand extends Command {
  private type: Exclude<GraphicObjectType, 'group'>;

  constructor(type: Exclude<GraphicObjectType, 'group'>) {
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

export class GroupCommand extends Command {
  private ids: string[];

  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }

  execute() {
    super.execute();
    return model.group(this.ids);
  }
}

export class UngroupCommand extends Command {
  private ids: string[];

  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }

  execute() {
    super.execute();
    return model.ungroup(this.ids);
  }
}
