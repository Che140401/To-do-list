


let input = document.querySelector('.task-input');
let list = document.querySelector('.list');
let clear_btn = document.querySelector('.clear-task-btn');
let selected_remove = document.querySelector('.clear-completed-tasks-btn');
let input_data = document.querySelector('.input_data');
let currentlyEditedItem = null;
let add_task = document.querySelector('.add-task');
let todo_icon = document.querySelector('.todo-icon');
let todo_form = document.querySelector('.todo-form');
let trash = document.getElementsByClassName('.trash');




input.addEventListener('click',function(){
    todo_icon.style.opacity=1;
})

// Pushing data to arrays
let list_items = [];



// Added task
function Add() {
    list_items.push(input.value);
    console.log(list_items)
    if (input.value == "") {
        alert("Please enter a value");
    } else {
        let data_append = document.createElement("li");
        data_append.innerHTML = `${input.value}` + '<i class="fa-solid fa-trash-can trash"></i>' + '<input type="checkbox" id="list_check" class="list" name="list_check" >' + '<i class="fa-sharp fa-solid fa-pen-to-square update" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>' + '<span class="checkmark"></span>';
        list.appendChild(data_append);
        input.value = "";
        data_append.querySelector('.update').addEventListener("click", function () {
            currentlyEditedItem = data_append;
            const taskData = data_append.textContent.trim();
            input_data.value = taskData;
        });
        data_append.querySelector('.trash').addEventListener("click", function () {
            if(confirm("Are you sure you want to delete task")){
                data_append.remove();

                // Find the closest <li> element to the clicked trash icon

                let closestLi = this.closest('li');

                for(let i=0;i<=list_items.length-1;i++){
                    if(list_items[i] == closestLi.textContent){
                        list_items.splice(i,1)
                        console.log(list_items)
                    }
                    else{
                        console.log("false")
                    }
                }
                Toastify({
                    text: "Task Deleted",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            }
            else{
                return;
            }
        });
    }
}

// clear all task
clear_btn.addEventListener('click', function () {
    if (list.children.length != 0) {
        if (confirm("Are you sure you want to clear all tasks?")) {
            list.innerHTML = '';
        } else {
            return;
        }
    } else {
        alert("No task is pending");
    }
});

// clear all selected task
selected_remove.addEventListener('click', function () {
    let completedTasks = list.querySelectorAll('input[type="checkbox"]:checked');

    if (completedTasks.length > 0) {
        if (confirm("Are you sure you want to clear completed tasks?")) {
            completedTasks.forEach(function (checkbox) {
                checkbox.closest('li').remove();
            });
        } else {
            return;
        }
    } else {
        alert("No completed tasks to clear.");
    }
});

// Edit task
const save_btn = document.querySelector('.save-change');
save_btn.addEventListener('click', function () {
    if (currentlyEditedItem) {
        const updatedText = input_data.value;
        currentlyEditedItem.firstChild.textContent = updatedText;
        currentlyEditedItem = null; // Reset the currently edited item
    }
});

// Check if the screen width is less than 768 pixels
// const mediaQuery = window.matchMedia("(max-width: 1280px)");

// // Function to handle the responsive behavior
// function handleResponsive() {
//     if (mediaQuery.matches) {
//         let addTaskButton = document.querySelector('.add-task');
//         let taskInput = document.querySelector('.task-input');
//         taskInput.parentNode.insertBefore(addTaskButton, taskInput);
//     } else {    
//         console.log("bye")
//     }
// }

// // Initial check and add an event listener for changes
// handleResponsive();
// mediaQuery.addListener(handleResponsive);

if($(window).width() < 1300){
        let addTaskButton = document.querySelector('.add-task');
        let taskInput = document.querySelector('.task-input');
        taskInput.parentNode.insertBefore(addTaskButton, taskInput);
        
}

