/**
 * AJAX add new tasks to task list on save.
 */
const doAddTask = async (e) => {
  e.preventDefault();

  const taskInput = document.getElementById('formInputTaskName');
  const task_name = taskInput.value;
  const statusSelect = document.getElementById('formSelectStatus');
  const options = statusSelect.options;
  const selectedIndex = statusSelect.selectedIndex;
  const status = options[selectedIndex].text;

  if (!task_name) {
    alert('Please enter a task name.');
    return;
  }

  const res = await addTask({ task_name, status });

  if (res !== null) {
    inst.generateTasks();
  }
  taskInput.value = '';
};
