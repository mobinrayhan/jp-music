export default function Login() {
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

        {/* Login Form */}
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
