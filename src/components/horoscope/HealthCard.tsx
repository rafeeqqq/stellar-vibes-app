import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface HealthCardProps {
  percentage: number;
  text: string;
}

export function HealthCard({ percentage, text }: HealthCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-950/50 dark:to-teal-900/30"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 bg-emerald-500/20">
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              Health & Wellness
            </h3>
            <motion.span 
              className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={percentage}
            >
              {percentage}%
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 sm:h-2 rounded-full mb-2 sm:mb-3 bg-emerald-500/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* Text */}
          <p className="text-xs sm:text-sm leading-relaxed text-emerald-700/80 dark:text-emerald-300/80">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
