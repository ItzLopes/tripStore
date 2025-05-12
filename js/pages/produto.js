const productContainer = document.getElementById("productContainer");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupBtn = document.getElementById("popup-ok");

  popupMessage.textContent = message;
  popup.style.display = "flex";

  popupBtn.onclick = () => {
    popup.style.display = "none";
  };
}


function createProductHTML(product) {
  return `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}" />
    </div>
    <div class="info">
      <h1>${product.title}</h1>
      <p class="category">${product.category}</p>
      <div class="price">R$ ${product.price.toFixed(2)}</div>
      <p class="description">${product.description}</p>
      <div class="actions">
        <button id="favoriteBtn">Adicionar aos Favoritos</button>
        <button id="goToCartBtn">Ir para o Carrinho</button>
      </div>
    </div>
  `;
}

function setupEventListeners(product) {
  const favoriteBtn = document.getElementById("favoriteBtn");
  const goToCartBtn = document.getElementById("goToCartBtn");

  favoriteBtn.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!favorites.includes(product.id)) {
      favorites.push(product.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showPopup("Produto adicionado aos favoritos!");
    } else {
      showPopup("Esse produto já está nos favoritos.");
    }
  });


  goToCartBtn.addEventListener("click", () => {
    window.location.href = "../pages/carrinho.html?id=" + product.id;
  });
}

async function loadProduct(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error("Produto não encontrado");

    const product = await response.json();
    productContainer.innerHTML = createProductHTML(product);
    setupEventListeners(product);
  } catch (error) {
    productContainer.innerHTML = "<p>Erro ao carregar o produto.</p>";
    console.error(error);
  }
}

if (productId) {
  loadProduct(productId);
} else {
  productContainer.innerHTML = "<p>Produto não encontrado...</p>";
}