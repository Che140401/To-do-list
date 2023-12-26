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

input.addEventListener('click', function () {
    todo_icon.style.opacity = 1;
});

// Pushing data to arrays
let list_items = [];

// Add event listeners for both click and keydown events
add_task.addEventListener("click", Add);
input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        Add();
    }
});

// Added task
function Add() {
    if (input.value == "") {
        alert("Please enter a value");
    } else {
        list_items.push(input.value);
        console.log(list_items)
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
            if (confirm("Are you sure you want to delete task")) {
                data_append.remove();

                // Find the closest <li> element to the clicked trash icon
                let closestLi = this.closest('li');

                for (let i = 0; i <= list_items.length - 1; i++) {
                    if (list_items[i] == closestLi.textContent) {
                        list_items.splice(i, 1)
                        console.log(list_items)
                    } else {
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
                    onClick: function () { } // Callback after click
                }).showToast();
            } else {
                return;
            }
        });
    }
}

// clear all task
clear_btn.addEventListener('click', function () {
    if (list.children.length !== 0) {
        // Display a confirmation dialog
        showConfirmDialog("Are you sure you want to clear all tasks?", function (confirmed) {
            if (confirmed) {
                list.innerHTML = '';
            }
        });
    } else {
        alert("No task is pending");
    }
});

// clear all selected task
selected_remove.addEventListener('click', function () {
    let completedTasks = list.querySelectorAll('input[type="checkbox"]:checked');

    if (completedTasks.length > 0) {
        // Display a confirmation dialog
        showConfirmDialog("Are you sure you want to clear completed tasks?", function (confirmed) {
            if (confirmed) {
                completedTasks.forEach(function (checkbox) {
                    checkbox.closest('li').remove();
                });
            }
        });
    } else {
        alert("No completed tasks to clear.");
    }
});

// Edit task
const save_btn = document.querySelector('.save-change');

save_btn.addEventListener('click', function () {
    if (currentlyEditedItem) {
        // Get the updated text from the input field
        const updatedText = input_data.value;

        // Check if the text is actually updated
        if (currentlyEditedItem.firstChild.textContent !== updatedText) {
            // Update the text content of the first child of the currently edited item
            currentlyEditedItem.firstChild.textContent = updatedText;

            // Reset the currently edited item
            currentlyEditedItem = null;

            // Log the updated text to the console
            console.log(updatedText);

            // Display a Toastify message indicating that the text is updated
            Toastify({
                text: "Text Updated",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () { }
            }).showToast();
        } else {
            // Display a Toastify message indicating that the text is not updated
            Toastify({
                text: "Text Not Updated",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #FF6347, #FF4500)",
                },
                onClick: function () { }
            }).showToast();
        }
    }
});

// Function to display a confirmation dialog
function showConfirmDialog(message, callback) {
    // Set the confirmation message
    document.getElementById('confirmMessage').innerText = message;

    // Show the modal
    $('#confirmModal').modal('show');

    // Handle 'Yes' button click
    document.getElementById('confirmYes').addEventListener('click', function () {
        // Hide the modal
        $('#confirmModal').modal('hide');

        // Call the callback function with true (confirmed)
        callback(true);
    });

    // Handle modal close (including 'No' button click)
    $('#confirmModal').on('hidden.bs.modal', function () {
        // Remove the event listener to avoid multiple executions
        document.getElementById('confirmYes').removeEventListener('click', callback);

        // Call the callback function with false (not confirmed)
        callback(false);
    });
}

if ($(window).width() < 1300) {
    let addTaskButton = document.querySelector('.add-task');
    let taskInput = document.querySelector('.task-input');
    taskInput.parentNode.insertBefore(addTaskButton, taskInput);
}