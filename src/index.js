import './style.css';
import { taskList, addTask, clearCompleted } from './modules/add&remove.js';

window.addEventListener('load', () => {
  taskList();
  addTask();
});

clearCompleted();