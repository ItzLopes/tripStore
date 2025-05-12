document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const mensagem = document.getElementById("mensagem");

    if (!name || !username || !email || !password) {
        mensagem.textContent = "Todos os campos são obrigatórios!";
        mensagem.className = "erro";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        mensagem.style.color = "red";
        mensagem.textContent = "Email inválido!";
        mensagem.className = "erro";
        return;
    }

    try {
        const response = await fetch("https://fakestoreapi.com/users", {
            method: "POST",
            body: JSON.stringify({
                email,
                username,
                password,
                name: { firstname: name.split(" ")[0], lastname: name.split(" ").slice(1).join(" ") },
                phone: "000000000"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erro ao cadastrar.");

        mensagem.style.color = "green";
        mensagem.textContent = "Cadastro realizado com sucesso! Faça login para continuar.";
        document.getElementById("cadastroForm").reset();

    } catch (err) {
        mensagem.style.color = "red";
        mensagem.textContent = err.message;
    }
});