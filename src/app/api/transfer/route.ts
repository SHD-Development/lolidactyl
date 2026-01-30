import { auth } from "@/auth";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, d_id } = session.user as any;
    const userId = d_id || id;

    const { to, coins } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    if (!to) {
      return NextResponse.json(
        { error: "Missing recipient Discord ID" },
        { status: 400 },
      );
    }

    if (userId === to) {
      return NextResponse.json(
        { status: "error", errors: ["Same user transfer is not allowed"] },
        { status: 400 },
      );
    }

    if (!coins || typeof coins !== "number" || coins <= 0) {
      return NextResponse.json(
        { error: "Invalid transfer amount" },
        { status: 400 },
      );
    }

    const apiKey = process.env.BACKEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/api/transfer";

    const response = await axios.post(
      apiUrl.toString(),
      {
        from: userId,
        to: to,
        coins: coins,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Transfer error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);
      if (error.response) {
        return NextResponse.json(error.response.data, {
          status: error.response.status,
        });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
