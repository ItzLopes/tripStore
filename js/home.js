const produtosContainer = document.getElementById('produtos');
const categoriaSelect = document.getElementById('categoria');
const searchInput = document.getElementById('search');

let categoriaAtual = 'all';  // Variável para armazenar a categoria selecionada
let termoPesquisa = '';  // Variável para armazenar o termo de pesquisa

function carregarProdutos(categoria = 'all', pesquisa = '') {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      // Filtra por categoria
      const produtosFiltradosCategoria = categoria === 'all' ? produtos : produtos.filter(prod => prod.category === categoria);

      // Filtra por termo de pesquisa
      const produtosFiltrados = produtosFiltradosCategoria.filter(prod =>
        prod.title.toLowerCase().includes(pesquisa.toLowerCase())
      );

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
  categoriaAtual = e.target.value;
  carregarProdutos(categoriaAtual, termoPesquisa);
});

searchInput.addEventListener('input', (e) => {
  termoPesquisa = e.target.value;
  carregarProdutos(categoriaAtual, termoPesquisa);
});

// Carrega produtos inicialmente
carregarProdutos(categoriaAtual, termoPesquisa);
