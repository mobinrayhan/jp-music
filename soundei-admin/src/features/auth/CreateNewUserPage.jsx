import { useState } from "react";
import useCreateUser from "./useCreateUser";

export default function CreateNewUserPage() {
  const [errors, setErrors] = useState({}); // State to manage form errors
  const { isPending, signup } = useCreateUser();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target); // Create a FormData object

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
      role: formData.get("role"),
    };

    // Validate the form data
    const validationErrors = {};
    if (!data?.username) validationErrors.username = "Full name is required.";
    if (!data?.email) validationErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(data?.email))
      validationErrors.email = "Enter a valid email address.";
    if (!data?.password) validationErrors.password = "Password is required.";
    if (data?.password?.length < 6)
      validationErrors.password = "Password must be at least 6 characters.";
    if (!data?.repeatPassword)
      validationErrors.repeatPassword = "Please confirm your password.";
    if (data?.password !== data?.repeatPassword)
      validationErrors.repeatPassword = "Passwords do not match.";
    if (!data?.role) validationErrors.role = "Role is required.";

    setErrors(validationErrors);

    // If there are no errors, proceed with the form submission
    if (Object.keys(validationErrors).length === 0) {
      signup(data);
    }
  };

  return (
    <section className="flex items-center justify-center rounded-lg shadow-md">
      <div className="w-full rounded-lg bg-white p-20">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Create New User
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your full name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              minLength={6}
              name="password"
              required
              placeholder="Enter a password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="new-password"
            />
          </div>

          {/* Repeat Password */}
          <div>
            <label
              htmlFor="repeatPassword"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Repeat Password
            </label>
            <input
              type="password"
              required
              id="repeatPassword"
              autoComplete="new-password"
              name="repeatPassword"
              minLength={6}
              placeholder="Re-enter the password"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              type="button"
              className="w-full rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400 md:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 md:w-auto"
            >
              Create New User
            </button>
          </div>
        </form>
        {errors && (
          <p className="py-4 text-center text-red-500">
            {Object.values(errors)[0]}{" "}
          </p>
        )}
      </div>
    </section>
  );
}
