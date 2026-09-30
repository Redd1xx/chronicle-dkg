import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("orynth-75d4b13169e24648a3e3e756ba8d6f24", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
