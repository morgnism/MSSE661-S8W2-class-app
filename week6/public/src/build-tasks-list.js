/**
 * @class TaskList
 *
 * Creates a list of tasks and updates a list
 */

class TaskList {
  tasks = [];

  constructor() {}

  /**
   * Build task list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createTaskListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'tasks-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };

  _deleteEventHandler = (taskId) => async () => {
    if (taskId) {
      const res = await deleteTask(taskId);

      if (res !== null) {
        this.tasks = this.tasks.filter((task) => task.task_id !== taskId);
        const task = document.getElementById(`task-${taskId}`);
        task.remove();

        if (!this.tasks.length) {
          const div = document.getElementById('tasks');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new tasks!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
   *   <span>Task name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  buildTaskListRowItem = (task) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `task-${task.task_id}`; // task-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(task.task_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const taskNameSpan = document.createElement('span');
    const taskName = document.createTextNode(task.task_name);
    taskNameSpan.appendChild(taskName);

    const taskStatusSpan = document.createElement('span');
    const taskStatus = document.createTextNode(task.status);
    taskStatusSpan.append(taskStatus);

    const taskDateSpan = document.createElement('span');
    const taskDate = document.createTextNode(task.created_date);
    taskDateSpan.append(taskDate);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(taskNameSpan);
    listGroupItem.append(taskStatusSpan);
    listGroupItem.append(taskDateSpan);

    return listGroupItem;
  };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildTasksList = (mount, tasks) =>
    tasks.map((task) => {
      const listGroupRowItem = this.buildTaskListRowItem(task);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateTasks = async () => {
    const res = await getTasks();
    const div = document.getElementById('tasks');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.tasks = res;
      const tasksDiv = this.createTaskListParent();
      this.buildTasksList(tasksDiv, res);
      div.replaceChild(tasksDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new TaskList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateTasks();
})();
