import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LuckyTipCardProps {
  tip: string;
  signColor?: string;
}

export function LuckyTipCard({ tip, signColor }: LuckyTipCardProps) {
  const accentColor = signColor || '#F59E0B';
  
  return (
    <motion.div
      className="mx-3 sm:mx-4 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
    >
      {/* Glowing background effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)` }}
      />
      
      <div 
        className="relative rounded-xl px-4 py-3 sm:py-4 flex items-center gap-3 backdrop-blur-sm"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}08 100%)`,
          border: `1px solid ${accentColor}30`,
        }}
      >
        {/* Animated sparkle icon */}
        <motion.div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}25, ${accentColor}10)`,
            boxShadow: `0 0 20px ${accentColor}20`
          }}
          animate={{ 
            boxShadow: [
              `0 0 15px ${accentColor}20`,
              `0 0 25px ${accentColor}35`,
              `0 0 15px ${accentColor}20`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
        </motion.div>
        
        <div className="flex-1">
          <p 
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5"
            style={{ color: accentColor }}
          >
            ✨ Lucky Tip
          </p>
          <p className="text-sm sm:text-base font-medium text-foreground leading-snug">
            {tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
