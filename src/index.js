import './style.css';
import { removeItem, taskList, addTask } from './modules/add&remove.js';

window.addEventListener('load', () => {
  taskList();
  addTask();
  removeItem();
});
