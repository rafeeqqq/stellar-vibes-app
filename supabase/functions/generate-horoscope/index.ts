import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { signId, signName, element, rulingPlanet } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });

    const systemPrompt = `You are an expert Vedic astrologer creating personalized daily horoscope readings. 
Generate authentic, insightful horoscope content that feels personal and meaningful.
Always respond with valid JSON only, no markdown or extra text.`;

    const userPrompt = `Generate a complete daily horoscope for ${signName} (${element} sign, ruled by ${rulingPlanet}) for ${today}.

Return a JSON object with these exact fields:
{
  "generalReading": "A 2-3 sentence personalized reading about the day ahead (50-80 words)",
  "loveText": "A specific love/relationship insight (30-50 words)",
  "careerText": "A specific career/work insight (30-50 words)", 
  "moneyText": "A specific financial/money insight (30-50 words)",
  "healthText": "A specific health/wellness insight (30-50 words)",
  "travelText": "A specific travel/movement insight (30-50 words)",
  "dailyAffirmation": "A powerful affirmation for the day (15-25 words)",
  "dos": ["3 things to do today"],
  "donts": ["3 things to avoid today"],
  "remedy": "A simple Vedic remedy for the day",
  "mantra": "A relevant Sanskrit mantra with translation"
}

Make the content unique, spiritually meaningful, and specific to ${signName}'s characteristics.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate horoscope");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    let horoscopeData;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      horoscopeData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: horoscopeData,
      generatedAt: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Generate horoscope error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
