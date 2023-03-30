import _ from 'lodash';
import './style.css';

_();

let tasks = [
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

  // Create input element
  const input = document.createElement('input');
  input.type = 'text';
  input.value = task.description;
  input.classList.add('inputList');
  taskItem.appendChild(input);

  if (task.completed) {
    taskItem.classList.add('completed');
  }

  // Add event listener to input element
  input.addEventListener('blur', (event) => {
    const newDescription = event.target.value.trim();
    if (newDescription) {
      task.description = newDescription;

      // Store tasks in local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      // If the input is empty, restore the original description
      event.target.value = task.description;
    }
  });

  return taskItem;
}

function populateTodoList() {
  const todoList = document.getElementById('todo-list');

  // Retrieve tasks from local storage
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
  }

  // Sort tasks by index value
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
  });
}

const addItemInput = document.getElementById('addItem');
const todoList = document.getElementById('todo-list'); // Define todoList globally
addItemInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newTask = {
      index: tasks.length,
      description: addItemInput.value,
      completed: false,
    };
    tasks.push(newTask);
    const taskItem = createTaskItem(newTask);
    todoList.appendChild(taskItem); // Use todoList globally

    // Store tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addItemInput.value = '';
  }
});

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
  const completedItems = todoList.querySelectorAll('li input:checked');
  completedItems.forEach((item) => {
    const listItem = item.parentNode;
    tasks.splice(listItem.dataset.index, 1);
    listItem.remove();
  });

  // Store tasks in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Call the populateTodoList function when the page finishes loading
window.addEventListener('load', populateTodoList);