const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const tasksList = document.querySelector('#tasks-list');

const tasks = [];

function createTaskItem(task, index) {
  const listItem = document.createElement('li');
  listItem.classList.add('task-item');

  const textElement = document.createElement('p');
  textElement.classList.add('task-text');
  textElement.textContent = task.text;
  if (task.done) {
    textElement.classList.add('done');
  }

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('task-actions');

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.textContent = task.done ? 'Desmarcar' : 'Concluir';
  toggleButton.addEventListener('click', () => {
    tasks[index].done = !tasks[index].done;
    renderTasks();
  });

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Deletar';
  deleteButton.classList.add('btn-delete');
  deleteButton.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderTasks();
  });

  actionsContainer.appendChild(toggleButton);
  actionsContainer.appendChild(deleteButton);
  listItem.appendChild(textElement);
  listItem.appendChild(actionsContainer);

  return listItem;
}

function renderTasks() {
  tasksList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.classList.add('empty-state');
    emptyState.textContent = 'Nenhuma tarefa adicionada ainda.';
    tasksList.appendChild(emptyState);
    return;
  }

  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    tasksList.appendChild(taskItem);
  });
}

function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') {
    taskInput.focus();
    return;
  }

  tasks.push({ text: taskText, done: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

taskForm.addEventListener('submit', addTask);

renderTasks();
