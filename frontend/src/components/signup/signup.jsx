"use client";
import { validSighupFields } from "@/lib/valid-signup";
import { fetchWithApiKey } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const apiUrl = process.env.API_URL;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const errors = validSighupFields(formData); // Ensure to use formData

    if (errors.length > 0) {
      setError(errors[0]);
      setLoading(false);
      return;
    }

    const username = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    const signupData = { username, email, password, role: "user" };

    console.log(signupData);

    try {
      const updatedData = await fetchWithApiKey(`/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupData),
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
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              disabled={loading}
              type="text"
              id="name"
              name="name"
              className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? "cursor-not-allowed" : ""}`}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              disabled={loading}
              type="email"
              id="email"
              name="email"
              className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? "cursor-not-allowed" : ""}`}
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
              minLength={6}
              disabled={loading}
              type="password"
              id="password"
              name="password"
              className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? "cursor-not-allowed" : ""}`}
              placeholder="Create a password"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none ${loading ? "cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}{" "}
        {/* Display error message */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0 sm:space-x-4">
          <button
            disabled={loading}
            className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${loading ? "cursor-not-allowed" : ""}`}
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
          <button
            disabled={loading}
            className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${loading ? "cursor-not-allowed" : ""}`}
          >
            <FaGithub className="mr-2" />
            Sign up with GitHub
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
