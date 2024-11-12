"use client";

import { submitContactInfo } from "@/actions/contactAction";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUs() {
  const [state, action] = useFormState(submitContactInfo, {
    message: null,
  });

  return (
    <section className="custom-container">
      <form
        action={action}
        method="POST"
        className="grid grid-cols-1 gap-4 border p-4 md:m-10 md:grid-cols-2"
      >
        <FormInputs />
      </form>
    </section>
  );
}

function FormInputs() {
  const recaptchaRef = useRef(null);
  const { pending } = useFormStatus();
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token) {
    try {
      if (token) {
        await fetch("/google-captcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-lg font-semibold text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          disabled={pending}
          id="name"
          name="name"
          className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-lg font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          disabled={pending}
          id="email"
          name="email"
          className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Phone Number (Optional) */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="phone" className="text-lg font-semibold text-gray-700">
          Phone Number (Optional)
        </label>
        <input
          type="text"
          disabled={pending}
          id="phone"
          name="phone"
          className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="subject"
          className="text-lg font-semibold text-gray-700"
        >
          Subject
        </label>
        <select
          disabled={pending}
          id="subject"
          name="subject"
          className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
          <option value="collaboration">Collaboration</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col space-y-2 md:col-span-2">
        <label
          htmlFor="message"
          className="text-lg font-semibold text-gray-700"
        >
          Your Message
        </label>
        <textarea
          disabled={pending}
          id="message"
          name="message"
          rows="4"
          className="resize-none rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-center space-x-2 md:col-span-2">
        <input
          disabled={pending}
          type="checkbox"
          id="consent"
          name="consent"
          className="focus:ring-2 focus:ring-blue-500"
          required
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          I consent to my data being stored and used for communication.
        </label>
      </div>

      {/* Captcha */}
      {/* <div className="col-span-2 flex flex-col space-y-2">
          <label
            htmlFor="captcha"
            className="text-lg font-semibold text-gray-700"
          >
            Captcha
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div> */}

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />

      <input type="hidden" value={isVerified || ""} name="isVerified" />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isVerified || pending}
        className="col-start-1 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </>
  );
}
