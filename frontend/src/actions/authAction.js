"use server";

import { validLoginFields } from "@/lib/valid-login";
import { validSighupFields } from "@/lib/valid-signup";
import { fetchWithApiKey } from "@/utils/api";
import { signIn } from "next-auth/react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signup(_, formData) {
  const username = formData.get("name").trim();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const signupData = { username, email, password, role: "user" };

  const errors = validSighupFields(formData);
  if (errors.length > 0) {
    return {
      success: null,
      error: errors[0],
    };
  }

  try {
    const updatedData = await fetchWithApiKey(`/auth/signup`, {
      method: "POST",
      body: JSON.stringify(signupData),
    });

    return {
      success:
        updatedData.message ||
        "User Created Successfully! Check Your Email To Active Account!",
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: error.message || "Something went wrong! Try Again Later!",
    };
  }
}

export async function login(_, formData) {
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  const errors = validLoginFields(formData);
  if (errors.length > 0) {
    return {
      success: null,
      error: errors[0],
    };
  }

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.ok) {
    return {
      success: "User logged in successfully!",
      error: null,
    };
  } else {
    return {
      success: null,
      error: "Invalid Credentials! Check Your Email And Password!",
    };
  }
}

export async function findAccount(_, formData) {
  const email = formData.get("email");

  if (!emailRegex.test(email.trim())) {
    return {
      error: "E-mail is not valid!",
      success: null,
    };
  }

  try {
    const result = await fetchWithApiKey(
      `/auth/forget-password?email=${email}`,
    );
    return {
      success: result.message || "Verification Mail Was Sent!",
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: error.message || "Something Went wrong!",
    };
  }
}

export async function forgetPassword(_, formData) {
  const userId = formData.get("userId");
  const newPassword = formData.get("newPassword");

  if (!newPassword) {
    return { error: "Password is required", success: null };
  } else if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters long.",
      success: null,
    };
  }

  try {
    const result = await fetchWithApiKey(`/auth/forget-password`, {
      method: "PATCH",
      body: JSON.stringify({ userId, newPassword }),
    });
    return {
      success: result.message || "Password Changed Successfully!",
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: error.message || "Something Went wrong!",
    };
  }
}
