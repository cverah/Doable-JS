import { listTasks } from "./services/tasks-services.js";

async function getTasks() {
  const tasks = await listTasks();
  this.tasks = tasks;
  console.log(tasks);
}

function addTask(data) {
  this.tasks.push(data);
}
function updateDataTask(data) {
  const position = this.tasks.findIndex((task) => task.id === data.id);
  this.tasks.splice(position, 1, data);
}
const dataTask = {
  user: null,
  tasks: [],
  addTask,
  getTasks,
  updateDataTask,
};
export default dataTask;
