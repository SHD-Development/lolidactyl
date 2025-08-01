import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { NextResponse } from "next/server";
import axios from "axios";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : null,
        };
      },
    }),
  ],

  pages: {
    error: "/auth/error",
  },

  callbacks: {
    authorized: async ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return true;
    },

    async session({ session }) {
      if (session.user.image == null || session.user.image == undefined)
        return session;
      const url = new URL(session.user.image);
      const userId = url.pathname.split("/")[2];
      session.user.id = userId;
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        const ip =
          headersList.get("x-forwarded-for") ||
          headersList.get("x-real-ip") ||
          "";
        const apiKey = process.env.BACKEND_API_KEY;
        const apiUrl = new URL(process.env.BACKEND_API_URL as string);
        apiUrl.pathname = "/ipcheck";
        apiUrl.searchParams.append("id", profile?.id as string);
        apiUrl.searchParams.append("ip", ip);
        const response = await axios.get(apiUrl.toString(), {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 403 || error.response?.status === 409)
        ) {
          throw new Error("AccessDenied");
        }
      }

      return true;
    },
  },
});
