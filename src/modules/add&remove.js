function addTask() {
  const inputField = document.getElementById('addItem');
  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newTask = {
        description: inputField.value,
        completed: false,
        index: tasks.length,
      };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      inputField.value = '';
      populateTaskList();
    }
  });
}

export default addTask;