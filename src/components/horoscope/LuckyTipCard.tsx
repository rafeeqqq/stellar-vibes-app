import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LuckyTipCardProps {
  tip: string;
  signColor?: string;
}

export function LuckyTipCard({ tip, signColor }: LuckyTipCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-xl p-3 sm:p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${signColor || '#E67E22'}12, ${signColor || '#E67E22'}05)`,
        border: `1px solid ${signColor || '#E67E22'}20`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center gap-3">
        {/* Star icon */}
        <div 
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${signColor || '#E67E22'}20` }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: signColor || '#E67E22' }} />
        </div>
        
        <div className="flex-1">
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
            Lucky Tip
          </p>
          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
            {tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
