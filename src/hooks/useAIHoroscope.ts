import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ZodiacSign, HoroscopeData, getHoroscopeData } from '@/lib/horoscopeData';
import { useToast } from '@/hooks/use-toast';

function getDateString(offset: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
}

export function useAIHoroscope(sign: ZodiacSign, dayOffset: number = 0) {
  const [horoscope, setHoroscope] = useState<HoroscopeData>(() => 
    getHoroscopeData(sign.id, dayOffset)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAIPowered, setIsAIPowered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset to fallback data when sign or day changes
    const fallbackData = getHoroscopeData(sign.id, dayOffset);
    setHoroscope(fallbackData);
    setIsAIPowered(false);

    // Fetch from database for yesterday, today, tomorrow
    const fetchStoredHoroscope = async () => {
      setIsLoading(true);
      try {
        const horoscopeDate = getDateString(dayOffset);
        
        // Try to get from database first
        const { data: storedHoroscope, error } = await supabase
          .from('horoscopes')
          .select('*')
          .eq('sign_id', sign.id)
          .eq('horoscope_date', horoscopeDate)
          .single();

        if (storedHoroscope && !error) {
          // Use stored AI-generated horoscope
          const aiData: Partial<HoroscopeData> = {
            generalReading: storedHoroscope.general_reading || fallbackData.generalReading,
            loveText: storedHoroscope.love_text || fallbackData.loveText,
            careerText: storedHoroscope.career_text || fallbackData.careerText,
            moneyText: storedHoroscope.money_text || fallbackData.moneyText,
            healthText: storedHoroscope.health_text || fallbackData.healthText,
            travelText: storedHoroscope.travel_text || fallbackData.travelText,
            dailyAffirmation: storedHoroscope.daily_affirmation || fallbackData.dailyAffirmation,
            dos: storedHoroscope.dos || fallbackData.dos,
            donts: storedHoroscope.donts || fallbackData.donts,
            remedy: storedHoroscope.remedy || fallbackData.remedy,
            mantra: storedHoroscope.mantra || fallbackData.mantra,
          };

          setHoroscope(prev => ({ ...prev, ...aiData }));
          setIsAIPowered(true);
          return;
        }

        // If no stored data and it's today, try to generate on-demand
        if (dayOffset === 0) {
          const { data, error: genError } = await supabase.functions.invoke('generate-horoscope', {
            body: {
              signId: sign.id,
              signName: sign.name,
              element: sign.element,
              rulingPlanet: sign.rulingPlanet,
              dayOffset: 0,
            },
          });

          if (data?.success && data?.data) {
            const aiData = data.data;
            
            const mergedData: Partial<HoroscopeData> = {
              generalReading: aiData.generalReading || fallbackData.generalReading,
              loveText: aiData.loveText || fallbackData.loveText,
              careerText: aiData.careerText || fallbackData.careerText,
              moneyText: aiData.moneyText || fallbackData.moneyText,
              healthText: aiData.healthText || fallbackData.healthText,
              travelText: aiData.travelText || fallbackData.travelText,
              dailyAffirmation: aiData.dailyAffirmation || fallbackData.dailyAffirmation,
              dos: aiData.dos || fallbackData.dos,
              donts: aiData.donts || fallbackData.donts,
              remedy: aiData.remedy || fallbackData.remedy,
              mantra: aiData.mantra || fallbackData.mantra,
            };

            setHoroscope(prev => ({ ...prev, ...mergedData }));
            setIsAIPowered(true);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch horoscope:', error);
        
        if (error?.status === 429) {
          toast({
            title: "Rate limit reached",
            description: "Using local predictions. Try again later.",
            variant: "destructive",
          });
        }
        // Silently fall back to local data for other errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoredHoroscope();
  }, [sign.id, sign.name, sign.element, sign.rulingPlanet, dayOffset, toast]);

  return { horoscope, isLoading, isAIPowered };
}
