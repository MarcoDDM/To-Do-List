// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Buy groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'Clean the house',
    completed: true,
    index: 1,
  },
  {
    description: 'Take the dog for a walk',
    completed: false,
    index: 2,
  },
];

function createTaskItem(task) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('listItem');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  taskItem.appendChild(checkbox);
  taskItem.innerHTML += task.description;
  if (task.completed) {
    taskItem.classList.add('completed');
  }
  return taskItem;
}

function populateTodoList() {
  const todoList = document.getElementById('todo-list');

  // Sort tasks by index value
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
  });
}

// Call the populateTodoList function when the page finishes loading
window.addEventListener('load', populateTodoList);