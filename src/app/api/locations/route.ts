import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.BACKEND_API_KEY;
  const apiUrl = new URL(process.env.BACKEND_API_URL as string);
  apiUrl.pathname = "/locationslist";
  try {
    const response = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching locations list:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch locations list" },
      { status: 500 }
    );
  }
}
