import dataTask from "../data-task.js";
import DOMHandler from "../dom-handler.js";
import { createTask, updateTask } from "../services/tasks-services.js";
import { input } from "./input.js";

function listenAddTask() {
  const submitAddTask = document.querySelector(".js-add-task");
  submitAddTask.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      console.log("click");
      const { txt_nameTask, txt_date } = event.target.elements;
      const newTask = {
        title: txt_nameTask.value,
        due_date: txt_date.value,
      };
      //console.log(dataTask);

      //insert en api
      const task = await createTask(newTask);
      //insert en dataTask
      dataTask.addTask(task);
      //dataTask.shortAlphabetic();
    } catch (error) {
      console.log(error);
    }
    //reload
    DOMHandler.reload();
  });
}

function findData(id) {
  const { important } = dataTask.tasks.find((task) => task.id === id);
  return important;
}

function actionsTasks() {
  const listTask = document.querySelector(".js-list-tasks");
  listTask.addEventListener("click", async (event) => {
    try {
      //event.preventDefault();
      const domCaptured = event.target.closest("[data-id]");
      if (!domCaptured) return;

      const tagName = domCaptured.tagName;
      // const img = event.target.closest("[data-img]");
      // console.log(img);

      if (tagName !== "DIV" && tagName !== "INPUT") return;
      const id = Number(domCaptured.dataset.id);
      let isCompleted = false;
      let isImportant = findData(id);
      if (event.target.checked) isCompleted = !isCompleted;
      if (tagName === "DIV") isImportant = !isImportant;
      const datacompleted = {};
      if (tagName === "INPUT") datacompleted["completed"] = isCompleted;
      if (tagName === "DIV") datacompleted["important"] = isImportant;

      //console.log(datacompleted);
      //actualizar en api fetch

      const task = await updateTask(id, datacompleted);
      console.log(task);
      //actualizar en store
      //console.log(tagName);
      dataTask.updateDataTask(task);
    } catch (error) {
      console.log(error);
    }

    //reload
    DOMHandler.reload();
  });
}

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
    <form class="flex flex-column gap-4 js-add-task">  
        ${input({
          id: "txt_nameTask",
          placeholder: "do the dishes...",
          required: true,
        })}

        ${input({
          id: "txt_date",
          type: "date",
          placeholder: "mm / dd / yy",
        })}
        <button type="submit" class="button button--primary">Add Task</button>
    </form>  
      
  `;
}
const Task = {
  toString() {
    return renderTask();
  },
  addListeners() {
    listenAddTask();
    actionsTasks();
  },
};

export { Task };
