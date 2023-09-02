import { currentUser, tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

async function login(credentials = { email, password }) {
  const { token } = await apiFetch("/login", { body: credentials });
  const user = credentials;
  sessionStorage.setItem(tokenKey, token);
  sessionStorage.setItem(currentUser, user.email);
  return user.email;
}

async function logout() {
  const data = await apiFetch("/logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
  sessionStorage.removeItem(currentUser);
  return data;
}

export { login, logout };
