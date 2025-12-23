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
      className="mx-4 rounded-3xl bg-card-gradient border border-border/30 p-6 overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      key={sign.id}
    >
      {/* Decorative glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${sign.color}50 0%, transparent 70%)` }}
      />
      
      {/* Zodiac Symbol Circle */}
      <motion.div 
        className="relative mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-pulse-glow"
          style={{ 
            background: `conic-gradient(from 0deg, ${sign.color}40, transparent, ${sign.color}40)`,
            filter: 'blur(8px)'
          }}
        />
        <div 
          className="absolute inset-2 rounded-full border-2"
          style={{ borderColor: `${sign.color}60` }}
        />
        <div className="absolute inset-4 rounded-full bg-card/80 backdrop-blur flex items-center justify-center">
          <span className="text-5xl">{sign.symbol}</span>
        </div>
      </motion.div>

      {/* Sign Name */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl font-semibold text-gradient">{sign.name}</h2>
        <p className="text-muted-foreground text-sm mt-1">{sign.dateRange}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mood */}
        <motion.div 
          className="bg-muted/30 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-3xl mb-2 block">{horoscope.moodEmoji}</span>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Mood</p>
          <p className="text-sm font-medium text-foreground mt-1">{horoscope.mood}</p>
        </motion.div>

        {/* Lucky Number */}
        <motion.div 
          className="bg-muted/30 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-3xl mb-2 block font-serif text-primary">{horoscope.luckyNumber}</span>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Lucky Number</p>
        </motion.div>

        {/* Lucky Time */}
        <motion.div 
          className="bg-muted/30 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Lucky Time</p>
          <p className="text-sm font-medium text-foreground mt-1">{horoscope.luckyTime}</p>
        </motion.div>

        {/* Lucky Colors */}
        <motion.div 
          className="bg-muted/30 rounded-2xl p-4 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-center gap-2 mb-2">
            {horoscope.luckyColors.map((color, i) => (
              <motion.div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-foreground/20"
                style={{ backgroundColor: color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Lucky Colors</p>
        </motion.div>
      </div>
    </motion.div>
  );
}