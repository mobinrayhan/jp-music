"use server";

import { fetchWithApiKey } from "@/utils/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
