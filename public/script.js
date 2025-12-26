const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");

// Add Task
async function addTask() {
  const title = taskInput.value.trim();
  if (!title) return alert("Task cannot be empty");

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  loadTasks();
}

// Load Tasks
async function loadTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();

  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    if (task.completed) {
      renderCompletedTask(task);
    } else {
      renderActiveTask(task);
    }
  });
}

// Render Active Task
function renderActiveTask(task) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.value = task.title;

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.onclick = () => updateTask(task._id, input.value);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.onclick = () => completeTask(task._id);

  li.appendChild(input);
  li.appendChild(updateBtn);
  li.appendChild(completeBtn);

  taskList.appendChild(li);
}

// Render Completed Task
function renderCompletedTask(task) {
  const li = document.createElement("li");
  li.textContent = task.title;
  li.className = "completed";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task._id);

  li.appendChild(deleteBtn);
  completedList.appendChild(li);
}

// Update Task
async function updateTask(id, newTitle) {
  await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle })
  });

  loadTasks();
}

// Complete Task
async function completeTask(id) {
  await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true })
  });

  loadTasks();
}

// Delete Task
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Initial Load
loadTasks();
