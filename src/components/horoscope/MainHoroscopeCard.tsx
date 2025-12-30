import { motion } from 'framer-motion';
import { ZodiacSign, HoroscopeData } from '@/lib/horoscopeData';

interface MainHoroscopeCardProps {
  sign: ZodiacSign;
  horoscope: HoroscopeData;
}

export function MainHoroscopeCard({ sign, horoscope }: MainHoroscopeCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={sign.id}
    >
      {/* Traditional Warm Card */}
      <div 
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 border border-primary/15 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          {/* Sign Details - Left */}
          <div className="flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              {sign.hindiName} राशि
            </h2>
            <p className="text-sm sm:text-base text-primary/70 font-medium">
              {sign.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{sign.dateRange}</p>
          </div>

          {/* Mood - Right */}
          <div className="text-center flex-shrink-0 rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10">
            <span className="text-xl sm:text-2xl block">{horoscope.moodEmoji}</span>
            <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase mt-0.5">Mood</p>
            <p className="text-[10px] sm:text-xs font-medium text-foreground">{horoscope.mood}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Lucky Number */}
          <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
            <span className="text-lg sm:text-xl font-bold text-primary block">
              {horoscope.luckyNumber}
            </span>
            <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">
              Lucky Number
            </p>
          </div>

          {/* Lucky Time */}
          <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
            <span className="text-sm sm:text-base font-bold text-primary block">
              {horoscope.luckyTime}
            </span>
            <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">
              Lucky Time
            </p>
          </div>

          {/* Lucky Colours */}
          <div className="rounded-xl p-2.5 sm:p-3 bg-white/60 border border-primary/10 text-center">
            <div className="flex justify-center gap-1.5 mb-1">
              {horoscope.luckyColors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wide">
              Lucky Colours
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
