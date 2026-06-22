import { NextResponse } from "next/server";
import { model } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are an agricultural expert.

Location: ${body.location}
Soil Type: ${body.soilType}
Farm Size: ${body.farmSize}
Water Availability: ${body.waterAvailability}
Budget: ${body.budget}
Risk Preference: ${body.riskPreference}

Recommend:

1. Best crop
2. Two alternative crops
3. Expected yield
4. Estimated profit
5. Risk level
6. Water requirement

Return ONLY JSON.

{
  "topCrop":"",
  "confidence":0,
  "yield":"",
  "profit":"",
  "risk":"",
  "water":"",
  "alternatives":[
    {
      "crop":"",
      "confidence":0
    }
  ]
}
`;

    const result = await model.generateContent(prompt);

const cleanedResponse = result.response
  .text()
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return NextResponse.json({
  response: JSON.parse(cleanedResponse),
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}

