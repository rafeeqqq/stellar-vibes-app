import { motion } from 'framer-motion';
import { BookOpen, ThumbsUp, ThumbsDown, Clock, Sparkles } from 'lucide-react';
import { ZodiacSign } from '@/lib/horoscopeData';

interface DailyReadingCardProps {
  sign: ZodiacSign;
  generalReading: string;
  dos: string[];
  donts: string[];
  shubhMuhurat: string;
  remedy: string;
  mantra: string;
}

export function DailyReadingCard({
  sign,
  generalReading,
  dos,
  donts,
  shubhMuhurat,
  remedy,
  mantra,
}: DailyReadingCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/90 backdrop-blur-sm border border-primary/10 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* General Reading */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-sans text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
            Today's Reading
          </h3>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
          {generalReading}
        </p>
      </div>

      {/* Two column grid for Do's & Don'ts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Do's */}
        <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700">Do's</span>
          </div>
          <ul className="space-y-1">
            {dos.map((item, index) => (
              <li key={index} className="text-[10px] sm:text-xs text-foreground/70 flex items-start gap-1">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div className="rounded-xl p-3 bg-rose-500/10 border border-rose-500/20">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsDown className="w-4 h-4 text-rose-600" />
            <span className="text-xs sm:text-sm font-semibold text-rose-700">Don'ts</span>
          </div>
          <ul className="space-y-1">
            {donts.map((item, index) => (
              <li key={index} className="text-[10px] sm:text-xs text-foreground/70 flex items-start gap-1">
                <span className="text-rose-500 mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shubh Muhurat & Remedy Row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs sm:text-sm font-semibold text-amber-700">Shubh Muhurat</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/80 font-medium">{shubhMuhurat}</p>
        </div>

        <div className="rounded-xl p-3 bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700">Today's Remedy</span>
          </div>
          <p className="text-[10px] sm:text-xs text-foreground/80">{remedy}</p>
        </div>
      </div>

      {/* Mantra Section */}
      <div
        className="rounded-xl p-3 sm:p-4 text-center border"
        style={{
          background: `linear-gradient(135deg, ${sign.color}15, ${sign.color}05)`,
          borderColor: `${sign.color}30`,
        }}
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-1">
          Mantra of the Day
        </p>
        <p className="font-hindi text-base sm:text-lg font-medium text-foreground">
          {mantra}
        </p>
      </div>
    </motion.div>
  );
}
