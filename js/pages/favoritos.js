const produtosContainer = document.getElementById("produtos");
const categoriaSelect = document.getElementById("categoria");

let favoritos = JSON.parse(localStorage.getItem("favorites")) || [];
let produtosFavoritos = [];

async function carregarCategorias() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categorias = await res.json();

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoriaSelect.appendChild(option);
  });
}

async function carregarFavoritos() {
  if (favoritos.length === 0) {
    produtosContainer.innerHTML = '<p class="empty">Nenhum produto nos favoritos.</p>';
    return;
  }

  const res = await fetch("https://fakestoreapi.com/products");
  const produtos = await res.json();

  produtosFavoritos = produtos.filter(p => favoritos.includes(p.id));
  renderizarProdutos(produtosFavoritos);
}

function showConfirm(message, onConfirm) {
  const popup = document.getElementById("confirm-popup");
  const msg = document.getElementById("confirm-message");
  const yesBtn = document.getElementById("confirm-yes");
  const noBtn = document.getElementById("confirm-no");

  msg.textContent = message;
  popup.style.display = "flex";

  const cleanup = () => {
    popup.style.display = "none";
    yesBtn.removeEventListener("click", confirmHandler);
    noBtn.removeEventListener("click", cancelHandler);
  };

  const confirmHandler = () => {
    cleanup();
    onConfirm(true);
  };

  const cancelHandler = () => {
    cleanup();
    onConfirm(false);
  };

  yesBtn.addEventListener("click", confirmHandler);
  noBtn.addEventListener("click", cancelHandler);
}


function renderizarProdutos(lista) {
  produtosContainer.innerHTML = "";

  if (lista.length === 0) {
    produtosContainer.innerHTML = '<p class="empty">Nenhum produto encontrado para esta categoria.</p>';
    return;
  }

  lista.forEach(produto => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" />
      <h3>${produto.title}</h3>
      <p><strong>Categoria:</strong> ${produto.category}</p>
      <button data-id="${produto.id}">Remover dos Favoritos</button>
    `;
    produtosContainer.appendChild(card);
  });

  document.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);

      showConfirm("Deseja remover este item dos favoritos?", (confirmed) => {
        if (confirmed) {
          favoritos = favoritos.filter(favId => favId !== id);
          localStorage.setItem("favorites", JSON.stringify(favoritos));

          produtosFavoritos = produtosFavoritos.filter(p => p.id !== id);
          const filtroAtual = categoriaSelect.value;

          if (filtroAtual === "all") {
            renderizarProdutos(produtosFavoritos);
          } else {
            const filtrados = produtosFavoritos.filter(p => p.category === filtroAtual);
            renderizarProdutos(filtrados);
          }
        }
      });
    });
  });


}

categoriaSelect.addEventListener("change", () => {
  const filtro = categoriaSelect.value;
  if (filtro === "all") {
    renderizarProdutos(produtosFavoritos);
  } else {
    const filtrados = produtosFavoritos.filter(p => p.category === filtro);
    renderizarProdutos(filtrados);
  }
});

carregarCategorias();
carregarFavoritos();