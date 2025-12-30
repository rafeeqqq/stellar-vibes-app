import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation }: AffirmationCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 flex items-center gap-2 py-3 px-4 rounded-xl bg-primary/5 border border-primary/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
      <p className="text-xs sm:text-sm text-foreground/80">
        <span className="font-semibold text-primary">Lucky Tip:</span>{" "}
        {affirmation}
      </p>
    </motion.div>
  );
}
