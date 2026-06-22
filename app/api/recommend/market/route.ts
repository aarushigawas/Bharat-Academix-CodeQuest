import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    

    const crop = searchParams.get("crop");

    const url =
      `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24` +
      `?api-key=${process.env.DATA_GOV_API_KEY}` +
      `&format=json` +
      `&limit=20` +
      (crop ? `&filters[Commodity]=${crop}` : "");

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data.records || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}

