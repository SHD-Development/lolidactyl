import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = session.user;

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const apiKey = process.env.BACKEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/resetpassword";
    apiUrl.searchParams.append("id", id);
    apiUrl.searchParams.append("email", session.user.email as string);
    apiUrl.searchParams.append("name", session.user.name as string);
    const response = await axios.patch(
      apiUrl.toString(),
      {},
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error resetting password:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return NextResponse.json(
        { error: `External API error: ${message}` },
        { status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
