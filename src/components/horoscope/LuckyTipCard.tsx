import { motion } from 'framer-motion';
import { Clover } from 'lucide-react';

interface LuckyTipCardProps {
  tip: string;
  signColor?: string;
}

export function LuckyTipCard({ tip, signColor }: LuckyTipCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 py-3 px-4 flex items-center gap-3 rounded-lg bg-card/50 border border-border/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Clover 
        className="w-4 h-4 flex-shrink-0" 
        style={{ color: signColor || '#22C55E' }} 
      />
      <p className="text-xs sm:text-sm text-foreground/80">
        <span className="font-medium" style={{ color: signColor || '#22C55E' }}>Lucky Tip:</span>{' '}
        {tip}
      </p>
    </motion.div>
  );
}
