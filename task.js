document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("filtered-tasks");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const themeToggle = document.getElementById("toggle-theme");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks(filter) {
    taskList.innerHTML = "";

    let filtered = tasks;
    if (filter === "completed") {
      filtered = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
      filtered = tasks.filter(task => !task.completed);
    }

    filtered.forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item";
      if (task.completed) {
        li.classList.add("completed");
      }
      li.textContent = task.text;
      taskList.appendChild(li);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      renderTasks(btn.dataset.filter);
    });
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });

  renderTasks("all");
});