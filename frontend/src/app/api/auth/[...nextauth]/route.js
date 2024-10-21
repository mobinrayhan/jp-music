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
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email", // Ensure the 'email' scope is included
          redirect_uri:
            process.env.NEXTAUTH_URL + "/api/auth/callback/facebook",
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
    async jwt({ token, user, account }) {
      if (user) {
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
              token.jwt = authUser.token;
              token.id = authUser.userId;
              token.isActive = authUser.isActive;
            }
          } catch (error) {
            console.error("Error fetching user from providers:", error);
          }
        } else {
          token.jwt = user.token;
          token.id = user.userId;
          token.isActive = user.isActive;
        }
      }

      try {
        const activeStatus = await fetchWithApiKey(
          `/auth/check-active-status/${token.id}`,
          {
            cache: "no-store",
          },
        );

        if (activeStatus?.isActive !== undefined) {
          token.isActive = activeStatus.isActive;
        }
      } catch (error) {
        console.error("Error checking active status:", error);
        token.isActive = false;
      }

      return token;
    },

    // Handle session updates
    async session({ session, token }) {
      session.user.id = token.id;
      session.jwt = token.jwt;
      session.user.isActive = token.isActive;

      if (!token.isActive) {
        return null;
      }

      return session;
    },
  },
};

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
