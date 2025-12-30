import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation }: AffirmationCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #FEF3E7 0%, #FFF5EB 100%)',
        borderColor: '#F5D4B3',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        <h3 className="font-sans text-sm sm:text-base font-semibold text-foreground">
          आज का सुविचार
        </h3>
      </div>

      {/* Simple thought */}
      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-hindi">
        {affirmation}
      </p>
    </motion.div>
  );
}
