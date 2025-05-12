const categoryFilter = document.getElementById("categoryFilter");
const productList = document.getElementById("productList");

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return res.json();
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" />
    <p>R$ ${product.price.toFixed(2)}</p>
    <a href="../../../tripStore/pages/produto.html?id=${product.id}">Ver Detalhes</a>
  `;
  return card;
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach(product => {
    const card = createProductCard(product);
    productList.appendChild(card);
  });
}

function setupCategoryFilter(products, categories) {
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    const filtered = selected === "all"
      ? products
      : products.filter(p => p.category === selected);

    renderProducts(filtered);
  });
}

async function init() {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);

    setupCategoryFilter(products, categories);
    renderProducts(products);
  } catch (error) {
    console.error("Erro ao carregar produtos ou categorias:", error);
    productList.innerHTML = "<p>Erro ao carregar produtos.</p>";
  }
}

init();