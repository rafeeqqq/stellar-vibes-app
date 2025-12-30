import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const zodiacSigns = [
  { id: 'aries', name: 'Aries', element: 'Fire', rulingPlanet: 'Mars' },
  { id: 'taurus', name: 'Taurus', element: 'Earth', rulingPlanet: 'Venus' },
  { id: 'gemini', name: 'Gemini', element: 'Air', rulingPlanet: 'Mercury' },
  { id: 'cancer', name: 'Cancer', element: 'Water', rulingPlanet: 'Moon' },
  { id: 'leo', name: 'Leo', element: 'Fire', rulingPlanet: 'Sun' },
  { id: 'virgo', name: 'Virgo', element: 'Earth', rulingPlanet: 'Mercury' },
  { id: 'libra', name: 'Libra', element: 'Air', rulingPlanet: 'Venus' },
  { id: 'scorpio', name: 'Scorpio', element: 'Water', rulingPlanet: 'Mars' },
  { id: 'sagittarius', name: 'Sagittarius', element: 'Fire', rulingPlanet: 'Jupiter' },
  { id: 'capricorn', name: 'Capricorn', element: 'Earth', rulingPlanet: 'Saturn' },
  { id: 'aquarius', name: 'Aquarius', element: 'Air', rulingPlanet: 'Saturn' },
  { id: 'pisces', name: 'Pisces', element: 'Water', rulingPlanet: 'Jupiter' },
];

function getDateString(offset: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
}

function formatDateForPrompt(offset: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
}

async function generateHoroscopeForSign(
  signId: string, 
  signName: string, 
  element: string, 
  rulingPlanet: string,
  dateOffset: number,
  LOVABLE_API_KEY: string
): Promise<any> {
  const dateStr = formatDateForPrompt(dateOffset);
  
  const systemPrompt = `You are an expert Vedic astrologer creating personalized daily horoscope readings. 
Generate authentic, insightful horoscope content that feels personal and meaningful.
Always respond with valid JSON only, no markdown or extra text.`;

  const userPrompt = `Generate a complete daily horoscope for ${signName} (${element} sign, ruled by ${rulingPlanet}) for ${dateStr}.

Return a JSON object with these exact fields:
{
  "generalReading": "A 2-3 sentence personalized reading about the day ahead (50-80 words)",
  "loveText": "A specific love/relationship insight (30-50 words)",
  "careerText": "A specific career/work insight (30-50 words)", 
  "moneyText": "A specific financial/money insight (30-50 words)",
  "healthText": "A specific health/wellness insight (30-50 words)",
  "travelText": "A specific travel/movement insight (30-50 words)",
  "luckyTip": "A SHORT lucky tip (5-8 words ONLY). Examples: 'Wear green today', 'Start day with warm water', 'Feed a cow for blessings', 'Keep tulsi leaf in wallet', 'Apply tilak before leaving home', 'Donate rice to the needy', 'Light a diya in evening'",
  "dos": ["3 things to do today"],
  "donts": ["3 things to avoid today"],
  "remedy": "A simple Vedic remedy for the day",
  "mantra": "A relevant Sanskrit mantra with translation"
}

IMPORTANT for luckyTip: Must be 5-8 words ONLY. Simple, actionable, relatable to Indian audience. Focus on: wearing lucky colors, morning rituals, small donations, temple visits, eating certain foods, simple pujas. No long sentences.`;

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
    const errorText = await response.text();
    console.error(`AI gateway error for ${signName}:`, response.status, errorText);
    throw new Error(`Failed to generate horoscope for ${signName}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error(`No content in AI response for ${signName}`);
  }

  // Parse the JSON from the response
  const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleanContent);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body = await req.json();
    const { signId, signName, element, rulingPlanet, batchGenerate, dayOffset } = body;

    // Handle batch generation (for cron job)
    if (batchGenerate) {
      console.log("Starting batch horoscope generation...");
      
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Supabase credentials not configured");
      }

      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const offsets = [-1, 0, 1]; // yesterday, today, tomorrow
      let generated = 0;
      let errors = 0;

      for (const offset of offsets) {
        const horoscopeDate = getDateString(offset);
        
        for (const sign of zodiacSigns) {
          try {
            // Check if already exists
            const { data: existing } = await supabase
              .from('horoscopes')
              .select('id')
              .eq('sign_id', sign.id)
              .eq('horoscope_date', horoscopeDate)
              .single();

            if (existing) {
              console.log(`Horoscope already exists for ${sign.name} on ${horoscopeDate}`);
              continue;
            }

            console.log(`Generating horoscope for ${sign.name} on ${horoscopeDate}...`);
            
            const horoscopeData = await generateHoroscopeForSign(
              sign.id,
              sign.name,
              sign.element,
              sign.rulingPlanet,
              offset,
              LOVABLE_API_KEY
            );

            // Store in database
            const { error: insertError } = await supabase
              .from('horoscopes')
              .upsert({
                sign_id: sign.id,
                horoscope_date: horoscopeDate,
                general_reading: horoscopeData.generalReading,
                love_text: horoscopeData.loveText,
                career_text: horoscopeData.careerText,
                money_text: horoscopeData.moneyText,
                health_text: horoscopeData.healthText,
                travel_text: horoscopeData.travelText,
                daily_affirmation: horoscopeData.luckyTip,
                dos: horoscopeData.dos,
                donts: horoscopeData.donts,
                remedy: horoscopeData.remedy,
                mantra: horoscopeData.mantra,
              }, {
                onConflict: 'sign_id,horoscope_date'
              });

            if (insertError) {
              console.error(`Failed to store horoscope for ${sign.name}:`, insertError);
              errors++;
            } else {
              generated++;
              console.log(`Successfully stored horoscope for ${sign.name} on ${horoscopeDate}`);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));

          } catch (signError) {
            console.error(`Error generating horoscope for ${sign.name}:`, signError);
            errors++;
          }
        }
      }

      console.log(`Batch generation complete. Generated: ${generated}, Errors: ${errors}`);
      
      return new Response(JSON.stringify({ 
        success: true,
        message: `Batch generation complete. Generated: ${generated}, Errors: ${errors}`,
        generated,
        errors
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle single sign generation (original behavior)
    if (!signId || !signName) {
      throw new Error("signId and signName are required");
    }

    const horoscopeData = await generateHoroscopeForSign(
      signId,
      signName,
      element || 'Fire',
      rulingPlanet || 'Sun',
      dayOffset || 0,
      LOVABLE_API_KEY
    );

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
