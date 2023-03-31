import './style.css';
import { taskList, addTask } from './modules/add&remove.js';

window.addEventListener('load', () => {
  taskList();
  addTask();
});
