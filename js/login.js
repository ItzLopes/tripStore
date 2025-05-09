document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form_login");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const username = document.getElementById("id_login").value.trim();
        const password = document.getElementById("id_senha").value.trim();

        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Resposta da API:", data);
            if (data.token) {
                alert("Login bem-sucedido! Token: " + data.token);
                window.location.href = "home.html";
            } else {
                alert("Falha no login. Verifique suas credenciais.");
            }
        })
        .catch(error => {
            console.error("Erro ao fazer login:", error);
            alert("Erro na comunicação com o servidor.");
        });
    });
});
