import { NextResponse } from "next/server";
import { model } from "@/lib/ai/gemini";
import { retrieveRelevantDocuments } from "@/lib/rag/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const query = `
    ${body.location}
    ${body.soilType}
    ${body.waterAvailability}
    ${body.riskPreference}
    `;

    const retrievedDocs =
      await retrieveRelevantDocuments(query);

    const context =
      retrievedDocs
        .map((doc) => doc.content)
        .join("\n\n");

    console.log(
      "Retrieved Docs:",
      retrievedDocs
    );
    // );

    const prompt = `
You are an agricultural expert.

Use the agricultural knowledge below
while generating recommendations.

AGRICULTURAL KNOWLEDGE:

${context}

Farmer Details:

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
7. Short explanation

Return ONLY JSON.

{
  "topCrop":"",
  "confidence":0,
  "yield":"",
  "profit":"",
  "risk":"",
  "water":"",
  "reason":"",
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

const parsedResponse =
  JSON.parse(cleanedResponse);

return NextResponse.json({
  response: parsedResponse,

  sources:
    retrievedDocs.map(
      (doc) => doc.source
    ),
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}

