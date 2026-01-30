import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/auth";
import { headers } from "next/headers";


export async function GET(request: Request) {
  const apiKey = process.env.BACKEND_API_KEY;
  const apiUrl = new URL(process.env.BACKEND_API_URL as string);
  apiUrl.pathname = "/ipcheck";

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user as any;
    const userId = user?.d_id || user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }
    apiUrl.searchParams.append("id", userId);
    apiUrl.searchParams.append(
      "ip",
      request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        ""
    );

    const response = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("IP check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
