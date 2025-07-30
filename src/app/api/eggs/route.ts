import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.BACKEND_API_KEY;
  const apiUrl = new URL(process.env.BACKEND_API_URL as string);
  apiUrl.pathname = "/eggslist";
  try {
    const response = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching eggs list:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch eggs list" },
      { status: 500 }
    );
  }
}
