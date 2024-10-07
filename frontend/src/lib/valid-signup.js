export const validSighupFields = (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = [];

  if (!name) {
    errors.push("Name is required.");
  } else if (name.length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required.");
  } else if (!emailRegex.test(email)) {
    errors.push("Email is not valid.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
};
