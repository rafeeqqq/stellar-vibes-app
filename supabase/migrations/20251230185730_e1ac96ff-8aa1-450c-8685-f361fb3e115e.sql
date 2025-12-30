-- Create horoscopes table to store pre-generated daily horoscopes
CREATE TABLE public.horoscopes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sign_id TEXT NOT NULL,
  horoscope_date DATE NOT NULL,
  general_reading TEXT,
  love_text TEXT,
  career_text TEXT,
  money_text TEXT,
  health_text TEXT,
  travel_text TEXT,
  daily_affirmation TEXT,
  dos TEXT[],
  donts TEXT[],
  remedy TEXT,
  mantra TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(sign_id, horoscope_date)
);

-- Create index for faster lookups
CREATE INDEX idx_horoscopes_sign_date ON public.horoscopes(sign_id, horoscope_date);

-- Enable Row Level Security
ALTER TABLE public.horoscopes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read horoscopes (public data)
CREATE POLICY "Horoscopes are publicly readable"
ON public.horoscopes
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_horoscopes_updated_at
BEFORE UPDATE ON public.horoscopes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();