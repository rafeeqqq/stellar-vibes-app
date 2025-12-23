import { motion } from 'framer-motion';
import { ZodiacSign } from '@/lib/horoscopeData';

interface ZodiacAvatarProps {
  sign: ZodiacSign;
  isSelected: boolean;
  onClick: () => void;
}

export function ZodiacAvatar({ sign, isSelected, onClick }: ZodiacAvatarProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[60px] sm:min-w-[72px] touch-manipulation"
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-br from-primary/30 to-accent/30 glow-golden shadow-lg' 
            : 'bg-muted/50 hover:bg-muted/70 active:bg-muted/70'
        }`}
        animate={{
          scale: isSelected ? 1.1 : 1,
          borderWidth: isSelected ? 2 : 1,
        }}
        style={{
          borderColor: isSelected ? sign.color : 'transparent',
          borderStyle: 'solid',
        }}
      >
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle, ${sign.color}30 0%, transparent 70%)`,
            }}
          />
        )}
        <span className="text-xl sm:text-2xl z-10">{sign.symbol}</span>
      </motion.div>
      <span 
        className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
          isSelected ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {sign.name}
      </span>
    </motion.button>
  );
}