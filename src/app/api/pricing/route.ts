import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.BACKEND_API_KEY;
  const apiUrl = new URL(process.env.BACKEND_API_URL as string);
  apiUrl.pathname = "/price";
  try {
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
    console.error("Error fetching pricing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}
