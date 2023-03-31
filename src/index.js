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

function taskList() {
  const taskList = document.getElementById('todo-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');
    const taskInput = document.createElement('input');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        listItem.classList.add('completed');
        taskInput.style.textDecoration = 'line-through';
      } else {
        listItem.classList.remove('completed');
        taskInput.style.textDecoration = 'none';
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    listItem.appendChild(checkbox);

    taskInput.classList.add('taskInput');
    taskInput.type = 'text';
    taskInput.value = task.description;
    taskInput.addEventListener('input', () => {
      task.description = taskInput.value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    listItem.appendChild(taskInput);

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const dotsDiv = document.createElement('div');
    dotsDiv.classList.add('dotsDiv');

    const dotsIcon = document.createElement('div');
    dotsIcon.innerHTML = '<i id="Dots" class="bi bi-three-dots-vertical"></i>';
    dotsDiv.appendChild(dotsIcon);
    dotsDiv.addEventListener('click', removeItem);
    listItem.appendChild(dotsDiv);
    taskList.appendChild(listItem);
  });
}

function addTask() {
  const input = document.getElementById('addItem');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value) {
      const newTask = {
        description: input.value,
        completed: false,
        index: tasks.length,
      };
      tasks.push(newTask);
      taskList();
      input.value = '';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

function removeItem(event) {
  const listItem = event.target.closest('.listItem');
  const index = tasks.findIndex((task) => task.description === listItem.querySelector('.taskInput').value);
  tasks.splice(index, 1);
  listItem.remove();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('load', () => {
  taskList();
  addTask();
});