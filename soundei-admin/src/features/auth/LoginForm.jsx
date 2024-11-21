import { useState } from "react";
import useLogin from "./useLogin";

export default function LoginForm() {
  const [errors, setErrors] = useState({}); // State to manage form errors
  const { isPending, login } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target); // Create a FormData object

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validationErrors = {};
    if (!/\S+@\S+\.\S+/.test(data?.email))
      validationErrors.email = "Enter a valid email address.";
    if (!data?.password) validationErrors.password = "Password is required.";
    setErrors(validationErrors);

    console.log(data);

    // If there are no errors, proceed with the form submission
    if (Object.keys(validationErrors).length === 0) {
      login(data, {
        onSuccess: () => {
          event.target.reset(); // Reset the form
          setErrors({}); // Clear errors if any
        },
      });
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg sm:max-w-sm">
        {/* Card Header with Image */}
        <div className="relative top-1/2 mb-6 flex flex-col items-center justify-center">
          <img
            src="/icon.png"
            alt="Admin Panel Logo"
            className="h-20 w-20 rounded-full object-cover text-center"
          />
          <h3 className={"pt-2 text-2xl tracking-wide"}>
            Log in to your account!
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              disabled={isPending}
              id="email"
              name="email"
              className={`${isPending && "is-pending"} w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              disabled={isPending}
              className={`${isPending && "is-pending"} w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`${isPending && "is-pending"} w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Login
          </button>
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
