import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: "Text and target language are required" },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.TRANSLATION_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Translation API key not configured" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const moderatedText = await client.moderations.create({
      input: text,
    });

    console.log(moderatedText);

    const { flagged, categories } = moderatedText.results[0];

    if (flagged) {
      const keys: string[] = Object.keys(categories);
      const flaggedCategories = keys.filter(
        (key: string) => categories[key as keyof typeof categories]
      );
      throw new Error(
        `Your input has been flagged for the following reasons: ${flaggedCategories.join(
          ", "
        )}`
      );
    }

    // Example API call - replace with your actual translation service
    // This is a mock implementation - you'll need to replace with your chosen API
    const response = await client.responses.create({
      model: "gpt-4.1",
      instructions:
        "You are fluent in English, Spanish, French and Japanese. You will be given a block of text to translate from English into either French, Spanish or Japanese. Translate the text as accurately as you can.",
      input: `Translate the text in between the ### characters into ${targetLanguage}:
      ###
      ${text}
      ###`,
    });

    console.log(response);

    if (response.status !== "completed") {
      throw new Error(`Translation API error: ${response.status}`);
    }

    return NextResponse.json({
      translation: response.output_text || "Translation completed",
      original: text,
      targetLanguage,
    });
  } catch (error) {
    console.error("Server Translation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Translation failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
