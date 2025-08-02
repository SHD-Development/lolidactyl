import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { serverId } = body;

    if (!serverId) {
      return NextResponse.json(
        { error: "Server ID is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BACKEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/servers/renew";
    const response = await axios.post(
      apiUrl.toString(),
      {
        id: session.user.id,
        serverId: serverId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Renew server error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data;
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
