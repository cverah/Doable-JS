import apiFetch from "./api-fetch.js";

async function createUser(dataUser = { email, password }) {
  const tokenUser = await apiFetch("/signup", { body: dataUser });
  return tokenUser;
}

export { createUser };
