import { listTasks } from "./services/tasks-services.js";

async function getTasks() {
  const tasks = await listTasks();
  this.tasks = tasks;
}
function addTask(data) {
  this.tasks.push(data);
}
function updateDataTask(data) {
  const position = this.tasks.findIndex((task) => task.id === data.id);
  this.tasks.splice(position, 1, data);
}

function shortAlphabetic() {
  this.tasks.sort(function (a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    return 0;
  });
}

async function orderOption(dataOption) {
  const { select, checkPending, checkImportant } = dataOption;
  if (select === null) select = "order";
  if (select === "order") {
    this.shortAlphabetic();
  }
  if (select === "due-date") {
    this.tasks.sort((a, b) => {
      // Si a.due_date es null, colocar a al final
      if (a.due_date === null && b.due_date !== null) return 1;
      // Si b.due_date es null, colocar b al final
      if (a.due_date !== null && b.due_date === null) return -1;
      // Si ambos son null o ambos tienen fecha, ordenar por fecha
      if (a.due_date === null && b.due_date === null) return 0;
      if (a.due_date < b.due_date) return -1;
      if (a.due_date > b.due_date) return 1;
      return 0;
    });
  }
  if (select === "importance") {
    this.tasks.sort(function (a, b) {
      if (a.important < b.important) return 1;
      if (a.important > b.important) return -1;
      return 0;
    });
  }
  if (checkPending) {
    this.tasks = this.tasks.filter((task) => !task.completed);
  }
  if (checkImportant) {
    this.tasks = this.tasks.filter((task) => task.important);
  }
  await this.getTasks();
}

const dataTask = {
  user: null,
  tasks: [],
  currentSelect: "order",
  currentCheckImportant: null,
  currentCheckPending: null,
  getTasks,
  addTask,
  updateDataTask,
  shortAlphabetic,
  orderOption,
};
export default dataTask;
