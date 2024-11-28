export function getToken() {
  const existedUser = localStorage.getItem("user");
  if (!existedUser) return null;

  return JSON.parse(existedUser);
}

export function removeToken() {
  return localStorage.removeItem("user");
}
