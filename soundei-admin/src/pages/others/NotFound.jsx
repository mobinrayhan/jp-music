import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4 text-gray-800">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-extrabold text-red-600 md:text-8xl">
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold md:text-2xl">
          Page Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Sorry, the page you are looking for does not exist in the admin panel.
          Check the URL or navigate back to the dashboard.
        </p>
        <Link
          to="/dashboard/overview"
          className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
