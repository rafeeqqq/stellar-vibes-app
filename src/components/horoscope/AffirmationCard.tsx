import { motion } from 'framer-motion';
import { Copy, Quote } from 'lucide-react';
import { toast } from 'sonner';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation, signColor = '#8b5cf6' }: AffirmationCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(affirmation);
    toast.success('Affirmation copied!');
  };

  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-lg bg-white/95 backdrop-blur-sm border border-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Decorative gradient accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl sm:rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, ${signColor}, ${signColor}80, ${signColor})` }}
      />

      {/* Large quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-16 h-16 sm:w-20 sm:h-20" style={{ color: signColor }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${signColor}20` }}
          >
            <span className="text-lg">✨</span>
          </div>
          <h3 
            className="font-sans text-sm font-bold uppercase tracking-wider"
            style={{ color: signColor }}
          >
            Daily Affirmation
          </h3>
        </div>

        {/* Affirmation text */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-foreground leading-relaxed mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          "{affirmation}"
        </motion.p>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
          style={{ 
            backgroundColor: `${signColor}15`,
            color: signColor,
          }}
          whileHover={{ scale: 1.05, backgroundColor: `${signColor}25` }}
          whileTap={{ scale: 0.95 }}
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
