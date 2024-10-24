"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAction(formData) {
  const path = formData.get("path");
  const type = formData.get("type");

  revalidatePath(path, type || "page");
}
