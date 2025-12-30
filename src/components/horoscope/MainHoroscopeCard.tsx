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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      key={sign.id}
    >
      {/* Dark Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6 shadow-2xl">
        
        {/* Top Section */}
        <div className="flex items-center gap-4 mb-6">
          {/* Zodiac Symbol */}
          <motion.div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${sign.color}30, ${sign.color}10)`,
              border: `1px solid ${sign.color}40`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <span className="text-3xl sm:text-4xl">{sign.symbol}</span>
          </motion.div>

          {/* Sign Info */}
          <div className="flex-1">
            <h2 
              className="font-serif text-2xl sm:text-3xl font-bold"
              style={{ color: sign.color }}
            >
              {sign.name}
            </h2>
            <p className="font-hindi text-base sm:text-lg text-white/60">
              {sign.hindiName} राशि
            </p>
            <p className="text-white/40 text-xs mt-0.5">{sign.dateRange}</p>
          </div>

          {/* Mood */}
          <div className="text-center">
            <span className="text-3xl sm:text-4xl block">{horoscope.moodEmoji}</span>
            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Mood</p>
            <p className="text-sm font-medium text-white/80">{horoscope.mood}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Lucky Number */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-white block">
              {horoscope.luckyNumber}
            </span>
            <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-1">
              Lucky Number
            </p>
          </div>

          {/* Lucky Time */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <span className="text-lg sm:text-xl font-bold text-white block">
              {horoscope.luckyTime}
            </span>
            <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-1">
              Lucky Time
            </p>
          </div>

          {/* Lucky Colours */}
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <div className="flex justify-center gap-1.5 mb-1">
              {horoscope.luckyColors.map((color, i) => (
                <motion.div
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full ring-2 ring-white/20"
                  style={{ backgroundColor: color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider">
              Lucky Colours
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
