export const validLoginFields = (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = [];

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
