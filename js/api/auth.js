export async function loginUser(username, password) {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos.");
  }

  return response.json();
}

export async function getUserByUsername(username) {
  const res = await fetch("https://fakestoreapi.com/users");
  const users = await res.json();
  return users.find((u) => u.username === username);
}