import _ from 'lodash';
import './style.css';

_();

// Define the tasks array
const tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {
    description: 'Walk the dog',
    completed: false,
    index: 0,
  },
  {
    description: 'Buy groceries',
    completed: false,
    index: 1,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 2,
  },
  {
    description: 'Do laundry',
    completed: false,
    index: 3,
  },
];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(listItem, index) {
  tasks.splice(index, 1);
  listItem.remove();

  // update indexes of remaining tasks
  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  saveTasksToLocalStorage();
}

function taskList() {
  const taskListElement = document.getElementById('todo-list');
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    const taskDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        listItem.classList.add('completed');
        taskDiv.style.textDecoration = 'line-through';
      } else {
        listItem.classList.remove('completed');
        taskDiv.style.textDecoration = 'none';
      }
      saveTasksToLocalStorage();
    });
    listItem.appendChild(checkbox);

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
    dotsIcon.innerHTML = '<i id="Dots" class="bi bi-three-dots-vertical"></i>';
    dotsDiv.appendChild(dotsIcon);
    dotsDiv.addEventListener('click', () => removeItem(listItem, index));
    listItem.appendChild(dotsDiv);

    taskListElement.appendChild(listItem);
  });
}

function addTask() {
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

window.addEventListener('load', () => {
  taskList();
  addTask();
});
