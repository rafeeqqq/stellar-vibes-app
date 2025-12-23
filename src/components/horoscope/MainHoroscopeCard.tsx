import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ZodiacSign, HoroscopeData } from '@/lib/horoscopeData';

interface MainHoroscopeCardProps {
  sign: ZodiacSign;
  horoscope: HoroscopeData;
}

export function MainHoroscopeCard({ sign, horoscope }: MainHoroscopeCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm border border-primary/10 p-4 sm:p-5 overflow-hidden relative shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      key={sign.id}
    >
      {/* Decorative glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${sign.color}60 0%, transparent 70%)` }}
      />
      
      {/* Top section with symbol and info side by side */}
      <div className="flex items-center gap-4 mb-4">
        {/* Zodiac Symbol Circle - Smaller */}
        <motion.div 
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-pulse-glow"
            style={{ 
              background: `conic-gradient(from 0deg, ${sign.color}30, transparent, ${sign.color}30)`,
              filter: 'blur(6px)'
            }}
          />
          <div 
            className="absolute inset-1 rounded-full border-2"
            style={{ borderColor: `${sign.color}50` }}
          />
          <div className="absolute inset-2 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">{sign.symbol}</span>
          </div>
        </motion.div>

        {/* Sign Info */}
        <div className="flex-1">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gradient">{sign.name}</h2>
          <p className="font-hindi text-base sm:text-lg text-primary/80">{sign.hindiName} राशि</p>
          <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">{sign.dateRange}</p>
        </div>

        {/* Mood Badge */}
        <div className="text-center">
          <span className="text-2xl sm:text-3xl block mb-0.5">{horoscope.moodEmoji}</span>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Mood</p>
          <p className="text-[10px] sm:text-xs font-medium text-foreground">{horoscope.mood}</p>
        </div>
      </div>

      {/* Stats Grid - 3 columns instead of 2x2 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Lucky Number */}
        <motion.div 
          className="bg-secondary/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center backdrop-blur-sm border border-primary/10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg sm:text-xl font-serif text-primary block">{horoscope.luckyNumber}</span>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Lucky #</p>
        </motion.div>

        {/* Lucky Time */}
        <motion.div 
          className="bg-secondary/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center backdrop-blur-sm border border-primary/10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-primary" />
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">Time</p>
          <p className="text-[10px] sm:text-xs font-medium text-foreground">{horoscope.luckyTime}</p>
        </motion.div>

        {/* Lucky Colors */}
        <motion.div 
          className="bg-secondary/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center backdrop-blur-sm border border-primary/10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex justify-center gap-1 sm:gap-1.5 mb-0.5">
            {horoscope.luckyColors.map((color, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">Colors</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
