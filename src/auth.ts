import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import axios from "axios";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
        return {
            user: {
                ...user,
            },
            session
        };
    })
  ],
  socialProviders: {
    discord: {
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
      mapProfileToUser: async (profile) => {
        try {
            const drivers = await headers();
            const ip = drivers.get("x-forwarded-for") || drivers.get("x-real-ip") || "";
            
            const apiKey = process.env.BACKEND_API_KEY;
            const apiUrl = new URL(process.env.BACKEND_API_URL as string);
            apiUrl.pathname = "/ipcheck";
            apiUrl.searchParams.append("id", profile.id);
            apiUrl.searchParams.append("ip", ip as string);
            
            await axios.get(apiUrl.toString(), {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
             if (axios.isAxiosError(error) && (error.response?.status === 403 || error.response?.status === 409)) {
                throw new Error("AccessDenied");
            }
        }

        return {
          id: profile.id, 
          name: profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=1024`
            : null,
          emailVerified: true, 
          d_id: profile.id,
        };
      },
    },
  },
  user: {
      additionalFields: {
        d_id: {
            type: "string",
            required: false,
            input: false, 
        }
      } 
  },
  session: {
     cookieCache: {
        enabled: true,
        maxAge: 5 * 60 
     }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
             data: user
          }
        },
      },
    },
  },
});
