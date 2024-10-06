const CookiePolicy = () => {
  return (
    <div className="custom-container mt-6 bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">Cookie Policy</h1>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            1. What Are Cookies?
          </h2>
          <p className="leading-relaxed text-gray-600">
            Cookies are small text files that are stored on your device when you
            visit a website. They help us remember your preferences and track
            your interactions with our site. Cookies enhance your browsing
            experience by enabling features like saving your login information
            and keeping track of your site preferences.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            2. Types of Cookies We Use
          </h2>
          <p className="leading-relaxed text-gray-600">
            We use different types of cookies for various purposes. These
            include:
          </p>
          <ul className="mt-3 list-inside list-disc text-gray-600">
            <li>
              <span className="font-semibold">Essential Cookies:</span> These
              cookies are necessary for the website to function and cannot be
              disabled. They are usually set in response to actions such as
              logging in or filling out forms.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Performance Cookies:</span>{" "}
              Performance cookies collect information on how you use the site,
              such as which pages you visit the most. These cookies help us
              improve the website&apos;s performance.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Functional Cookies:</span>{" "}
              Functional cookies enable the website to provide enhanced
              functionality and personalization, such as remembering your
              preferences and past actions.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Targeting Cookies:</span>{" "}
              Targeting cookies are used to deliver relevant advertisements to
              you based on your browsing behavior. These cookies also help us
              measure the effectiveness of our advertising campaigns.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            3. How You Can Control Cookies
          </h2>
          <p className="leading-relaxed text-gray-600">
            You have the right to accept or reject cookies. Most browsers allow
            you to manage cookie settings. You can choose to block all cookies
            or delete existing cookies through your browser settings. However,
            please note that disabling cookies may limit the functionality of
            our website.
          </p>
          <p className="mt-2 leading-relaxed text-gray-600">
            To learn how to control cookies, refer to the help section of your
            browser or visit the following resources:
          </p>
          <ul className="mt-3 list-inside list-disc text-gray-600">
            <li>
              <a
                href="https://www.allaboutcookies.org"
                className="text-blue-600 hover:underline"
              >
                All About Cookies
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutcookies.org"
                className="text-blue-600 hover:underline"
              >
                About Cookies
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            4. Third-Party Cookies
          </h2>
          <p className="leading-relaxed text-gray-600">
            We may use third-party services, such as analytics or advertising
            partners, that use their own cookies to track and store information
            about your interactions with our website. These cookies are
            controlled by the third-party services, and we recommend you review
            their privacy policies for more details on how they handle cookies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            5. Changes to This Cookie Policy
          </h2>
          <p className="leading-relaxed text-gray-600">
            We may update this Cookie Policy from time to time. Any changes will
            be reflected on this page. We encourage you to review this page
            periodically for the latest information on our cookie practices.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            6. Contact Us
          </h2>
          <p className="leading-relaxed text-gray-600">
            If you have any questions about our Cookie Policy, please contact us
            at{" "}
            <a
              href="mailto:cookies@soundei.com"
              className="text-blue-600 hover:underline"
            >
              cookies@soundei.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
