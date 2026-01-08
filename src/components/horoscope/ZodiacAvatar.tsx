import { motion } from 'framer-motion';
import { ZodiacSign } from '@/lib/horoscopeData';

// Import zodiac images
import ariesImg from '@/assets/zodiac/aries.png';
import taurusImg from '@/assets/zodiac/taurus.png';
import geminiImg from '@/assets/zodiac/gemini.png';
import cancerImg from '@/assets/zodiac/cancer.png';
import leoImg from '@/assets/zodiac/leo.png';
import virgoImg from '@/assets/zodiac/virgo.png';
import libraImg from '@/assets/zodiac/libra.png';
import scorpioImg from '@/assets/zodiac/scorpio.png';
import sagittariusImg from '@/assets/zodiac/sagittarius.png';
import capricornImg from '@/assets/zodiac/capricorn.png';
import aquariusImg from '@/assets/zodiac/aquarius.png';
import piscesImg from '@/assets/zodiac/pisces.png';

const zodiacImages: Record<string, string> = {
  aries: ariesImg,
  taurus: taurusImg,
  gemini: geminiImg,
  cancer: cancerImg,
  leo: leoImg,
  virgo: virgoImg,
  libra: libraImg,
  scorpio: scorpioImg,
  sagittarius: sagittariusImg,
  capricorn: capricornImg,
  aquarius: aquariusImg,
  pisces: piscesImg,
};

interface ZodiacAvatarProps {
  sign: ZodiacSign;
  isSelected: boolean;
  onClick: () => void;
}

export function ZodiacAvatar({ sign, isSelected, onClick }: ZodiacAvatarProps) {
  const image = zodiacImages[sign.id];

  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[68px] sm:min-w-[80px] touch-manipulation select-none"
      whileTap={{ scale: 0.95 }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      animate={{
        opacity: isSelected ? 1 : 0.85,
        scale: isSelected ? 1 : 0.92,
        y: isSelected ? -3 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      <motion.div
        className={`relative w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center transition-all duration-300 ${
          isSelected 
            ? 'ring-[3px] ring-primary shadow-lg animate-breathe' 
            : 'ring-2 ring-border/50 hover:ring-primary/50'
        }`}
        animate={{
          scale: isSelected ? 1.08 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
        style={{
          background: isSelected 
            ? `linear-gradient(135deg, hsl(20 80% 55% / 0.15), hsl(35 95% 55% / 0.1))`
            : 'white',
        }}
      >
        {/* Golden glow for selected */}
        {isSelected && (
          <motion.div
            className="absolute -inset-2 rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `radial-gradient(circle, hsl(20 80% 55% / 0.35) 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }}
          />
        )}
        
        {/* Avatar image */}
        <img 
          src={image} 
          alt={sign.name}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover relative z-10"
        />
      </motion.div>
      
      <div className="text-center">
        <span 
          className={`text-[11px] sm:text-xs font-medium transition-colors duration-300 block ${
            isSelected ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {sign.name}
        </span>
      </div>
    </motion.button>
  );
}