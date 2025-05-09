const categoriaFavoritosSelect = document.getElementById('categoria-favoritos');
const favoritosContainer = document.getElementById('produtos-favoritos');
const searchInput = document.getElementById('searchInput');


function carregarFavoritos(categoria = 'all') {
  const favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  
 
  const produtosFavoritos = favoritos.map(id => fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()));

  Promise.all(produtosFavoritos).then(produtos => {

    const produtosFiltrados = categoria === 'all' ? produtos : produtos.filter(prod => prod.category === categoria);
    exibirFavoritos(produtosFiltrados);
  });
}


function exibirFavoritos(produtos) {
  favoritosContainer.innerHTML = ''; 

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


function removerFavorito(id) {
  let favoritos = JSON.parse(sessionStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(favId => favId !== id);
  sessionStorage.setItem('favoritos', JSON.stringify(favoritos));
  carregarFavoritos(categoriaFavoritosSelect.value);  // Atualiza os favoritos após remoção
}


categoriaFavoritosSelect.addEventListener('change', (e) => {
  carregarFavoritos(e.target.value);
});

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


carregarFavoritos();
