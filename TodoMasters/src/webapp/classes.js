import {observerMixin} from './mixin.js'


class TodoItem {
    constructor(text) {
        this.text = text;
    }

    equals(other) { // Value object pattern
        return this.text === other.text;
    }
}

class TodoList { // candidate for Singleton as we need only one instance of TodoList 
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
}


// Applying the Observer Mixin to the class

Object.assign(TodoList.prototype, observerMixin)