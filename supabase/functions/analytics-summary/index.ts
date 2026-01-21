import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Support both query params and body
    const url = new URL(req.url);
    let days = parseInt(url.searchParams.get('days') || '7');
    
    // Check body for days if not in query params
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        if (body.days !== undefined) days = parseInt(body.days);
      } catch {}
    }
    
    // Calculate date range based on days parameter
    // days=0 means today only, days=-1 means lifetime (all data)
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let startDate: Date | null = null;
    let endDate: Date = now;
    let isLifetime = false;
    
    if (days === 0) {
      // Today only
      startDate = todayStart;
    } else if (days < 0) {
      // Lifetime - no date filter
      isLifetime = true;
    } else {
      // Last N days
      startDate = new Date(todayStart);
      startDate.setDate(startDate.getDate() - days);
    }

    // Build query - with or without date filter
    // For lifetime, we need to paginate to get ALL events (Supabase default limit is 1000)
    let allEvents: any[] = [];
    const pageSize = 1000;
    let page = 0;
    let hasMore = true;
    
    while (hasMore) {
      let query = supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);
      
      // Only add date filter if not lifetime
      if (!isLifetime && startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      const { data: pageEvents, error: pageError } = await query;
      
      if (pageError) {
        console.error('Error fetching analytics page:', pageError);
        throw pageError;
      }
      
      if (pageEvents && pageEvents.length > 0) {
        allEvents = allEvents.concat(pageEvents);
        hasMore = pageEvents.length === pageSize;
        page++;
      } else {
        hasMore = false;
      }
      
      // Safety limit: max 100 pages (100,000 events)
      if (page >= 100) {
        console.log('Reached max pagination limit');
        hasMore = false;
      }
    }
    
    const events = allEvents;

    // Calculate metrics
    const eventCounts: Record<string, number> = {};
    const signCounts: Record<string, number> = {};
    const uniqueSessions = new Set<string>();
    let ctaClicks = 0;
    let talkToAstrologerClicks = 0;

    // Track session times for avg session calculation
    const sessionTimes: Record<string, { first: number; last: number }> = {};

    events?.forEach((event) => {
      // Count events by type
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
      
      // Track unique sessions and session times
      if (event.session_id) {
        uniqueSessions.add(event.session_id);
        
        const eventTime = new Date(event.created_at).getTime();
        if (!sessionTimes[event.session_id]) {
          sessionTimes[event.session_id] = { first: eventTime, last: eventTime };
        } else {
          sessionTimes[event.session_id].first = Math.min(sessionTimes[event.session_id].first, eventTime);
          sessionTimes[event.session_id].last = Math.max(sessionTimes[event.session_id].last, eventTime);
        }
      }

      // Count signs from horoscope views (more meaningful than just sign_selected)
      if (event.event_name === 'horoscope_loaded' && event.event_data?.sign_id) {
        const signId = event.event_data.sign_id as string;
        signCounts[signId] = (signCounts[signId] || 0) + 1;
      }

      // Count CTA clicks
      if (event.event_name === 'cta_clicked') {
        ctaClicks++;
        // Count Talk to Astrologer specifically
        if (event.event_data?.cta_name === 'talk_to_astrologer') {
          talkToAstrologerClicks++;
        }
      }
    });

    // Calculate average session time
    const sessionDurations: number[] = [];
    Object.values(sessionTimes).forEach(({ first, last }) => {
      const duration = last - first;
      // Only count sessions with at least some duration (more than 1 second)
      if (duration >= 1000) {
        sessionDurations.push(duration);
      }
    });
    
    const avgSessionTimeMs = sessionDurations.length > 0 
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length 
      : 0;
    
    // Format avg session time as "Xm Ys" or "Xs"
    const avgSessionSeconds = Math.round(avgSessionTimeMs / 1000);
    let avgSessionTimeFormatted = '0s';
    if (avgSessionSeconds >= 60) {
      const mins = Math.floor(avgSessionSeconds / 60);
      const secs = avgSessionSeconds % 60;
      avgSessionTimeFormatted = secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    } else if (avgSessionSeconds > 0) {
      avgSessionTimeFormatted = `${avgSessionSeconds}s`;
    }

    const totalPageViews = eventCounts['page_view'] || 0;
    const conversionRate = totalPageViews > 0 
      ? ((talkToAstrologerClicks / totalPageViews) * 100).toFixed(2) 
      : '0.00';

    // Sort signs by popularity
    const popularSigns = Object.entries(signCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([sign, count]) => ({ sign, count }));

    const summary = {
      period: {
        start: isLifetime ? null : startDate?.toISOString(),
        end: endDate.toISOString(),
        days,
        label: days === 0 ? 'Today' : isLifetime ? 'Lifetime' : `Last ${days} Days`,
      },
      totals: {
        events: events?.length || 0,
        unique_sessions: uniqueSessions.size,
        page_views: totalPageViews,
        cta_clicks: ctaClicks,
        talk_to_astrologer_clicks: talkToAstrologerClicks,
        avg_session_time: avgSessionTimeFormatted,
        avg_session_time_seconds: avgSessionSeconds,
        conversion_rate: `${conversionRate}%`,
      },
      event_breakdown: eventCounts,
      popular_signs: popularSigns.slice(0, 12),
      recent_events: events?.slice(0, 20).map(e => ({
        event: e.event_name,
        data: e.event_data,
        time: e.created_at,
      })),
    };

    console.log('Analytics summary generated:', {
      days,
      totalEvents: events?.length,
      uniqueSessions: uniqueSessions.size,
      talkToAstrologerClicks,
      avgSessionTime: avgSessionTimeFormatted,
      popularSignsCount: popularSigns.length,
    });

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate analytics summary' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
