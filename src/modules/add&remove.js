const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function removeItem(listItem, index) {
  tasks.splice(index, 1);
  listItem.remove();

  // update indexes of remaining tasks
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  saveTasksToLocalStorage();
}

export function taskList() {
  const taskListElement = document.getElementById('todo-list');
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        listItem.classList.add('completed');
        listItem.style.textDecoration = 'line-through';
      } else {
        listItem.classList.remove('completed');
        listItem.style.textDecoration = 'none';
      }
      saveTasksToLocalStorage();
    });
    listItem.appendChild(checkbox);

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    taskDiv.innerText = task.description;

    const editDescription = () => {
      const inputTask = document.createElement('input');
      inputTask.classList.add('taskDiv');
      inputTask.value = task.description;
      taskDiv.replaceWith(inputTask);
      inputTask.focus();
      inputTask.addEventListener('blur', () => {
        task.description = inputTask.value;
        inputTask.replaceWith(taskDiv);
        taskDiv.innerText = task.description;
        saveTasksToLocalStorage();
      });
    };
    taskDiv.addEventListener('dblclick', editDescription);

    listItem.appendChild(taskDiv);

    const dotsDiv = document.createElement('div');
    dotsDiv.classList.add('dotsDiv');

    let dotsIcon = document.createElement('div');
    dotsIcon = document.createElement('div');
    dotsIcon.innerHTML = '<i class="bi bi-trash3"></i>';
    dotsDiv.appendChild(dotsIcon);
    dotsDiv.addEventListener('click', () => removeItem(listItem, index));
    listItem.appendChild(dotsDiv);

    taskListElement.appendChild(listItem);
  });
}

export function addTask() {
  const input = document.getElementById('addItem');

  function addNewTask() {
    if (!input.value) return;
    const newTask = { description: input.value, completed: false, index: tasks.length };
    tasks.push(newTask);
    taskList();
    input.value = '';
    saveTasksToLocalStorage();
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  });
  document.getElementById('Plus').addEventListener('click', addNewTask);
}