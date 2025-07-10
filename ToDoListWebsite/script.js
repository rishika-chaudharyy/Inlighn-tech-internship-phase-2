const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const noTaskMessage = document.getElementById('noTaskMessage');

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (savedTasks.length === 0) {
    noTaskMessage.style.display = 'block';
  } else {
    noTaskMessage.style.display = 'none';
    savedTasks.forEach(task => renderTask(task.text, task.completed));
  }
};

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  renderTask(taskText);
  saveTask(taskText, false);
  taskInput.value = '';
  noTaskMessage.style.display = 'none';
}

function renderTask(text, isCompleted = false) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;

  const taskName = document.createElement('span');
  taskName.textContent = text;
  if (isCompleted) taskName.classList.add('completed');

  checkbox.addEventListener('change', () => {
    taskName.classList.toggle('completed');
    updateLocalStorage();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    updateLocalStorage();
    checkIfEmpty();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskName);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const taskItems = document.querySelectorAll('.task-item');
  const tasks = [];

  taskItems.forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item.querySelector('input').checked;
    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkIfEmpty() {
  if (taskList.children.length === 0) {
    noTaskMessage.style.display = 'block';
  }
}
