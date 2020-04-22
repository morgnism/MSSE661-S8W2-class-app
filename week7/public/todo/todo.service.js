/**
 * @class ToDo
 *
 * Creates a list of tasks and updates a list
 */

class ToDo {
  tasks = [];
  tasksService;

  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  init() {
    this.render();
  }

  /**
   * DOM renderer for building the list row item.
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
  _renderListRowItem = (task) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `task-${task.task_id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
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
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const tasksDiv = document.getElementById('tasks');
    const loadingDiv = tasksDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'tasks-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.tasks.map((task) => {
      const listGroupRowItem = this._renderListRowItem(task);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    tasksDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const tasksDiv = document.getElementById('tasks');
    const loadingDiv = tasksDiv.childNodes[0];
    const listParent = document.getElementById('tasks-list');
    const msgDiv = this._createMsgElement('Create some new tasks!');

    if (tasksDiv) {
      tasksDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      tasksDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding a task.
   *
   * @param {Object} newTask - form's values as an object
   */
  addTask = async (newTask) => {
    try {
      const { task_name, status } = newTask;
      await this.tasksService.addTask({ task_name, status }); // we just want the name and status
      this.tasks.push(newTask); // push task with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add task. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for adding a task to the DOM.
   *
   * @param {number} taskId - id of the task to delete
   */
  _addTaskEventHandler = () => {
    const taskInput = document.getElementById('formInputTaskName');
    const task_name = taskInput.value;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    // validation checks
    if (!task_name) {
      alert('Please enter a task name.');
      return;
    }

    const task = { task_name, status }; // assemble the new task parts
    const { newTask, newTaskEl } = this._createNewTaskEl(task); // add task to list

    this.addTask(newTask);

    const listParent = document.getElementById('tasks-list');

    if (listParent) {
      listParent.appendChild(newTaskEl);
    } else {
      this._renderList();
    }
    taskInput.value = ''; // clear form text input
  };

  /**
   * Create the DOM element for the new task with all its parts.
   *
   * @param {Object} task - { task_name, status } partial status object
   */
  _createNewTaskEl = (task) => {
    const task_id = this.tasks.length;
    const created_date = new Date().toISOString();
    const newTask = { ...task, task_id, created_date };
    const newTaskEl = this._renderListRowItem(newTask);

    return { newTask, newTaskEl };
  };

  /**
   * Pure function for deleting a task.
   *
   * @param {number} taskId - id for the task to be deleted
   */
  deleteTask = async (taskId) => {
    try {
      const res = await this.tasksService.deleteTask(taskId);
      this.tasks = this.tasks.filter((task) => task.task_id !== taskId);

      if (res !== null) {
        alert('Task deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete task. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for deleting a task from the DOM.
   * This relies on a pre-existing in the list of tasks.
   *
   * @param {number} taskId - id of the task to delete
   */
  _deleteEventHandler = (taskId) => () => {
    const task = document.getElementById(`task-${taskId}`);
    task.remove();

    this.deleteTask(taskId).then(() => {
      if (!this.tasks.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const tasks = await this.tasksService.getTasks();

    try {
      if (tasks.length) {
        this.tasks = tasks;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}
