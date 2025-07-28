// src/app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { InputValidator } from "@/utils/validation";
import { ServerRateLimiter } from "@/utils/serverRateLimiter";

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Server-side rate limiting
    if (!ServerRateLimiter.checkLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const { text, targetLanguage } = await request.json();

    // Enhanced validation
    const textValidation = InputValidator.validateText(text);
    if (!textValidation.isValid) {
      return NextResponse.json(
        { error: textValidation.error },
        { status: 400 }
      );
    }

    if (!InputValidator.validateLanguage(targetLanguage)) {
      return NextResponse.json(
        { error: "Invalid target language" },
        { status: 400 }
      );
    }

    // Environment validation
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key not configured");
      return NextResponse.json(
        { error: "Translation service temporarily unavailable" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Enhanced content moderation
    const moderatedText = await client.moderations.create({
      input: text,
    });

    const { flagged, categories } = moderatedText.results[0];

    if (flagged) {
      const keys: string[] = Object.keys(categories);
      const flaggedCategories = keys.filter(
        (key: string) => categories[key as keyof typeof categories]
      );
      return NextResponse.json(
        {
          error: `Content flagged as inappropriate: ${flaggedCategories.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Translation with enhanced error handling
    const response = await client.responses.create({
      model: "gpt-4.1",
      instructions:
        "You are fluent in English, Spanish, French and Japanese. You will be given a block of text to translate from English into either French, Spanish or Japanese. If translating to Japanese, include a translation that is in both Japanese characters and in Romanji (Japanese using the English alphabet). For all translations, also provide a way of saying the translation phonetically. Translate the text as accurately as you can.",
      input: `Translate the text in between the ### characters into ${targetLanguage}:
      ###
      ${text}
      ###`,
    });

    if (response.status !== "completed") {
      throw new Error(`Translation API error: ${response.status}`);
    }

    // Log successful translation (for monitoring)
    console.log(
      `Translation completed for IP: ${ip}, Language: ${targetLanguage}, Length: ${text.length}`
    );

    return NextResponse.json({
      translation: response.output_text || "Translation completed",
      original: text,
      targetLanguage,
      remainingRequests: ServerRateLimiter.getRemaining(ip),
    });
  } catch (error) {
    console.error("Server Translation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Translation failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
