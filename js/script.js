let input = document.querySelector('.task-input');
let list = document.querySelector('.list');
let clear_btn = document.querySelector('.clear-task-btn');
let selected_remove = document.querySelector('.clear-completed-tasks-btn');


//Added task

function Add(){
    if(input.value == ""){
        alert("please enter value");
    }
    else{
        let data_append = document.createElement("li");
        data_append.innerHTML=`${input.value}`+'<i class="fa-solid fa-trash-can trash"></i>'+'<input type="checkbox" id="list_check" class="list" name="list_check" >'+'<i class="fa-sharp fa-solid fa-pen-to-square  update" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>'+'<span class="checkmark"></span>';
        list.appendChild(data_append);
        input.value="";
        data_append.querySelector('i').addEventListener("click",remove);
        function remove(){
            data_append.remove();
        }
        // if(document.getElementById("list_check").checked = true){
        //     console.log("true");
        // }
        // else{
        //     console.log(false)
        // }
        list.querySelector('.update').addEventListener('click',function(){
            console.log("hello");
        })
    }
}

// clear all task

clear_btn.addEventListener('click',function(){
    
    if(list.children.length!=0){
        if(confirm("Please Ok to confirm")==true){
            list.innerHTML = null;
        }
        else{
            return;
        }
        // for(let i=0;i<list.children.length;i++){
        //     list.removeChild(list.childNodes[i]);
        // }
        // alert("Do you want to delete all task")
    }
    else{
        alert("no task is pending")
    }
});

// clear all selected task

selected_remove.addEventListener('click',function(){
    let completedTasks = list.querySelectorAll('input[type="checkbox"]:checked');
    
    if (completedTasks.length > 0) {
        if (confirm("Are you sure you want to clear completed tasks?")) {
            completedTasks.forEach(function(checkbox) {
                // Remove the parent <li> element when the checkbox is checked
                checkbox.closest('li').remove();
            });
        } else {
            return;
        }
    } else {
        alert("No completed tasks to clear.");
    }
    
});


//edit task
