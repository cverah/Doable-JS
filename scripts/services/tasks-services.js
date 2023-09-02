import apiFetch from "./api-fetch.js";

async function listTasks() {
  const tasks = await apiFetch("/tasks");
  return tasks;
}

export { listTasks };
