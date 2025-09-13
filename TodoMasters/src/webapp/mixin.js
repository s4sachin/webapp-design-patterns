// Mixin that will implement the observer pattern

export const observerMixin = {
    observers: new Set(),
    addObservers(obs) { this.observers.add(obs); },
    removeObservers(obs) { this.observers.delete(obs); },
    notify() { this.observers.forEach((obs) => obs()); }
}