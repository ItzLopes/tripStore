const products = [
  { id: 1, nome: "Smartphone", categoria: "eletronicos" },
  { id: 2, nome: "Camisa Polo", categoria: "roupas" },
  { id: 3, nome: "Notebook", categoria: "eletronicos" },
  { id: 4, nome: "Livro de HTML", categoria: "livros" },
  { id: 5, nome: "Calça Jeans", categoria: "roupas" },
];

// Primeiro: pegar os elementos do DOM
const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

// Depois: adicionar os eventos
searchInput.addEventListener("keyup", filterList);
categoryFilter.addEventListener("change", () => {
  filterProducts();
  filterList();
});

// Funções
function renderProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${prod.nome}</h3>
      <p class="hidden-category">Categoria: ${prod.categoria}</p>
      <a href="produto.html?id=${prod.id}">Ver detalhes</a>
    `;
    productList.appendChild(div);
  });
}

function filterProducts() {
  const categoria = categoryFilter.value;
  const filtrados = categoria === "all" ? products : products.filter(p => p.categoria === categoria);
  renderProducts(filtrados);
}

function filterList() {
  const input = searchInput.value.toUpperCase();
  const liElements = Array.from(productList.getElementsByClassName('product'));
  liElements.forEach(li => {
    const productName = li.getElementsByTagName("h3")[0].textContent || "";
    li.style.display = productName.toUpperCase().includes(input) ? "" : "none";
  });
}

// Inicializa exibindo todos
renderProducts(products);
