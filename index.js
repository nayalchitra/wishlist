let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let todo;

let localData = JSON.parse(localStorage.getItem('todo'));
let todoList = localData|| [];
let showTodo = document.querySelector('.todos-container');

function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param){
        let number = Math.random()*16|0;
        let randomNumber = param=='x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}

addTodoButton.addEventListener("click",(event)=>{
    event.preventDefault();
    todo = todoInput.value ;
    if(todo.length > 0 ){
        todoList.push({id: uuid(), todo , isCompleted : false});
    }
    renderToDoList(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList));
    todoInput.value = "";
    
})

function renderToDoList(todoList){

    //console.log(todoList);
    showTodo.innerHTML =  todoList.map(({id,todo,isCompleted}) => `
    <div class="relative">
        <input type="checkbox" id="item-${id}" data-key="${id}" ${isCompleted ? "checked":""} />
        <label  class="todo ${isCompleted ? "checked-todo":""}" for="item-${id}" data-key="${id}">${todo}</label>
        <button class="" ><span class="material-symbols-outlined" data-todokey=${id}>
        delete
        </span></button>
    </div>
    `).join('');
//    
}
//renderToDoList(todoList);



showTodo.addEventListener('click',(e)=>{
  let key = e.target.dataset.key;  
  todoList= todoList.map(todo=> todo.id == key ? {...todo, isCompleted:!todo.isCompleted} : todo)
  let DeleteTodoKey = e.target.dataset.todokey;
  console.log(DeleteTodoKey);
  todoList = todoList.filter(todo => todo.id !== DeleteTodoKey );
  localStorage.setItem("todo",JSON.stringify(todoList));
  renderToDoList(todoList);
  
})
