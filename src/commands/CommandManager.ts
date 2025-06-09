import { Command } from './Command';

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(command: Command) {
    this.undoStack.push(command);
    this.redoStack = [];
    return command.execute();
  }

  undo() {
    console.log(this.undoStack);
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    console.log(this.redoStack);
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }
}

export const commandManager = new CommandManager();
