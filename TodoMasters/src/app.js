globalThis.DOM = {  };

const DOM = globalThis.DOM;

document.addEventListener("DOMContentLoaded", () => { 
    DOM.todoList = document.getElementById("todo-list");
    DOM.addBtn = document.getElementById("todo-btn");
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addBtn.addEventListener("click", (event) => {
        //TO implement
    });

    DOM.todoList.addEventListener("click", (event) => {
        if(event.target.classList.contains("delete-btn")){
            //TO implement
        }
    })
 });