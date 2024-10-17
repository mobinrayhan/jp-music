import { fetchWithApiKey } from "@/utils/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email", // Ensure the 'email' scope is included
        },
      },
    }),

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
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // If user exists (after sign-in)
      if (user) {
        // If the user signed in using Google/Facebook
        if (
          account?.provider === "google" ||
          account?.provider === "facebook"
        ) {
          try {
            const authUser = await fetchWithApiKey("/auth/providers", {
              method: "POST",
              body: JSON.stringify({
                email: user.email,
                username: user.name,
                role: "user",
              }),
            });

            if (authUser?.token) {
              token.jwt = authUser.token; // Set JWT from backend response
              token.id = authUser.userId; // Set user ID
            }
          } catch (error) {
            console.error("Error fetching user from providers:", error);
          }
        } else {
          // In case of manual login (Credentials provider)
          token.jwt = user.token; // JWT from manual login response
          token.id = user.userId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Pass the token and user info to session
      session.user.id = token.id;
      session.jwt = token.jwt; // Attach JWT to session
      return session;
    },

    async signIn({ user }) {
      const { email, name } = user;

      try {
        const authUser = await fetchWithApiKey("/auth/providers", {
          method: "POST",
          body: JSON.stringify({ email, username: name, role: "user" }),
        });

        if (authUser) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
};

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
