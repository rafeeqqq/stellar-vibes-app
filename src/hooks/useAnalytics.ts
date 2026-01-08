import { useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = (): string => {
  const key = 'analytics_session_id';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

interface EventData {
  [key: string]: string | number | boolean | null | undefined;
}

export function useAnalytics() {
  const sessionId = useRef(getSessionId());
  const pageLoadTracked = useRef(false);

  const trackEvent = useCallback(async (eventName: string, eventData: EventData = {}) => {
    try {
      await supabase.from('analytics_events').insert({
        event_name: eventName,
        event_data: eventData,
        session_id: sessionId.current,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, []);

  // Track page view on mount
  useEffect(() => {
    if (!pageLoadTracked.current) {
      pageLoadTracked.current = true;
      trackEvent('page_view', {
        path: window.location.pathname,
        referrer: document.referrer || null,
      });
    }
  }, [trackEvent]);

  const trackSignSelected = useCallback((signId: string) => {
    trackEvent('sign_selected', { sign_id: signId });
  }, [trackEvent]);

  const trackDayChanged = useCallback((day: string) => {
    trackEvent('day_changed', { day });
  }, [trackEvent]);

  const trackCtaClicked = useCallback((ctaName: string) => {
    trackEvent('cta_clicked', { cta_name: ctaName });
  }, [trackEvent]);

  const trackHoroscopeLoaded = useCallback((signId: string, isAIPowered: boolean) => {
    trackEvent('horoscope_loaded', { sign_id: signId, is_ai_powered: isAIPowered });
  }, [trackEvent]);

  return {
    trackEvent,
    trackSignSelected,
    trackDayChanged,
    trackCtaClicked,
    trackHoroscopeLoaded,
  };
}
