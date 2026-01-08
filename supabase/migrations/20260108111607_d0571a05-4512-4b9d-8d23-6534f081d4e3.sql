-- Create analytics events table for tracking user interactions
CREATE TABLE public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_analytics_events_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_session ON public.analytics_events(session_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (tracking is public, no auth required)
CREATE POLICY "Allow public event tracking" 
  ON public.analytics_events FOR INSERT 
  WITH CHECK (true);

-- Only allow reading via edge functions (service role)
CREATE POLICY "Service role can read analytics" 
  ON public.analytics_events FOR SELECT 
  USING (false);