import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = session.user;
    const { code } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json(
        { error: "Missing coupon code" },
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
    apiUrl.pathname = "/coupons/redeem";

    const response = await axios.post(
      apiUrl.toString(),
      {
        id: id,
        code: code,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error redeeming coupon:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { error: "Unknown error" };

      return NextResponse.json(data, { status });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
