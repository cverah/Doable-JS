import { listTasks } from "./services/tasks-services.js";

async function getTasks() {
  const tasks = await listTasks();
  this.tasks = tasks;
  console.log(tasks);
}

const dataTask = {
  user: null,
  tasks: [],

  getTasks,
};
export default dataTask;
