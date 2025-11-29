// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to save tasks array to Local Storage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Function to add a new task
    // save = true when user adds a new task, false when loading from Local Storage
    function addTask(taskText = null, save = true) {
        // If taskText is not provided (from input), get it from the input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Assign click event to remove the task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                // Remove task from Local Storage
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter(task => task !== taskText);
                saveTasksToLocalStorage(updatedTasks);
            }
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear input field if task was entered via input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = "";
        }

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
        }
    }

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});

