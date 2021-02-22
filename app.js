// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// events listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions

function addTodo(e) {
  e.preventDefault();
  // structure
  // <div class="todo">
  //   <li></li>
  //   <button>delete</button>
  //   <button>checked</button>
  //    </div>;

  // div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // addTodo to local stortage
  saveLocalTodos(todoInput.value);
  // check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  let item = e.target;
  // for delete
  if (item.classList.contains("trash-btn")) {
    let todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // for check
  if (item.classList.contains("complete-btn")) {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
    classList;
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  let temp = e.target.value;
  todos.forEach(function (todo) {
    if (temp == "all") {
      todo.style.display = "flex";
    } else if (temp == "completed") {
      if (todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    } else if (temp == "uncompleted") {
      if (!todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem("todos") == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos)
  todos.forEach(function(todo){

    // div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);

  })
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  
  localStorage.setItem("todos", JSON.stringify(todos));
}