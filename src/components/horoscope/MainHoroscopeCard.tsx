import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ZodiacSign, HoroscopeData, zodiacSigns } from '@/lib/horoscopeData';

interface MainHoroscopeCardProps {
  sign: ZodiacSign;
  horoscope: HoroscopeData;
}

export function MainHoroscopeCard({ sign, horoscope }: MainHoroscopeCardProps) {
  const compatibleSign = zodiacSigns.find(s => s.name === horoscope.compatibleSign);

  return (
    <motion.div
      className="mx-3 sm:mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      key={sign.id}
    >
      {/* Celestial Card */}
      <div 
        className="rounded-3xl p-5 sm:p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1033 0%, #2d1b4e 50%, #1a1033 100%)',
          boxShadow: '0 20px 40px -10px rgba(45, 27, 78, 0.5)',
        }}
      >
        {/* Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient Orb */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${sign.color}, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-start gap-4 mb-5">
            {/* Zodiac Symbol */}
            <motion.div 
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
            >
              <div 
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center relative"
                style={{ 
                  width: '72px',
                  height: '72px',
                  background: `linear-gradient(145deg, ${sign.color}25, ${sign.color}10)`,
                  border: `2px solid ${sign.color}50`,
                  boxShadow: `0 0 30px ${sign.color}30`,
                }}
              >
                <span className="text-4xl sm:text-5xl">{sign.symbol}</span>
              </div>
            </motion.div>

            {/* Sign Info */}
            <div className="flex-1 pt-1">
              <h2 
                className="font-serif text-2xl sm:text-3xl font-bold tracking-wide"
                style={{ 
                  background: `linear-gradient(135deg, ${sign.color}, #ffd700)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {sign.name}
              </h2>
              <p className="font-hindi text-base text-amber-200/70">
                {sign.hindiName} राशि
              </p>
              <p className="text-purple-200/50 text-xs mt-0.5">{sign.dateRange}</p>
            </div>

            {/* Mood Badge */}
            <div 
              className="text-center px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span className="text-2xl sm:text-3xl block">{horoscope.moodEmoji}</span>
              <p className="text-[10px] text-purple-200/50 uppercase tracking-wider mt-1">Mood</p>
              <p className="text-xs font-medium text-amber-200">{horoscope.mood}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
            {/* Lucky Number */}
            <motion.div 
              className="rounded-xl p-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xl sm:text-2xl font-bold text-white block">
                {horoscope.luckyNumber}
              </span>
              <p className="text-[8px] sm:text-[9px] text-purple-200/50 uppercase tracking-wider mt-1">
                Number
              </p>
            </motion.div>

            {/* Lucky Time */}
            <motion.div 
              className="rounded-xl p-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-sm sm:text-base font-bold text-white block">
                {horoscope.luckyTime}
              </span>
              <p className="text-[8px] sm:text-[9px] text-purple-200/50 uppercase tracking-wider mt-1">
                Lucky Time
              </p>
            </motion.div>

            {/* Lucky Colours */}
            <motion.div 
              className="rounded-xl p-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-center gap-1">
                {horoscope.luckyColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-[8px] sm:text-[9px] text-purple-200/50 uppercase tracking-wider mt-1">
                Colours
              </p>
            </motion.div>

            {/* Compatibility */}
            <motion.div 
              className="rounded-xl p-3 text-center"
              style={{
                background: 'linear-gradient(145deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))',
                border: '1px solid rgba(236,72,153,0.2)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg">{compatibleSign?.symbol || '♌'}</span>
                <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />
              </div>
              <p className="text-[8px] sm:text-[9px] text-pink-300/70 uppercase tracking-wider mt-1">
                Match
              </p>
            </motion.div>
          </div>

          {/* Compatibility Banner */}
          <motion.div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: 'linear-gradient(90deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1))',
              border: '1px solid rgba(236,72,153,0.15)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `${sign.color}20`,
                    border: `1px solid ${sign.color}40`,
                  }}
                >
                  <span className="text-sm">{sign.symbol}</span>
                </div>
                <div className="flex items-center mx-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                </div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `${compatibleSign?.color || sign.color}20`,
                    border: `1px solid ${compatibleSign?.color || sign.color}40`,
                  }}
                >
                  <span className="text-sm">{compatibleSign?.symbol || '♌'}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/80">Best Match Today</p>
                <p className="text-[10px] text-purple-200/50">{horoscope.compatibleSign}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-pink-300/70">Avoid</p>
              <p className="text-[10px] text-purple-200/50">{horoscope.avoidSign}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
