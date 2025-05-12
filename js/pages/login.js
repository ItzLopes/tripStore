import { createInput } from "../components/formInput.js";
import { loginUser, getUserByUsername } from "../api/auth.js";
import { saveSession } from "../utils/storage.js";

const container = document.getElementById("login-container");

const form = document.createElement("form");
form.className = "login-form";
form.id = "loginForm";

const title = document.createElement("h1");
title.textContent = "Entre na Trip's Store";

const usernameInput = createInput({
  type: "text",
  id: "username",
  placeholder: "Usuário",
  required: true,
  autocomplete: "username",
});

const passwordInput = createInput({
  type: "password",
  id: "password",
  placeholder: "Senha",
  required: true,
  autocomplete: "current-password",
});

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Login";

const errorMsg = document.createElement("p");
errorMsg.id = "errorMsg";
errorMsg.className = "erro";
errorMsg.style.display = "none";

const link = document.createElement("a");
link.href = "../pages/cadastro.html";
link.textContent = "Cadastre-se aqui";

form.append(usernameInput, passwordInput, button);
//container.className = "login-container";
container.append(title, form, errorMsg, link);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.style.display = "none";

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  try {
    const data = await loginUser(username, password);
    if (!data.token) throw new Error("Token não recebido.");

    const user = await getUserByUsername(username);
    if (!user) throw new Error("Usuário não encontrado.");

    saveSession({ token: data.token, username, userId: user.id });

    window.location.href = "/index.html";
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.style.display = "block";
  }
});