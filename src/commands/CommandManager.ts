import { Command } from './Command';

export class CommandManager {
  private stack: Command[] = [];

  executeCommand(command: Command) {
    this.stack.push(command);
    return command.execute();
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      command.undo();
    }
  }
}

export const commandManager = new CommandManager();
