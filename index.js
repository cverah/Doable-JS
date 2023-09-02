import { currentUser, tokenKey } from "./scripts/config.js";
import dataTasks from "./scripts/data-tasks.js";
import DOMHandler from "./scripts/dom-handler.js";
import { HomePage } from "./scripts/pages/home-page.js";
import { LoginPage } from "./scripts/pages/login-page.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) return DOMHandler.load(LoginPage);
    dataTasks.user = sessionStorage.getItem(currentUser);
    await dataTasks.getTasks();
    //dataTasks.shortAlphabetic();
    //console.log(dataTasks);
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
