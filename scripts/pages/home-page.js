import { header } from "../components/headers.js";
import { Task } from "../components/tasks.js";
import DOMHandler from "../dom-handler.js";
import { logout } from "../services/sessions-services.js";
import { LoginPage } from "./login-page.js";

function listenlogout() {
  const ancorLogout = document.querySelector(".js-logout");
  ancorLogout.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      await logout();

      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

function renderHomePage() {
  // dataTask.shortAlphabetic();
  return `
    ${header()}
    <main class="section-sm">
      <section class="container"> 
      ${Task}
      </section>
    </main>
  `;
}
const HomePage = {
  toString() {
    return renderHomePage();
  },
  addListeners() {
    listenlogout();
  },
};

export { HomePage };
