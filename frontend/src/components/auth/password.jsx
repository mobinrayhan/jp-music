"use client";
import { findAccount, forgetPassword } from "@/actions/authAction";
import Link from "next/link";

import { useFormState, useFormStatus } from "react-dom";

export default function Password({ mode = "forget-password", userId }) {
  const [{ success, error }, action] = useFormState(
    userId ? forgetPassword : findAccount,
    {
      success: null,
      error: null,
    },
  );

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {mode === "forget-password" ? "Reset Password" : "New Password"}
        </h2>
        <form className="space-y-4" action={action}>
          <FormInputs mode={mode} />
          {userId && <input type="hidden" name="userId" value={userId} />}
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}{" "}
        {success && (
          <p className="mt-4 text-center text-green-600">{success}</p>
        )}{" "}
        {/* Display error message */}
        {mode === "forget-password" && (
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

function FormInputs({ mode }) {
  const { pending } = useFormStatus();

  return (
    <>
      {mode === "forget-password" ? (
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            disabled={pending}
            type="email"
            id="email"
            name="email"
            className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pending ? "cursor-not-allowed" : ""}`}
            placeholder="Enter your email"
            required
          />
        </div>
      ) : (
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New password
          </label>
          <input
            disabled={pending}
            type="newPassword"
            id="newPassword"
            required
            name="newPassword"
            minLength={6}
            className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pending ? "cursor-not-allowed" : ""}`}
            placeholder="Enter New Password"
          />
        </div>
      )}
      <button
        disabled={pending}
        type="submit"
        className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none ${pending ? "cursor-not-allowed" : ""}`}
      >
        {pending ? "Resetting..." : "Reset Password"}
      </button>
    </>
  );
}
