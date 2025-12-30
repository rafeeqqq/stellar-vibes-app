import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ZodiacSign, HoroscopeData, getHoroscopeData } from '@/lib/horoscopeData';
import { useToast } from '@/hooks/use-toast';

const CACHE_KEY_PREFIX = 'horoscope_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedHoroscope {
  data: Partial<HoroscopeData>;
  timestamp: number;
  date: string;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getCacheKey(signId: string): string {
  return `${CACHE_KEY_PREFIX}${signId}`;
}

function getFromCache(signId: string): Partial<HoroscopeData> | null {
  try {
    const cached = localStorage.getItem(getCacheKey(signId));
    if (!cached) return null;
    
    const parsed: CachedHoroscope = JSON.parse(cached);
    const today = getTodayString();
    
    // Check if cache is from today and not expired
    if (parsed.date === today && Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    }
    
    // Clear expired cache
    localStorage.removeItem(getCacheKey(signId));
    return null;
  } catch {
    return null;
  }
}

function saveToCache(signId: string, data: Partial<HoroscopeData>): void {
  try {
    const cached: CachedHoroscope = {
      data,
      timestamp: Date.now(),
      date: getTodayString(),
    };
    localStorage.setItem(getCacheKey(signId), JSON.stringify(cached));
  } catch (error) {
    console.error('Failed to cache horoscope:', error);
  }
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

    // Only fetch AI data for today
    if (dayOffset !== 0) return;

    // Check cache first
    const cachedData = getFromCache(sign.id);
    if (cachedData) {
      setHoroscope(prev => ({ ...prev, ...cachedData }));
      setIsAIPowered(true);
      return;
    }

    // Fetch fresh AI-generated horoscope
    const fetchAIHoroscope = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('generate-horoscope', {
          body: {
            signId: sign.id,
            signName: sign.name,
            element: sign.element,
            rulingPlanet: sign.rulingPlanet,
          },
        });

        if (error) {
          throw error;
        }

        if (data?.success && data?.data) {
          const aiData = data.data;
          
          // Merge AI data with fallback data
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

          saveToCache(sign.id, mergedData);
          setHoroscope(prev => ({ ...prev, ...mergedData }));
          setIsAIPowered(true);
        }
      } catch (error: any) {
        console.error('Failed to fetch AI horoscope:', error);
        
        // Show toast for rate limit errors
        if (error?.status === 429) {
          toast({
            title: "Rate limit reached",
            description: "Using cached predictions. Try again later.",
            variant: "destructive",
          });
        } else if (error?.status === 402) {
          toast({
            title: "AI credits exhausted",
            description: "Using local predictions.",
            variant: "destructive",
          });
        }
        // Silently fall back to local data for other errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchAIHoroscope();
  }, [sign.id, sign.name, sign.element, sign.rulingPlanet, dayOffset, toast]);

  return { horoscope, isLoading, isAIPowered };
}
