const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const productContainer = document.getElementById("productContainer");
const addressForm = document.getElementById("addressForm");
const cepInput = document.getElementById("cep");

let selectedProduct = null;

function showPopup(message, callback) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const okButton = document.getElementById("popup-ok");

  popupMessage.textContent = message;
  popup.style.display = "flex";

  okButton.onclick = () => {
    popup.style.display = "none";
    if (typeof callback === "function") callback();
  };
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

if (!productId || isNaN(productId)) {
  productContainer.innerHTML = "<p>Produto Inválido!</p>";
} else {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      selectedProduct = product;

      productContainer.innerHTML = `
        <div class="product">
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}" />
          </div>
          <div class="product-details">
            <h2>${product.title}</h2>
            <p>Preço Unitário: ${formatCurrency(product.price)}</p>

            <div class="quantity-group inside-product">
              <label for="quantity">Quantidade:</label>
              <div class="quantity-controls">
                <button type="button" class="qty-btn" id="decreaseBtn">−</button>
                <input type="number" id="quantity" value="1" min="1" />
                <button type="button" class="qty-btn" id="increaseBtn">+</button>
              </div>
            </div>

            <p id="subtotal">Subtotal: ${formatCurrency(product.price)}</p>
          </div>
        </div>
      `;

      const quantityInput = document.getElementById("quantity");
      const subtotalElement = document.getElementById("subtotal");
      const increaseBtn = document.getElementById("increaseBtn");
      const decreaseBtn = document.getElementById("decreaseBtn");

      function updateSubtotal() {
        const qty = parseInt(quantityInput.value) || 1;
        const subtotal = selectedProduct.price * qty;
        subtotalElement.textContent = `Subtotal: ${formatCurrency(subtotal)}`;
      }

      increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateSubtotal();
      });

      decreaseBtn.addEventListener("click", () => {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
          quantityInput.value = currentQty - 1;
          updateSubtotal();
        }
      });

      quantityInput.addEventListener("input", () => {
        let qty = parseInt(quantityInput.value);
        if (isNaN(qty) || qty < 1) qty = 1;
        quantityInput.value = qty;
        updateSubtotal();
      });
    })
    .catch(() => {
      productContainer.innerHTML = "<p>Erro ao carregar produto.</p>";
    });
}

cepInput.addEventListener("blur", () => {
  const cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      document.getElementById("logradouro").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
    });
});

addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const token = sessionStorage.getItem("token");

  if (!token) {
  const popup = document.getElementById("popup");
  const popupBtn = document.getElementById("popup-ok");

  popup.style.display = "flex";

  popupBtn.addEventListener("click", () => {
    window.location.href = "/pages/login.html";
  });

  return;
}

  const qtd = parseInt(document.getElementById("quantity").value);
  const total = (selectedProduct.price * qtd).toFixed(2);

  showPopup(`Compra finalizada! Total: R$ ${total}`, () => {
    addressForm.reset();

    const quantityInput = document.getElementById("quantity");
    if (quantityInput) quantityInput.value = 1;

    window.location.href = "/index.html";
  });
});