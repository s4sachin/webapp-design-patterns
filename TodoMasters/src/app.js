import { TodoList } from "./webapp/classes.js";
import { Command, CommandExecutor, Commands } from "./webapp/command.js";
import { LocalStorage } from "./webapp/storage.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

function renderList() {
    const list = TodoList.getInstance();
    DOM.todoList.innerHTML = "";
    for (let todo of list.items) {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        listItem.innerHTML = `
            ${todo.text} <button class='delete-btn'>Delete</button>
        `;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList = document.getElementById("todo-list");
    DOM.addBtn = document.getElementById("add-btn");
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addBtn.addEventListener("click", (event) => {
        const cmd = new Command(Commands.ADD)
        CommandExecutor.execute(cmd)
    });

    DOM.todoList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const todoTODelete = event.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [todoTODelete]);
            CommandExecutor.execute(cmd)
        }
    });

    TodoList.getInstance().addObserver(renderList);
    LocalStorage.load();
});

document.addEventListener("keydown", (event) => {
    if (document.activeElement == DOM.todoInput && event.key == 'Enter') {
        event.preventDefault();
        console.log("enter key", event.key)
        const cmd = new Command(Commands.ADD)
        CommandExecutor.execute(cmd)
    }
});

document.addEventListener("keydown", (event) => {
    if (event.target.classList.contains("delete-btn") &&  document.activeElement == event.target && event.key == "Enter") {
        console.log("delete btn called from keyboard");
        const todoToDelete = event.target.parentNode.dataset.text;
        const cmd = new Command(Commands.DELETE, [todoToDelete]);
        CommandExecutor.execute(cmd);
    }
});

document.addEventListener("keydown", (event) => {
    if(event.ctrlKey && event.key == 'z'){
        const cmd = new Command(Commands.UNDO)
        CommandExecutor.execute(cmd);
    }
})