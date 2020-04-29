const TASKS_API = `${BASE_API_URL}/tasks`; // http://localhost:3000/api/tasks

class TasksService {
  getTasks = () => _get(TASKS_API, OPTIONS_WITH_AUTH);

  addTask = (formData) => _post(TASKS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteTask = (taskId) => _delete(`${TASKS_API}/${taskId}`, OPTIONS_WITH_AUTH);
}
