import { motion } from 'framer-motion';
import { Clock, Palette, Hash, Sparkles } from 'lucide-react';
import { ZodiacSign, HoroscopeData } from '@/lib/horoscopeData';

interface MainHoroscopeCardProps {
  sign: ZodiacSign;
  horoscope: HoroscopeData;
}

export function MainHoroscopeCard({ sign, horoscope }: MainHoroscopeCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={sign.id}
    >
      {/* Main Card with Gradient Border */}
      <div 
        className="rounded-3xl p-[2px] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${sign.color}, ${sign.color}60, ${sign.color}30, ${sign.color}60, ${sign.color})`,
        }}
      >
        <div className="rounded-[22px] bg-gradient-to-br from-white via-white to-orange-50/50 p-5 sm:p-6 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
              style={{ background: sign.color }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl"
              style={{ background: sign.color }}
            />
          </div>

          {/* Hero Section */}
          <div className="flex items-start gap-4 sm:gap-5 mb-5 relative z-10">
            {/* Zodiac Symbol - Premium Design */}
            <motion.div 
              className="relative flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            >
              {/* Outer Glow Ring */}
              <div 
                className="absolute -inset-2 rounded-2xl opacity-20 blur-xl"
                style={{ background: sign.color }}
              />
              
              {/* Main Symbol Container */}
              <div 
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${sign.color}15, ${sign.color}05)`,
                  border: `2px solid ${sign.color}30`,
                }}
              >
                {/* Inner Symbol */}
                <motion.span 
                  className="text-4xl sm:text-5xl"
                  style={{ 
                    filter: `drop-shadow(0 2px 4px ${sign.color}40)`,
                  }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {sign.symbol}
                </motion.span>
              </div>
            </motion.div>

            {/* Sign Info */}
            <div className="flex-1 pt-1">
              <motion.h2 
                className="font-serif text-2xl sm:text-3xl font-bold"
                style={{ color: sign.color }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {sign.name}
              </motion.h2>
              <motion.p 
                className="font-hindi text-lg sm:text-xl text-foreground/70 -mt-0.5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {sign.hindiName} राशि
              </motion.p>
              <motion.p 
                className="text-muted-foreground text-xs sm:text-sm mt-1 flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: sign.color }} />
                {sign.dateRange}
              </motion.p>
            </div>

            {/* Mood Badge - Floating Design */}
            <motion.div 
              className="text-center px-3 py-2 rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${sign.color}10, ${sign.color}05)`,
                border: `1px solid ${sign.color}20`,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="text-3xl sm:text-4xl block"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {horoscope.moodEmoji}
              </motion.span>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">Mood</p>
              <p 
                className="text-xs sm:text-sm font-semibold"
                style={{ color: sign.color }}
              >
                {horoscope.mood}
              </p>
            </motion.div>
          </div>

          {/* Lucky Stats - Horizontal Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 relative z-10">
            {/* Lucky Number */}
            <motion.div 
              className="group relative rounded-2xl p-3 sm:p-4 text-center overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #FFF7ED, #FFEDD5)',
                border: '1px solid #FED7AA',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Hash className="w-4 h-4 mx-auto text-orange-400 mb-1" />
              <span className="text-2xl sm:text-3xl font-bold text-orange-600 block">
                {horoscope.luckyNumber}
              </span>
              <p className="text-[9px] sm:text-[10px] text-orange-600/70 uppercase tracking-wider mt-1 font-medium">
                Lucky Number
              </p>
            </motion.div>

            {/* Lucky Time */}
            <motion.div 
              className="group relative rounded-2xl p-3 sm:p-4 text-center overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #FEF3C7, #FDE68A)',
                border: '1px solid #FCD34D',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Clock className="w-4 h-4 mx-auto text-amber-500 mb-1" />
              <span className="text-base sm:text-lg font-bold text-amber-700 block">
                {horoscope.luckyTime}
              </span>
              <p className="text-[9px] sm:text-[10px] text-amber-600/70 uppercase tracking-wider mt-1 font-medium">
                Lucky Time
              </p>
            </motion.div>

            {/* Lucky Colours */}
            <motion.div 
              className="group relative rounded-2xl p-3 sm:p-4 text-center overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #FCE7F3, #FBCFE8)',
                border: '1px solid #F9A8D4',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Palette className="w-4 h-4 mx-auto text-pink-400 mb-1" />
              <div className="flex justify-center gap-1.5 my-1">
                {horoscope.luckyColors.map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md ring-2 ring-white"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              <p className="text-[9px] sm:text-[10px] text-pink-600/70 uppercase tracking-wider mt-1 font-medium">
                Lucky Colours
              </p>
            </motion.div>
          </div>

          {/* Sparkle Decorations */}
          <motion.div
            className="absolute top-4 right-20 text-amber-400/40"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <motion.div
            className="absolute bottom-16 left-4 text-orange-400/30"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
