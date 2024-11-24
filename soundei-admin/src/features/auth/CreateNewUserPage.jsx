import { useRef, useState } from "react";
import Select from "react-select";
import useCreateUser from "./useCreateUser";

const usersRole = [
  { value: "", label: "Select User Role" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "user", label: "User" },
];

export default function CreateNewUserPage() {
  const [errors, setErrors] = useState({}); // State to manage form errors
  const { isPending, signup } = useCreateUser();
  const formRef = useRef();

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
      signup(data, {
        onSuccess: () => {
          event.target.reset(); // Reset the form
          setErrors({}); // Clear errors if any
        },
      });
    }
  };

  return (
    <section className="flex items-center justify-center rounded-lg shadow-md">
      <div className={`w-full rounded-lg bg-white p-20`}>
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Create New User
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
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
              disabled={isPending}
              className={`${isPending && "is-pending"} w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-50`}
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
              className={`${isPending && "is-pending"} w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-50`}
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
              disabled={isPending}
              required
              placeholder="Enter a password"
              className={`${isPending && "is-pending"} w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-50`}
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
              disabled={isPending}
              name="repeatPassword"
              minLength={6}
              placeholder="Re-enter the password"
              className={`${isPending && "is-pending"} w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-50`}
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
            <Select
              options={usersRole}
              name="role"
              id="role"
              defaultValue={usersRole[0]}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              type="button"
              onClick={() => formRef.current && formRef.current.reset()}
              disabled={isPending}
              className={` ${isPending && "is-pending"} rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={` ${isPending && "is-pending"} flex h-12 w-52 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600`}
            >
              {isPending ? (
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
              ) : (
                "Create New User"
              )}
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
