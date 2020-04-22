const tasksService = new TasksService();
const todo = new ToDo(tasksService);

todo.init();
