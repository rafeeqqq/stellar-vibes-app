import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation }: AffirmationCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #FEF3E7 0%, #FFF5EB 100%)',
        borderColor: '#F5D4B3',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h3 className="font-sans text-base sm:text-lg font-semibold text-foreground">
          Daily Affirmation
        </h3>
      </div>

      {/* Affirmation text */}
      <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
        {affirmation}
      </p>
    </motion.div>
  );
}
