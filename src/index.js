import './style.css';
import {
  taskList, addTask, clearCompleted, removeItem, Checkbox,
} from './modules/ToDoList.js';

window.addEventListener('load', () => {
  taskList();
  addTask();
  taskList(Checkbox);
  clearCompleted();
});
taskList(removeItem);