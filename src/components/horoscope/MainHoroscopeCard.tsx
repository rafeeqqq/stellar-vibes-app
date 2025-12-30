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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={sign.id}
    >
      {/* Traditional Warm Card */}
      <div 
        className="rounded-2xl p-4 sm:p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF5EB 100%)',
          border: '1px solid #F5DEB3',
          boxShadow: '0 4px 20px rgba(210, 105, 30, 0.1)',
        }}
      >
        {/* Subtle Corner Decoration */}
        <div 
          className="absolute top-0 right-0 w-24 h-24 opacity-10"
          style={{
            background: `radial-gradient(circle at top right, ${sign.color}, transparent 70%)`,
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 relative z-10">
          {/* Zodiac Symbol */}
          <motion.div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ 
              background: `linear-gradient(135deg, ${sign.color}20, ${sign.color}10)`,
              border: `1.5px solid ${sign.color}40`,
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-3xl sm:text-4xl">{sign.symbol}</span>
          </motion.div>

          {/* Sign Details */}
          <div className="flex-1 min-w-0">
            <h2 
              className="font-serif text-xl sm:text-2xl font-semibold"
              style={{ color: '#B8860B' }}
            >
              {sign.name}
            </h2>
            <p className="font-hindi text-sm sm:text-base text-orange-700/70">
              {sign.hindiName} राशि
            </p>
            <p className="text-xs text-stone-500">{sign.dateRange}</p>
          </div>

          {/* Mood */}
          <div className="text-center flex-shrink-0">
            <span className="text-2xl block">{horoscope.moodEmoji}</span>
            <p className="text-[9px] text-stone-400 uppercase mt-0.5">Mood</p>
            <p className="text-[11px] font-medium text-stone-600">{horoscope.mood}</p>
          </div>
        </div>

        {/* Stats Grid - 2 rows */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {/* Lucky Number */}
          <div 
            className="rounded-lg p-2.5 text-center"
            style={{ background: '#FEF7ED', border: '1px solid #FDEBD0' }}
          >
            <span className="text-lg sm:text-xl font-bold text-orange-700 block">
              {horoscope.luckyNumber}
            </span>
            <p className="text-[8px] text-stone-500 uppercase tracking-wide">
              Number
            </p>
          </div>

          {/* Lucky Time */}
          <div 
            className="rounded-lg p-2.5 text-center"
            style={{ background: '#FEF7ED', border: '1px solid #FDEBD0' }}
          >
            <span className="text-xs sm:text-sm font-bold text-orange-700 block">
              {horoscope.luckyTime}
            </span>
            <p className="text-[8px] text-stone-500 uppercase tracking-wide">
              Lucky Time
            </p>
          </div>

          {/* Lucky Colours */}
          <div 
            className="rounded-lg p-2.5 text-center"
            style={{ background: '#FEF7ED', border: '1px solid #FDEBD0' }}
          >
            <div className="flex justify-center gap-1">
              {horoscope.luckyColors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-[8px] text-stone-500 uppercase tracking-wide mt-0.5">
              Colours
            </p>
          </div>

          {/* Best Match */}
          <div 
            className="rounded-lg p-2.5 text-center"
            style={{ background: '#FDF2F8', border: '1px solid #FCE7F3' }}
          >
            <span className="text-lg block">{compatibleSign?.symbol || '♌'}</span>
            <p className="text-[8px] text-pink-600/70 uppercase tracking-wide">
              Match
            </p>
          </div>
        </div>

        {/* Compatibility Row */}
        <div 
          className="flex items-center justify-between rounded-lg px-3 py-2.5"
          style={{ background: '#FFFBF5', border: '1px solid #F5DEB3' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: `${sign.color}15`, border: `1px solid ${sign.color}30` }}
              >
                {sign.symbol}
              </div>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ 
                  background: `${compatibleSign?.color || '#F9A826'}15`, 
                  border: `1px solid ${compatibleSign?.color || '#F9A826'}30` 
                }}
              >
                {compatibleSign?.symbol || '♌'}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-700">Today's Best Match</p>
              <p className="text-[10px] text-stone-500">{horoscope.compatibleSign}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-stone-400">Avoid</p>
            <p className="text-xs text-stone-600">{horoscope.avoidSign}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
