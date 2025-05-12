function loadHeader() {
  const headerContainer = document.querySelector('body');
  
  fetch('/js/components/header.html')
    .then(response => response.text())
    .then(data => {
      headerContainer.insertAdjacentHTML('afterbegin', data);

      const menuIcon = document.getElementById("menu-icon");
      const navMenu = document.querySelector(".nav-menu");
      
      if (menuIcon) {
        menuIcon.addEventListener("click", () => {
          navMenu.classList.toggle("active");
        });
      } else {
        console.error("Menu Icon não encontrado.");
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o cabeçalho:', error);
    });
}

document.addEventListener("DOMContentLoaded", loadHeader);