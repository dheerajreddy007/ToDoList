//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector(".filter-todo");



//Event listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addItem);
todoList.addEventListener('click',removeItem)
filterOption.addEventListener("click",filter);




//Functions
//To add items to the list
function addItem(event)
{
    //To prevent the form from submitting request
    event.preventDefault();

   //To create a div tag with class todo
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');

    //To create li with the text from the user and class of todo-item

    const todoLi=document.createElement('li');
    todoLi.innerText=todoInput.value;
    todoLi.classList.add('todo-item');

    //To add li with class todo-item as a child to the div with class todo
    todoDiv.appendChild(todoLi);
    //To add todo to local storage
    saveToLocalStorage(todoInput.value);
    //To create Check Mark

    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    //To add check mark button
    todoDiv.appendChild(completedButton);

    //To create Remove mark

    const removeButton=document.createElement('button');
    removeButton.innerHTML='<i class="fas fa-trash"></i>'
    removeButton.classList.add('remove-btn');

    //To add remove mark button

    todoDiv.appendChild(removeButton);

    //To add the above things to the ul

    todoList.appendChild(todoDiv);

    //To clear the value in the input field

    todoInput.value="";
}
//To remove items from the list
function removeItem(event)
{
   const item=event.target;
   if(item.classList[0]==='remove-btn'){
      const todo=item.parentElement;
      //Animation
      todo.classList.add('collapse');
      todo.addEventListener('transitionend',function(){
          todo.remove();
      })
   }
   if(item.classList[0]==='complete-btn'){
       const todo=item.parentElement;
       todo.classList.toggle("completed");
   }

}

//To filter the list
function filter(e)
{
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";    
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }    
                else{
                    todo.style.display="none";
                }
                break;
        }
    });
}

//To create a local storage
function saveToLocalStorage(todo)
{
    //This is  to check if local storage already has that item
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//To get data from teh local storage
function getTodos()
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        
   //To create a div tag with class todo
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');

    //To create li with the text from the user and class of todo-item

    const todoLi=document.createElement('li');
    todoLi.innerText=todo.value;
    todoLi.classList.add('todo-item');

    //To add li with class todo-item as a child to the div with class todo
    todoDiv.appendChild(todoLi);
 
    //To create Check Mark

    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    //To add check mark button
    todoDiv.appendChild(completedButton);

    //To create Remove mark

    const removeButton=document.createElement('button');
    removeButton.innerHTML='<i class="fas fa-trash"></i>'
    removeButton.classList.add('remove-btn');

    //To add remove mark button

    todoDiv.appendChild(removeButton);

    //To add the above things to the ul

    todoList.appendChild(todoDiv);

    })
}
function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}