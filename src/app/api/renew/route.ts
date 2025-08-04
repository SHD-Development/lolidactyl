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

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "";
    const userInfoUrl = new URL(process.env.BACKEND_API_URL as string);
    userInfoUrl.pathname = "/userinfo";
    userInfoUrl.searchParams.append("id", session.user.id);
    userInfoUrl.searchParams.append("name", session.user.name || "");
    userInfoUrl.searchParams.append("email", session.user.email || "");
    userInfoUrl.searchParams.append("ip", ip);

    const userInfoResponse = await axios.get(userInfoUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const userInfo = userInfoResponse.data;
    if (!userInfo.servers || !Array.isArray(userInfo.servers)) {
      return NextResponse.json(
        { error: "Unable to fetch server information" },
        { status: 500 }
      );
    }

    const serverToRenew = userInfo.servers.find(
      (server: any) => server.id === serverId
    );
    if (!serverToRenew) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    const expirationDate = new Date(serverToRenew.expiresAt);
    const currentDate = new Date();
    const daysUntilExpiry = Math.floor(
      (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry >= 30) {
      return NextResponse.json(
        { error: "Server can only be renewed within 30 days of expiration" },
        { status: 400 }
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
