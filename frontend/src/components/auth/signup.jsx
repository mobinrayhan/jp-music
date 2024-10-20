"use client";
import { signup } from "@/actions/authAction";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa6";

const Signup = () => {
  const [{ success, error }, action] = useFormState(signup, {
    success: null,
    error: null,
  });

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-4" action={action}>
          <FormInputs error={error} success={success} />
        </form>

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

function FormInputs({ success, error }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          disabled={pending}
          type="text"
          id="name"
          name="name"
          className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pending ? "cursor-not-allowed" : ""}`}
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
          disabled={pending}
          type="email"
          id="email"
          name="email"
          className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pending ? "cursor-not-allowed" : ""}`}
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
          disabled={pending}
          type="password"
          id="password"
          name="password"
          className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${pending ? "cursor-not-allowed" : ""}`}
          placeholder="Create a password"
        />
      </div>
      <button
        disabled={pending}
        type="submit"
        className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none ${pending ? "cursor-not-allowed" : ""}`}
      >
        {pending ? "Signing Up..." : "Sign Up"}
      </button>
      {/* ERROR & SUCCESS STATE */}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}{" "}
      {success && <p className="mt-4 text-center text-green-600">{success}</p>}{" "}
      <p className="mt-4 text-right text-gray-600">
        <Link
          href="/forget-password"
          className={`text-blue-600 hover:underline ${pending && "cursor-not-allowed"}`}
          disabled={pending}
        >
          {" "}
          Forgotten password?
        </Link>
      </p>
      {/* PROVIDER BUTTON */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0 sm:space-x-4">
        <button
          onClick={() => {
            signIn("google");
          }}
          disabled={pending}
          className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${pending ? "cursor-not-allowed" : ""}`}
        >
          <FaGoogle className="mr-2" />
          Sign up with Google
        </button>
        <button
          onClick={() => {
            signIn("facebook");
          }}
          disabled={pending}
          className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${pending ? "cursor-not-allowed" : ""}`}
        >
          <FaFacebook className="mr-2" />
          Sign up with Facebook
        </button>

        {/* Display error message */}
      </div>
    </>
  );
}
