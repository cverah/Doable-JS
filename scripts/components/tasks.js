import dataTask from "../data-task.js";

function renderTask() {
  const tasks = dataTask.tasks;
  console.log(tasks);
  return `
   
    <br>
    <div class="flex flex-column gap-4 js-list-tasks">
    ${tasks
      .map(
        (task) =>
          ` 
          <div class="${task.completed ? "completed_task" : ""} items-task">
            <div class="flex gap-8 items-center justify-between ">
              <div class="checkbox">
                <input type="checkbox" class="checkbox__input" id="cb-${
                  task.id
                }" data-id="${task.id}" ${task.completed ? "checked" : ""} >
                <label class="bold capitalize" for="cb-${task.id}"> ${
            task.title
          }</label>
              </div>
              <div data-id="${task.id}">
              ${
                task.completed && task.important
                  ? `<img src="./assets/icons/danger-medium.svg" class="img">`
                  : task.important
                  ? `<img src="./assets/icons/danger.svg" class="img">`
                  : `<img src="./assets/icons/danger-down.svg" class="img">`
              }
              </div>
            </div>
            <div class="item-date">
              <label>
                ${task.due_date ? task.due_date : ""}
              </label>
            </div>
          </div>
      `
      )
      .join("")}
      </div>
      <br>
      
  `;
}
const Task = {
  toString() {
    return renderTask();
  },
  addListeners() {
    listenAddTask();
  },
};

export { Task };
