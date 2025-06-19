document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const toggleThemeButton = document.getElementById("toggle-theme");

  // Retrieve tasks from local storage or initialize an empty list.
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Save tasks to local storage.
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Create a task list element.
  function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }
    li.setAttribute("data-id", task.id);

    const span = document.createElement("span");
    span.textContent = task.text;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    // Complete/Undo button.
    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", function () {
      task.completed = !task.completed;
      updateLocalStorage();
      renderTasks();
    });

    // Edit button.
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        updateLocalStorage();
        renderTasks();
      }
    });

    // Delete button.
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      updateLocalStorage();
      renderTasks();
    });

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);
    return li;
  }

  // Render all tasks in the task list.
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const taskEl = createTaskElement(task);
      taskList.appendChild(taskEl);
    });
  }

  // Handle new task submission.
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      updateLocalStorage();
      renderTasks();
      taskInput.value = "";
    }
  });

  // Toggle light/dark theme.
  toggleThemeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });

  // Initial render.
  renderTasks();
});