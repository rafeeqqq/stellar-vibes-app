import { motion } from 'framer-motion';
import { Moon, Star, Target, Users, AlertCircle, Flame, Wind, Droplets, Mountain } from 'lucide-react';
import { ZodiacSign } from '@/lib/horoscopeData';

interface DailyInfoCardProps {
  sign: ZodiacSign;
  nakshatra: string;
  tithi: string;
  compatibleSign: string;
  avoidSign: string;
  focusArea: string;
  focusEmoji: string;
}

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-3.5 h-3.5" />,
  Air: <Wind className="w-3.5 h-3.5" />,
  Water: <Droplets className="w-3.5 h-3.5" />,
  Earth: <Mountain className="w-3.5 h-3.5" />,
};

const elementColors: Record<string, string> = {
  Fire: 'bg-orange-500/15 border-orange-500/30 text-orange-700',
  Air: 'bg-sky-500/15 border-sky-500/30 text-sky-700',
  Water: 'bg-blue-500/15 border-blue-500/30 text-blue-700',
  Earth: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700',
};

export function DailyInfoCard({
  sign,
  nakshatra,
  tithi,
  compatibleSign,
  avoidSign,
  focusArea,
  focusEmoji,
}: DailyInfoCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 border border-primary/15 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* First Row: Panchang Info */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {/* Nakshatra */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary" />
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Nakshatra</p>
          <p className="text-[10px] sm:text-xs font-medium text-foreground mt-0.5 line-clamp-1">{nakshatra}</p>
        </div>

        {/* Tithi */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary" />
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Tithi</p>
          <p className="text-[10px] sm:text-xs font-medium text-foreground mt-0.5 line-clamp-1">{tithi}</p>
        </div>

        {/* Ruling Planet */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
          <span className="text-base sm:text-lg block mb-0.5">{sign.planetSymbol}</span>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Graha</p>
          <p className="text-[10px] sm:text-xs font-medium text-foreground mt-0.5 font-hindi">{sign.rulingPlanetHindi}</p>
        </div>

        {/* Element */}
        <div className={`rounded-xl p-2.5 sm:p-3 border text-center ${elementColors[sign.element]}`}>
          <div className="flex justify-center mb-1">{elementIcons[sign.element]}</div>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wide opacity-80">Element</p>
          <p className="text-[10px] sm:text-xs font-medium mt-0.5">{sign.element}</p>
        </div>
      </div>

      {/* Second Row: Insights */}
      <div className="grid grid-cols-3 gap-2">
        {/* Today's Focus */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10">
          <div className="flex items-center gap-1 mb-1">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Focus</span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-foreground flex items-center gap-1">
            <span>{focusEmoji}</span>
            <span className="line-clamp-1">{focusArea}</span>
          </p>
        </div>

        {/* Best Match */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-1 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[8px] sm:text-[10px] text-emerald-700 uppercase tracking-wide">Match</span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-foreground">{compatibleSign}</p>
        </div>

        {/* Caution */}
        <div className="rounded-xl p-2.5 sm:p-3 bg-orange-500/10 border border-orange-500/20">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-[8px] sm:text-[10px] text-orange-700 uppercase tracking-wide">Caution</span>
          </div>
          <p className="text-[10px] sm:text-xs font-medium text-foreground">{avoidSign}</p>
        </div>
      </div>
    </motion.div>
  );
}
