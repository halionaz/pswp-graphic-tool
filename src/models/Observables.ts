export type Listen = () => void;

export abstract class Observable {
  listeners = new Set<Listen>();

  subscribe(l: Listen) {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  }

  protected notify() {
    this.listeners.forEach(l => l());
  }
}
