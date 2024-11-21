export function getToken() {
  const existedUser = localStorage.getItem("user");
  if (!existedUser) return null;

  return JSON.parse(existedUser);
}
