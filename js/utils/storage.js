export function saveSession({ token, username, userId }) {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("userId", userId);
}