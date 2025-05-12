document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");
  const acaoSelect = document.getElementById("acao");
  const formContainer = document.getElementById("formContainer");
  const mensagem = document.getElementById("mensagem");

  if (!token) {
    const popup = document.getElementById("popup");
    const popupBtn = document.getElementById("popup-ok");

    popup.style.display = "flex";

    popupBtn.addEventListener("click", () => {
      window.location.href = "../../../tripStore/pages/login.html";
    });

    return;
  }

  const buscarProdutos = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  };

  function limparCamposProduto() {
    ["title", "price", "description", "image", "category", "id"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  }

  const renderForm = async (acao) => {
    mensagem.textContent = "";
    formContainer.innerHTML = "";

    const produtos = await buscarProdutos();

    if (acao === "add") {
      formContainer.innerHTML = `
        <input type="text" id="title" placeholder="Título" required>
        <input type="number" id="price" placeholder="Preço" required>
        <input type="text" id="description" placeholder="Descrição" required>
        <input type="text" id="image" placeholder="URL da Imagem" required>
        <input type="text" id="category" placeholder="Categoria" required>
        <button id="enviar">Adicionar</button>
      `;
    }

    if (acao === "update" || acao === "delete") {
      const selectHTML = `
        <label for="id">Escolha um produto:</label>
        <select id="id">
          <option disabled selected value="">Selecione um produto</option>
          ${produtos.map(prod => `<option value="${prod.id}">${prod.title}</option>`).join("")}
        </select>
      `;

      formContainer.innerHTML += selectHTML;

      if (acao === "update") {
        formContainer.innerHTML += `
          <input type="text" id="title" placeholder="Título" required>
          <input type="number" id="price" placeholder="Preço" required>
          <input type="text" id="description" placeholder="Descrição" required>
          <input type="text" id="image" placeholder="URL da Imagem" required>
          <input type="text" id="category" placeholder="Categoria" required>
        `;
      }

      formContainer.innerHTML += `<button id="enviar">${acao === "update" ? "Atualizar" : "Deletar"}</button>`;
    }

    document.getElementById("enviar").addEventListener("click", async () => {
      const id = document.getElementById("id")?.value?.trim();
      const title = document.getElementById("title")?.value?.trim();
      const price = document.getElementById("price")?.value?.trim();
      const description = document.getElementById("description")?.value?.trim();
      const image = document.getElementById("image")?.value?.trim();
      const category = document.getElementById("category")?.value?.trim();

      if (acao === "add" || acao === "update") {
        if (
          (acao === "update" && !id) ||
          !title || !price || !description || !image || !category
        ) {
          mensagem.textContent = "Preencha todos os campos antes de continuar.";
          mensagem.className = "red";
          return;
        }

        if (isNaN(price) || price <= 0) {
          mensagem.textContent = "O preço deve ser um número válido e maior que zero.";
          mensagem.className = "red";
          return;
        }
      }

      if (acao === "delete" && !id) {
        mensagem.textContent = "Informe o produto a ser deletado.";
        mensagem.className = "red";
        return;
      }

      try {
        let res;

        if (acao === "add") {
          res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, description, image, category }),
          });
        } else if (acao === "update") {
          res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, price, description, image, category }),
          });
        } else if (acao === "delete") {
          res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE",
          });
        }

        if (res.ok) {
          mensagem.className = "green";
          mensagem.textContent = "Ação realizada com sucesso!";
          limparCamposProduto();
        } else {
          throw new Error("Erro ao realizar a ação.");
        }
      } catch (err) {
        mensagem.className = "red";
        mensagem.textContent = err.message;
      }
    });
  };

  acaoSelect.addEventListener("change", () => {
    renderForm(acaoSelect.value);
  });

  renderForm(acaoSelect.value);
});