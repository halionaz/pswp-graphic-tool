export type Listener = () => void;

export abstract class Observable {
  #listeners = new Set<Listener>();
  subscribe(l: Listener) { this.#listeners.add(l); return () => this.#listeners.delete(l); }
  protected notify() { this.#listeners.forEach(l => l()); }
}