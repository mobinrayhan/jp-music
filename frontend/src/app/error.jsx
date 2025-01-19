"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Oops! Something Went Wrong
        </h2>
        <p className="mb-6 text-gray-700">
          We encountered an unexpected issue. Please try again or contact
          support.
        </p>
        <pre className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          {error.message}
        </pre>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition duration-300 hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
