"use server";

export async function submitContactInfo(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const consent = formData.get("consent");

  console.log({
    name,
    email,
    phone,
    subject,
    message,
    consent,
  });
}
