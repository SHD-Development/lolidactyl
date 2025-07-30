import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.redirect(
    new URL(process.env.NEXT_PUBLIC_PANEL_URL as string)
  );
}
