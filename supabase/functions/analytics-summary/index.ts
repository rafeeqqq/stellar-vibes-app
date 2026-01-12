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
        if (body.days) days = parseInt(body.days);
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
    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Only add date filter if not lifetime
    if (!isLifetime && startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    const { data: events, error } = await query;

    if (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }

    // Calculate metrics
    const eventCounts: Record<string, number> = {};
    const signCounts: Record<string, number> = {};
    const uniqueSessions = new Set<string>();
    let ctaClicks = 0;

    events?.forEach((event) => {
      // Count events by type
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
      
      // Track unique sessions
      if (event.session_id) {
        uniqueSessions.add(event.session_id);
      }

      // Count signs from horoscope views (more meaningful than just sign_selected)
      if (event.event_name === 'horoscope_loaded' && event.event_data?.sign_id) {
        const signId = event.event_data.sign_id as string;
        signCounts[signId] = (signCounts[signId] || 0) + 1;
      }

      // Count CTA clicks
      if (event.event_name === 'cta_clicked') {
        ctaClicks++;
      }
    });

    const totalPageViews = eventCounts['page_view'] || 0;
    const conversionRate = totalPageViews > 0 
      ? ((ctaClicks / totalPageViews) * 100).toFixed(2) 
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
        conversion_rate: `${conversionRate}%`,
      },
      event_breakdown: eventCounts,
      popular_signs: popularSigns.slice(0, 5),
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
