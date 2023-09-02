import { header } from "../components/headers.js";
import { input } from "../components/input.js";

import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-services.js";
import { HomePage } from "./home-page.js";

function renderLogin() {
  const { loginError } = LoginPage.state;
  return `
  ${header()}
  <main class="section-sm">
    <section class="container">      
      <form class="flex flex-column gap-4 js-form-login">
      ${loginError ? `<p class="danger">${loginError}</p>` : ""}
      ${input({
        label: "Email",
        id: "txt_email",
        placeholder: "you@example.com",
        type: "email",
        required: true,
      })}

      ${input({
        label: "Password",
        id: "txt_password",
        type: "password",
        required: true,
      })}
    
      <button type="submit" class="button button--primary">Login</button>
      <a href="#" class="text-center js-create-account">Create account</a>
      </form>
    </section>
  </main>
  `;
}

function listenSubmitLogin() {
  const submitLogin = document.querySelector(".js-form-login");
  submitLogin.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { txt_email, txt_password } = event.target.elements;
      const formData = {
        email: txt_email.value,
        password: txt_password.value,
      };
      const user = await login(formData);

      DOMHandler.load(HomePage);
    } catch (error) {
      //console.log(error);
      LoginPage.state.loginError = error.message;
    }
    DOMHandler.reload();
  });
}

const LoginPage = {
  toString() {
    return renderLogin();
  },
  addListeners() {
    listenSubmitLogin();
  },
  state: {
    loginError: null,
  },
};

export { LoginPage };
