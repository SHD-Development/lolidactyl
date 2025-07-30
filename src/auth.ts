import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { NextResponse } from "next/server";

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
  },
});
