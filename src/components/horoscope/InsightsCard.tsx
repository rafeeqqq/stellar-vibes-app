import { motion } from 'framer-motion';
import { Users, AlertCircle, Target, Flame, Wind, Droplets, Mountain } from 'lucide-react';
import { ZodiacSign } from '@/lib/horoscopeData';

interface InsightsCardProps {
  sign: ZodiacSign;
  compatibleSign: string;
  avoidSign: string;
  focusArea: string;
  focusEmoji: string;
}

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-4 h-4" />,
  Air: <Wind className="w-4 h-4" />,
  Water: <Droplets className="w-4 h-4" />,
  Earth: <Mountain className="w-4 h-4" />,
};

const elementColors: Record<string, string> = {
  Fire: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  Air: 'from-sky-500/20 to-blue-500/20 border-sky-500/30',
  Water: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
  Earth: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
};

export function InsightsCard({ sign, compatibleSign, avoidSign, focusArea, focusEmoji }: InsightsCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-card-gradient border border-border/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="font-serif text-lg sm:text-xl font-semibold text-gradient mb-3 sm:mb-4">
        Daily Insights
      </h3>
      
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* Element & Planet */}
        <motion.div 
          className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-gradient-to-br ${elementColors[sign.element]} border backdrop-blur-sm`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 text-foreground/80">
            {elementIcons[sign.element]}
            <span className="text-[10px] sm:text-xs uppercase tracking-wide">Element</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground">{sign.element}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            {sign.planetSymbol} {sign.rulingPlanet}
          </p>
        </motion.div>

        {/* Today's Focus */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-muted/30 border border-border/20 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 text-foreground/80">
            <Target className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wide">Focus</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground flex items-center gap-1.5">
            <span>{focusEmoji}</span>
            {focusArea}
          </p>
        </motion.div>

        {/* Compatible Sign */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-muted/30 border border-border/20 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 text-green-400/80">
            <Users className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wide">Best Match</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground">{compatibleSign}</p>
        </motion.div>

        {/* Avoid Sign */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-muted/30 border border-border/20 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 text-orange-400/80">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wide">Caution</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-foreground">{avoidSign}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
