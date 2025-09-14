import { TodoList } from "./classes.js";

export const TodoHistory = {
    history: [],
    push(state) {
        if (state) {
            this.history.push(new Set([...state]));
        }
    },
    pop() {
        if (this.history.length > 1) {
            this.history.pop();
            return this.history.pop();
        }
    }
}

const todoItem = TodoList.getInstance();
todoItem.addObserver(() => {
    TodoHistory.push(todoItem.items)
});