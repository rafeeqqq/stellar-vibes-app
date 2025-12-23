import { motion } from 'framer-motion';
import { Moon, Star, Calendar } from 'lucide-react';
import { ZodiacSign } from '@/lib/horoscopeData';

interface PanchangCardProps {
  sign: ZodiacSign;
  nakshatra: string;
  tithi: string;
}

export function PanchangCard({ sign, nakshatra, tithi }: PanchangCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/20 border border-primary/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <h3 className="font-serif text-lg sm:text-xl font-semibold text-gradient mb-3 sm:mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <span>Today's Panchang</span>
        <span className="font-hindi text-base ml-1 text-primary/70">पंचांग</span>
      </h3>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Nakshatra */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white/60 border border-primary/10 text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Star className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 text-primary" />
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Nakshatra</p>
          <p className="text-xs sm:text-sm font-medium text-foreground mt-0.5">{nakshatra}</p>
        </motion.div>

        {/* Tithi */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white/60 border border-primary/10 text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Moon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 text-primary" />
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Tithi</p>
          <p className="text-xs sm:text-sm font-medium text-foreground mt-0.5">{tithi}</p>
        </motion.div>

        {/* Ruling Planet */}
        <motion.div 
          className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white/60 border border-primary/10 text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl sm:text-2xl mb-1 block">{sign.planetSymbol}</span>
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Graha</p>
          <p className="text-xs sm:text-sm font-medium text-foreground mt-0.5 font-hindi">{sign.rulingPlanetHindi}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
