"use client";
import Link from "next/link";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Password({ mode = "forget-password" }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  console.log(mode);

  async function handleSubmit(eve) {
    eve.preventDefault();
    setLoading(false);
    setError(null);
    setSuccess(null);

    const formData = new FormData(eve.target);
    const email = formData.get("email");

    if (!emailRegex.test(email.trim())) {
      setError("E-mail is not valid!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong!");
      }

      const data = await res.json();
      setSuccess(data.message);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${loading && "opacity-80"} flex min-h-screen items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {mode === "forget-password" ? "Reset Password" : "New Password"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "forget-password" ? (
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
          ) : (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <input
                disabled={loading}
                type="password"
                id="password"
                name="password"
                className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? "cursor-not-allowed" : ""}`}
                placeholder="New Password"
              />
            </div>
          )}
          <button
            disabled={loading}
            type="submit"
            className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none ${loading ? "cursor-not-allowed" : ""}`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}{" "}
        {success && (
          <p className="mt-4 text-center text-green-600">{success}</p>
        )}{" "}
        {/* Display error message */}
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
