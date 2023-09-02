import apiFetch from "./api-fetch.js";

async function listTasks() {
  const tasks = await apiFetch("/tasks");
  return tasks;
}

async function createTask(newTask = { title, due_date }) {
  const task = await apiFetch("/tasks", { body: newTask });
  return task;
}

async function updateTask(
  id,
  dataTask = { title, due_date, important, completed }
) {
  const task = await apiFetch(`/tasks/${id}`, {
    method: "PATCH",
    body: dataTask,
  });
  return task;
}
export { listTasks, createTask, updateTask };
