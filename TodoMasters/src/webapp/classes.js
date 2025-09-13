import { observerMixin } from './mixin.js'


export class TodoItem {
    constructor(text) {
        this.text = text;
    }

    equals(other) { // Value object pattern
        return this.text === other.text;
    }
}

export class TodoList { // candidate for Singleton as we need only one instance of TodoList 
    // Data
    #data = new Set();
    get items() { return this.#data };

    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }

    // to force only one instance creation 
    constructor() {
        if (TodoList.instance) { throw new Error("Use TodoList.getInstance() to access the list") };
    }

    // List behaviour (methods)
    add(item) {
        const array = Array.from(this.#data);
        const todoExists = array.filter((todo) => todo.equals(item)).length > 0;
        if (!todoExists) {
            this.#data.add(item);
            this.notify();
        }
    }

    delete(todo_text) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter((todo) => todo.text == todo_text)[0];
        this.#data.delete(todoToDelete);
        this.notify();
    }

    find(todo_text) {
        const array = Array.from(this.#data);
        return array.find((todo) => todo.text == todo_text);
    }

    replaceList(list) {
        this.#data = list;
        this.notify();
    }
}


// Applying the Observer Mixin to the class

Object.assign(TodoList.prototype, observerMixin)