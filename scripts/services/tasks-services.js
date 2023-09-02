import apiFetch from "./api-fetch.js";

async function listTasks() {
  const tasks = await apiFetch("/tasks");
  return tasks;
}

async function createTask(newTask = { title, due_date }) {
  const task = await apiFetch("/tasks", { body: newTask });
  return task;
}

export { listTasks, createTask };
