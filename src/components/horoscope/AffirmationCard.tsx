import { motion } from 'framer-motion';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation, signColor }: AffirmationCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-xl p-3 sm:p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${signColor || '#E67E22'}15, ${signColor || '#E67E22'}08)`,
        border: `1px solid ${signColor || '#E67E22'}25`,
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-start gap-3">
        {/* Quote icon */}
        <span className="text-2xl sm:text-3xl text-primary/60 font-serif leading-none">"</span>
        
        <div className="flex-1 pt-1">
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
            {affirmation}
          </p>
        </div>
        
        <span className="text-2xl sm:text-3xl text-primary/60 font-serif leading-none self-end">"</span>
      </div>
    </motion.div>
  );
}
