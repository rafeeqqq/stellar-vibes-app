import { motion } from 'framer-motion';
import { Copy, Sparkles, Star } from 'lucide-react';
import { toast } from 'sonner';

interface AffirmationCardProps {
  affirmation: string;
  signColor?: string;
}

export function AffirmationCard({ affirmation, signColor = '#8b5cf6' }: AffirmationCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(affirmation);
    toast.success('Affirmation copied to clipboard!');
  };

  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${signColor}20, ${signColor}40, ${signColor}20)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating stars */}
        <motion.div
          className="absolute top-4 left-6"
          animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Star className="w-4 h-4 text-white/40" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute top-8 right-10"
          animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <Star className="w-3 h-3 text-white/30" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute bottom-6 left-10"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-white/25" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-6"
          animate={{ y: [3, -3, 3], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          <Star className="w-4 h-4 text-white/35" fill="currentColor" />
        </motion.div>
        
        {/* Gradient orbs */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, white, transparent)` }}
        />
        <div 
          className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, white, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-white/80" />
          </motion.div>
          <h3 className="font-sans text-base sm:text-lg font-bold text-white/90 uppercase tracking-wider">
            Daily Affirmation
          </h3>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-white/80" />
          </motion.div>
        </div>

        {/* Affirmation text */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-white text-center leading-relaxed mb-6 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          "{affirmation}"
        </motion.p>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          className="mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 text-white/90 hover:text-white text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Copy className="w-4 h-4" />
          <span>Copy Affirmation</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
