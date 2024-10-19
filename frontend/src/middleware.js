import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const reference = req.nextUrl.pathname;

  console.log(token);
  if (!token || !token.isActive) {
    return NextResponse.redirect(new URL(`/login?ref=${reference}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-library/:path*", "/account/:path*"],
};
