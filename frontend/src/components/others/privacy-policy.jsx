const PrivacyPolicy = () => {
  return (
    <div className="custom-container mt-6 bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          Privacy Policy
        </h1>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed text-gray-600">
            At Soundei, we collect various types of information to help us
            deliver and improve our services. This may include:
          </p>
          <ul className="mt-3 list-inside list-disc text-gray-600">
            <li>
              Personal details like your name, email address, and phone number
              when you sign up for an account.
            </li>
            <li>
              Technical data such as your IP address, browser type, and device
              information when you access our website.
            </li>
            <li>
              Usage data that tracks how you interact with our site, including
              pages visited, time spent, and links clicked.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            2. How We Use Your Information
          </h2>
          <p className="leading-relaxed text-gray-600">
            The information we collect is used to:
          </p>
          <ul className="mt-3 list-inside list-disc text-gray-600">
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Improve the user experience through personalization.</li>
            <li>
              Analyze how users interact with our site to enhance functionality.
            </li>
            <li>
              Communicate with you regarding updates, promotions, or security
              alerts.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="leading-relaxed text-gray-600">
            We use cookies and similar tracking technologies to enhance your
            browsing experience. Cookies help us remember your preferences,
            track usage patterns, and improve site functionality. By continuing
            to use our website, you consent to our use of cookies.
          </p>
          <p className="mt-2 leading-relaxed text-gray-600">
            You can control your cookie preferences through your browser
            settings. However, disabling cookies may limit some functionality on
            our site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            4. Sharing Your Information
          </h2>
          <p className="leading-relaxed text-gray-600">
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information with trusted
            partners for the following purposes:
          </p>
          <ul className="mt-3 list-inside list-disc text-gray-600">
            <li>
              Third-party service providers who assist in operating our website
              or conducting business activities, provided they agree to keep
              this information confidential.
            </li>
            <li>
              In response to legal requirements, court orders, or government
              regulations.
            </li>
            <li>
              To protect the rights, property, or safety of Soundei, our users,
              or others.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            5. Data Security
          </h2>
          <p className="leading-relaxed text-gray-600">
            We are committed to ensuring the security of your personal data. We
            implement industry-standard security measures, such as encryption
            and secure server environments, to protect your information from
            unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            6. Your Rights
          </h2>
          <p className="leading-relaxed text-gray-600">
            You have the right to access, correct, or delete your personal
            information. If you wish to update or remove your data, please
            contact us at{" "}
            <a
              href="mailto:privacy@soundei.com"
              className="text-blue-600 hover:underline"
            >
              privacy@soundei.com
            </a>
            . We will respond to your request as soon as possible, within a
            reasonable timeframe.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            7. Changes to This Policy
          </h2>
          <p className="leading-relaxed text-gray-600">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. You will be notified
            of any significant changes by email or through a notice on our
            website. Please review this page periodically for updates.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-gray-700">
            8. Contact Us
          </h2>
          <p className="leading-relaxed text-gray-600">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:privacy@soundei.com"
              className="text-blue-600 hover:underline"
            >
              privacy@soundei.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
