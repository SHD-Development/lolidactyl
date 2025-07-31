import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.BACKEND_API_KEY;
    const apiUrl = new URL(process.env.BACKEND_API_URL as string);
    apiUrl.pathname = "/status";

    const response = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      status: response.data.status,
    });
  } catch (error) {
    console.error("Error fetching backend status:", error);

    return NextResponse.json({
      success: false,
      status: false,
      error: "Failed to fetch backend status",
    });
  }
}
