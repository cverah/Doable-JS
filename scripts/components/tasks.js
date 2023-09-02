import dataTask from "../data-task.js";
import DOMHandler from "../dom-handler.js";
import { createTask, updateTask } from "../services/tasks-services.js";

import { input } from "./input.js";

function listenAddTask() {
  const submitAddTask = document.querySelector(".js-add-task");
  submitAddTask.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
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

function optionsDataTask() {
  const optionTask = document.querySelector(".js-options-dataTask");

  const checkPending = document.querySelector(".js-check-pending");
  const checkImportant = document.querySelector(".js-check-important");
  checkPending.addEventListener("change", (event) => {
    try {
      event.preventDefault();
      event.target.checked
        ? (dataTask.currentCheckPending = "pending")
        : (dataTask.currentCheckPending = null); //
    } catch (error) {
      console.log(error);
    }

    //DOMHandler.reload();
  });

  checkImportant.addEventListener("change", (event) => {
    event.target.checked
      ? (dataTask.currentCheckImportant = "important")
      : (dataTask.currentCheckImportant = null); //
  });

  optionTask.addEventListener("change", (event) => {
    //console.dir(event.target.tagName);
    try {
      event.preventDefault();
      const tagName = event.target.tagName;
      if (tagName !== "INPUT" && tagName !== "SELECT") return;

      if (tagName === "SELECT") dataTask.currentSelect = event.target.value;
      const dataOption = {
        select: dataTask.currentSelect,
        checkPending: dataTask.currentCheckPending,
        checkImportant: dataTask.currentCheckImportant,
      };
      //console.log(dataOption);
      dataTask.orderOption(dataOption);
    } catch (error) {
      console.log(error);
    }
    DOMHandler.reload();
  });
}

function renderOption() {
  return `
    <div class="flex flex-column gap-4 js-options-dataTask">
      <div class="flex gap-8 items-center">
        <label> Select </label>
        <select class="select select__input js-selected" name="select" id="">
          <option value="order" ${
            dataTask.currentSelect === "order" ? "selected" : ""
          }>Alphabetical (a-z)</option>
          <option value="due-date"  ${
            dataTask.currentSelect === "due-date" ? "selected" : ""
          }>Due Date</option>
          <option value="importance"  ${
            dataTask.currentSelect === "importance" ? "selected" : ""
          }>Importance</option>
        </select>
      </div>
      <div class="flex gap-8 items-center">
        <label> Show </label>
        <div class="checkbox">
          <input type="checkbox" id="cb-pending" class="checkbox__input js-check-pending" ${
            dataTask.currentCheckPending ? "checked" : ""
          }/>
          <label for="cb-pending"> Only Pending</label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" id="cb-important" class="checkbox__input js-check-important" ${
              dataTask.currentCheckImportant ? "checked" : ""
            } /> 
            <label for="cb-important"> Only Important </label>
        </div>
      </div>
    </div>
  `;
}

function renderTask() {
  const tasks = dataTask.tasks;
  return `
    ${renderOption()}
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
    optionsDataTask();
  },
};

export { Task };
