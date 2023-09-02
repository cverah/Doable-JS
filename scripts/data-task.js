import { listTasks } from "./services/tasks-services.js";

async function getTasks() {
  const tasks = await listTasks();
  this.tasks = tasks;
  console.log(tasks);
}

function addTask(data) {
  this.tasks.push(data);
}
const dataTask = {
  user: null,
  tasks: [],
  addTask,
  getTasks,
};
export default dataTask;
