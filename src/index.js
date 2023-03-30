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
      } else {
        listItem.classList.remove('completed');
      }
    });
    listItem.appendChild(checkbox);

    const descriptionSpan = document.createElement('span');
    descriptionSpan.innerText = task.description;
    listItem.appendChild(descriptionSpan);

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const trashDiv = document.createElement('div'); // Create a new div element
    trashDiv.classList.add('trashDiv'); // Add a class to the div element

    const trashIcon = document.createElement('span');
    trashIcon.innerHTML = '<i class="bi bi-trash3"></i>'; // Display the task index on the right side
    trashDiv.appendChild(trashIcon);

    listItem.appendChild(trashDiv); // Append the new div element to the list item

    taskList.appendChild(listItem);
  });
}

window.addEventListener('load', populateTaskList);