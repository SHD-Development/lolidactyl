import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { NextResponse } from "next/server";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
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
  },
});
