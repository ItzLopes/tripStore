const categoriaFavoritosSelect = document.getElementById('categoria-favoritos');
const favoritosContainer = document.getElementById('produtos-favoritos');
const searchInput = document.getElementById('searchInput');

// Função para carregar os favoritos
function carregarFavoritos(categoria = 'all') {
  const favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  
  // Verifica se existem favoritos e faz a requisição para obter os detalhes
  const produtosFavoritos = favoritos.map(id => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()));

  Promise.all(produtosFavoritos).then(produtos => {
    // Filtra os produtos com base na categoria
    const produtosFiltrados = categoria === 'all' ? produtos : produtos.filter(prod => prod.category === categoria);
    exibirFavoritos(produtosFiltrados);
  });
}

// Função para exibir os favoritos na página
function exibirFavoritos(produtos) {
  favoritosContainer.innerHTML = ''; // Limpa a lista de produtos

  if (produtos.length === 0) {
    favoritosContainer.innerHTML = "<p>Nenhum favorito encontrado.</p>";
  } else {
    produtos.forEach(produto => {
      const produtoHTML = `
        <div class="produto-item">
          <img src="${produto.image}" alt="${produto.title}">
          <h3>${produto.title}</h3>
          <p>R$ ${produto.price}</p>
          <a href="produto.html?id=${produto.id}">Ver detalhes</a>
          <button onclick="removerFavorito(${produto.id})">Remover dos Favoritos</button>
        </div>
      `;
      favoritosContainer.innerHTML += produtoHTML;
    });
  }
}

// Função para remover um produto dos favoritos
function removerFavorito(id) {
  let favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(favId => favId !== id);
  sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
  carregarFavoritos(categoriaFavoritosSelect.value);  // Atualiza os favoritos após remoção
}

// Filtro por categoria
categoriaFavoritosSelect.addEventListener('change', (e) => {
  carregarFavoritos(e.target.value);
});

// Filtro de pesquisa
searchInput.addEventListener('input', aplicarFiltroPesquisa);

function aplicarFiltroPesquisa() {
  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categoriaFavoritosSelect.value;

  const favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  const produtosFavoritos = favoritos.map(id => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()));

  Promise.all(produtosFavoritos).then(produtos => {
    const produtosFiltrados = produtos.filter(prod => {
      const nome = prod.title.toLowerCase();
      const categoria = prod.category.toLowerCase();

      const nomeMatch = nome.includes(textoBusca);
      const categoriaMatch =
        categoriaSelecionada === 'all' || categoria.includes(categoriaSelecionada);

      return nomeMatch && categoriaMatch;
    });
    exibirFavoritos(produtosFiltrados);
  });
}

// Carrega os favoritos ao carregar a página
carregarFavoritos();
