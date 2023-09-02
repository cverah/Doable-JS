import { currentUser, tokenKey } from "./scripts/config.js";
import dataTask from "./scripts/data-task.js";
import DOMHandler from "./scripts/dom-handler.js";
import { HomePage } from "./scripts/pages/home-page.js";
import { LoginPage } from "./scripts/pages/login-page.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    //console.log(token);
    if (!token) return DOMHandler.load(LoginPage);
    dataTask.user = sessionStorage.getItem(currentUser);
    await dataTask.getTasks();
    //dataTask.shortAlphabetic();
    //console.log(dataTask);
    DOMHandler.load(HomePage);
  } catch (error) {
    console.log(error.message);
    sessionStorage.removeItem(tokenKey);
    sessionStorage.removeItem(currentUser);
    DOMHandler.load(LoginPage);
  }
  DOMHandler.reload();
}
init();
