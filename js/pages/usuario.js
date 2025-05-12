const userId = sessionStorage.getItem("userId");
const token = sessionStorage.getItem("token");
const msg = document.getElementById("msg");

if (!userId || !token) {
  const popup = document.getElementById("popup");
  const popupBtn = document.getElementById("popup-ok");

  popup.style.display = "flex";

  popupBtn.addEventListener("click", () => {
    window.location.href = "/pages/login.html";
  });

  throw new Error("Usuário não autenticado");
}

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const enderecoInput = document.getElementById("endereco");

fetch(`https://fakestoreapi.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        nomeInput.value = `${user.name.firstname} ${user.name.lastname}`;
        emailInput.value = user.email;
        telefoneInput.value = user.phone || "";
        enderecoInput.value = `${user.address.city}, ${user.address.street}` || "";
    })
    .catch(err => {
        msg.textContent = "Erro ao carregar dados do usuário.";
        console.error(err);
    });

document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const telefone = telefoneInput.value;
    const endereco = enderecoInput.value;

    msg.textContent = "Informações atualizadas com sucesso!";
});