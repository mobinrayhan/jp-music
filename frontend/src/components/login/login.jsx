"use client";
import { validLoginFields } from "@/lib/valid-login";
import { fetchWithApiKey } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const errors = validLoginFields(formData);
    console.log(errors);

    if (errors.length > 0) {
      setError(errors[0]);
      setLoading(false);
      return;
    }

    const email = formData.get("email");
    const password = formData.get("password");
    const loginData = { email, password };

    try {
      const updatedData = await fetchWithApiKey(`/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      console.log(updatedData);
    } catch (err) {
      console.log(err);
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${loading && "opacity-80"} flex min-h-screen items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              disabled={loading}
              name="email"
              type="email"
              id="email"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              disabled={loading}
              type="password"
              name="password"
              id="password"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}{" "}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0 sm:space-x-4">
          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
          <button
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <FaGithub className="mr-2" />
            Sign up with GitHub
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;