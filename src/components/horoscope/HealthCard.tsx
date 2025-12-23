import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface HealthCardProps {
  percentage: number;
  text: string;
}

export function HealthCard({ percentage, text }: HealthCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 dark:border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/20">
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="font-serif text-base font-semibold text-emerald-600 dark:text-emerald-400">
            Health
          </h3>
        </div>
        <motion.div 
          className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          {percentage}%
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-emerald-500/20 mb-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {/* Text */}
      <p className="text-xs leading-relaxed text-emerald-700/70 dark:text-emerald-300/70 line-clamp-2">
        {text}
      </p>
    </motion.div>
  );
}