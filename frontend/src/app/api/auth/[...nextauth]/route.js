import { fetchWithApiKey } from "@/utils/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // FacebookProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const loginData = {
          email: credentials.email.trim(),
          password: credentials.password,
        };

        try {
          const user = await fetchWithApiKey("/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
          });
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.jwt = user.token;
        token.iat = Math.floor(Date.now() / 1000); // Set issued at
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.jwt = token.jwt;
      return session;
    },
  },
};

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
