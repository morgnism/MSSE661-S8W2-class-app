const tasksService = new TasksService();
const todo = new ToDo(tasksService);

describe('Todo App', () => {
  it('should initialize some HTML', () => {
    spyOn(todo, 'init');
    todo.init();

    expect(todo.init).toHaveBeenCalled();
  });

  it('should add a task', async () => {
    const newTask = {
      task_id: 0,
      task_name: 'Third task',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const addTaskServiceSpy = spyOn(tasksService, 'addTask');

    expect(todo.tasks.length).toBe(0);

    await todo.addTask(newTask);

    expect(addTaskServiceSpy).toHaveBeenCalled();
    expect(todo.tasks.length).toBe(1);
  });

  it('should delete a task', async () => {
    const existingTask = {
      task_id: 0,
      task_name: 'Third task',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const deleteTaskServiceSpy = spyOn(tasksService, 'deleteTask');

    expect(todo.tasks.length).toBe(1);

    await todo.deleteTask(existingTask.task_id);

    expect(deleteTaskServiceSpy).toHaveBeenCalled();
    expect(todo.tasks.length).toBe(0);
  });

  xit('should update an individual task', () => {
    // ..
  });
});
