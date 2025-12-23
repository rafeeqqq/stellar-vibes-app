import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface AffirmationCardProps {
  affirmation: string;
}

export function AffirmationCard({ affirmation }: AffirmationCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/30 border border-primary/10 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Decorative quote icon */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20">
        <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl sm:text-2xl">✨</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-primary mb-2">
            Daily Affirmation
          </h3>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed italic">
            "{affirmation}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
