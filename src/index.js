import _ from 'lodash';
import './style.css';

_();

// Define the tasks array
const tasks = [
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

// Define the populateTaskList function
function populateTaskList() {
  const taskList = document.getElementById('todo-list');

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');
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
    });
    listItem.appendChild(checkbox);

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    taskDiv.innerText = task.description;
    listItem.appendChild(taskDiv);

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const dotsDiv = document.createElement('div'); // Create a new div element
    dotsDiv.classList.add('dotsDiv'); // Add a class to the div element

    const dotsIcon = document.createElement('div');
    dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>'; // Display the task index on the right side
    dotsDiv.appendChild(dotsIcon);

    listItem.appendChild(dotsDiv); // Append the new div element to the list item

    taskList.appendChild(listItem);
  });
}

window.addEventListener('load', populateTaskList);