import { TodoList, TodoItem } from './classes.js'

export class Command {
    name;
    args;

    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

const Commands = {
    ADD: "add",
    DELETE: "delete"
};

const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOMException.todoInput;
                const todoText = todoInput.value.trim();
                const itemInList = todoList.find(todoText);
                if (todoText != "" && itemInList == undefined) {
                    todoList.add(new TodoItem(todoText))
                }
                break;

            case Commands.DELETE:
                const [textToDelete] = command.args;
                todoList.delete(textToDelete);
                break;
        }
    }
}