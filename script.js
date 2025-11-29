// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {

    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim input value
        const taskText = taskInput.value.trim();

        // Check if input is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // 4. Task Creation
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign onclick event to remove task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // 5. Attach Event Listeners
    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on pressing Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
