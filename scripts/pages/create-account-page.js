import { header } from "../components/headers.js";
import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { createUser } from "../services/user-services.js";
import { LoginPage } from "./login-page.js";

function listenReturnLogin() {
  const ancorlogin = document.querySelector(".js-return-login");
  ancorlogin.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(LoginPage);
  });
}

function listenCreateAccount() {
  const formCreateAccount = document.querySelector(".js-form-create-account");
  formCreateAccount.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { txt_email, txt_password } = event.target.elements;
      const dataUser = {
        email: txt_email.value,
        password: txt_password.value,
      };
      //console.log(dataUser);
      const tokenUser = await createUser(dataUser);
      if (tokenUser) {
        AccountPage.state.success =
          "created successfully, go to login to start session";
        AccountPage.state.createError = null;
      }
      DOMHandler.reload();
    } catch (error) {
      //console.log(error);
      AccountPage.state.createError = error.message;
      AccountPage.state.success = null;
    }
    DOMHandler.reload();
  });
}

//message
function render_message() {
  let { createError, success } = AccountPage.state;
  let objmessage = "";
  if (createError) {
    objmessage = {
      message: createError,
      class: "danger",
    };
  }
  if (success) {
    objmessage = {
      message: success,
      class: "success",
    };
  }
  return objmessage;
}

function renderAccount() {
  const dataMessage = render_message();
  return `
    ${header()}
    <main class="section-sm">
      <section class="container">
        <form class="flex flex-column gap-4 js-form-create-account">
        ${
          dataMessage
            ? `<p class="${dataMessage.class}">${dataMessage.message}</p>`
            : `<p></p>`
        }
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
          <button type="submit" class="button button--primary"> Create Account </button>
          <a href="" class="text-center js-return-login"> Login </a>
        </form>
      </section>
    </main>
  `;
}
const AccountPage = {
  toString() {
    return renderAccount();
  },
  addListeners() {
    listenCreateAccount();
    listenReturnLogin();
  },
  state: {
    createError: null,
    success: null,
  },
};

export { AccountPage };
