let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function removeItem(listItem, index) {
  tasks.splice(index, 1);
  listItem.remove();

  // update indexes of remaining tasks
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  saveTask();
}

export function taskList() {
  const taskListElement = document.getElementById('todo-list');
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }
      saveTask();
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
        saveTask();
      });
    };
    taskDiv.addEventListener('dblclick', editDescription);

    listItem.appendChild(taskDiv);

    const dotsDiv = document.createElement('div');
    dotsDiv.classList.add('dotsDiv');

    let dotsIcon = document.createElement('div');
    dotsIcon = document.createElement('div');
    dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    dotsDiv.appendChild(dotsIcon);
    dotsDiv.addEventListener('click', () => removeItem(listItem, index));
    listItem.appendChild(dotsDiv);
    taskListElement.appendChild(listItem);

    listItem.addEventListener('mouseover', () => {
      dotsIcon.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    });
    listItem.addEventListener('mouseout', () => {
      dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    });
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
    saveTask();
  }

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  });
  document.getElementById('Plus').addEventListener('click', addNewTask);
}

export function clearCompleted() {
  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);
    taskList();
    saveTask();
  });
}

const demoInput = document.getElementById('Demo');

const demoInputValue = localStorage.getItem('demoInputValue');
if (demoInputValue) {
  demoInput.value = demoInputValue;
}
demoInput.addEventListener('change', () => {
  localStorage.setItem('demoInputValue', demoInput.value);
});
