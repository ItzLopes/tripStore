# 🛒 Trip Store

**Trip Store** é um projeto educacional de e-commerce desenvolvido por alunos da Fábrica de Software 32, utilizando a [FakeStoreAPI](https://fakestoreapi.com/) para simular um sistema de loja com produtos e usuários pré-cadastrados, além da API [ViaCEP](https://viacep.com.br) para busca de endereços por CEP.

Elaborado pelo Professor Caique Fernandes Lopes

Este projeto visa aplicar conceitos de consumo de APIs, armazenamento local/session e manipulação de rotas em páginas web.

## 🚀 Funcionalidades

### 🔐 Login
- Formulário de login com usuário e senha.
- Validação por token da API.
- Armazenamento do nome do usuário na `sessionStorage`.
- Redirecionamento para a Home após login bem-sucedido.
- Exibição de erro em caso de falha no login.
- Link para página de cadastro.

### 🏠 Home
- Exibição de todos os produtos ao carregar.
- Filtro por categoria.
- Cada produto possui link para página de detalhes (`Produto`).

### 📦 Produto
- Página individual que carrega produto via parâmetro na URL.
- Galeria de imagens e descrição do produto.
- Botão para adicionar aos favoritos (armazenado em `localStorage`).
- Botão para adicionar ao carrinho.

### 🛍 Carrinho
- Exibe produtos adicionados para compra com controle de quantidade.
- Formulário de endereço com integração ao ViaCEP.
- Validação de token antes de finalizar compra.
- Se não logado, redireciona para Login.

### 👤 Usuário
- Mostra dados do usuário com base no login (`sessionStorage`).
- Nome e e-mail não podem ser alterados.
- Atualização de dados permitida com botão "Atualizar".

### ❤️ Favoritos
- Lista de produtos salvos no `localStorage`.
- Filtro por categoria.
- Opção de remover favoritos.

### ✏️ Editar Produtos
- Acesso restrito a usuários logados (verifica `sessionStorage`).
- Permite:
  - Adicionar produto.
  - Atualizar produto.
  - Deletar produto.
- Para ações como atualizar/deletar, o ID do produto pode ser solicitado.
- Mensagens de sucesso ou erro ao final de cada ação.

### 📝 Cadastro
- Formulário com dados básicos de cadastro.
- A API não salva novos usuários, então apenas exibe mensagem de sucesso.
- Link de retorno ao Login.

---

## 🛠 Tecnologias Utilizadas

- HTML / CSS / JavaScript
- [FakeStoreAPI](https://fakestoreapi.com/)
- [ViaCEP API](https://viacep.com.br)
- `sessionStorage` e `localStorage` para controle de sessão e favoritos
- Fetch API para requisições HTTP

---

## 📁 Estrutura de Páginas


---

## ✅ Requisitos para Rodar o Projeto

- Navegador atualizado (Chrome, Firefox, etc.)
- Conexão com a internet para consumir as APIs
- (Opcional) Um servidor local (como Live Server ou XAMPP) para evitar problemas com requisições CORS

---

## 📌 Observações

- Este projeto tem fins educativos e não realiza compras reais.
- A autenticação e o cadastro são **simulados** via `sessionStorage` e `localStorage`, e não interagem com um banco de dados real.
- A API utilizada (**Fake Store API**) é pública e seus dados não são persistentes.
- O sistema de login e manipulação de produtos serve apenas para fins de aprendizado.

---

## ©️ Copyright

Desenvolvido por **Fábrica 32** — Todos os direitos reservados.  
📅 Projeto educacional — Senac, 2025.
