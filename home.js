const produtosContainer = document.getElementById('produtos');
const categoriaSelect = document.getElementById('categoria');

function carregarProdutos(categoria = 'all') {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      const produtosFiltrados = categoria === 'all' ? produtos : produtos.filter(prod => prod.category === categoria);
      exibirProdutos(produtosFiltrados);
    });
}

function exibirProdutos(produtos) {
  produtosContainer.innerHTML = '';
  produtos.forEach(produto => {
    const produtoHTML = `
      <div class="produto-item">
        <img src="${produto.image}" alt="${produto.title}">
        <h3>${produto.title}</h3>
        <p>R$ ${produto.price}</p>
        <a href="produto.html?id=${produto.id}">Ver detalhes</a>
        <button class="favoritar-btn" data-id="${produto.id}">
          <span class="estrela">☆</span>
        </button>
      </div>
    `;
    produtosContainer.innerHTML += produtoHTML;
  });

  const favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  favoritos.forEach(id => {
    const starIcon = document.querySelector(`button[data-id="${id}"] .estrela`);
    if (starIcon) {
      starIcon.textContent = '★';
    }
  });

  document.querySelectorAll('.favoritar-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      let favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];

      if (favoritos.includes(productId)) {
        favoritos = favoritos.filter(id => id !== productId);
        button.querySelector('.estrela').textContent = '☆';
      } else {
        favoritos.push(productId);
        button.querySelector('.estrela').textContent = '★';
      }

      sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
    });
  });
}

categoriaSelect.addEventListener('change', (e) => {
  carregarProdutos(e.target.value);
});

carregarProdutos();
