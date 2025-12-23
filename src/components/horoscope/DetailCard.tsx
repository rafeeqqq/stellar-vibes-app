import { motion } from 'framer-motion';
import { Heart, Briefcase } from 'lucide-react';

interface DetailCardProps {
  type: 'love' | 'career';
  percentage: number;
  text: string;
}

export function DetailCard({ type, percentage, text }: DetailCardProps) {
  const isLove = type === 'love';
  
  return (
    <motion.div
      className={`mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg ${isLove ? 'bg-love-gradient' : 'bg-career-gradient'}`}
      initial={{ opacity: 0, x: isLove ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: isLove ? 0.1 : 0.2 }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div 
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isLove ? 'bg-love-accent/20' : 'bg-career-accent/20'
          }`}
        >
          {isLove ? (
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-love-accent" fill="currentColor" />
          ) : (
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-career-accent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <h3 className={`font-serif text-lg sm:text-xl font-semibold ${
              isLove ? 'text-love-accent' : 'text-career-accent'
            }`}>
              {isLove ? 'Love' : 'Career'}
            </h3>
            <div className="flex items-center gap-1">
              <motion.span 
                className={`text-xl sm:text-2xl font-bold ${
                  isLove ? 'text-love-accent' : 'text-career-accent'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={percentage}
              >
                {percentage}%
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`h-1.5 sm:h-2 rounded-full mb-2 sm:mb-3 ${
            isLove ? 'bg-love-accent/20' : 'bg-career-accent/20'
          }`}>
            <motion.div
              className={`h-full rounded-full ${
                isLove ? 'bg-love-accent' : 'bg-career-accent'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* Text */}
          <p className={`text-xs sm:text-sm leading-relaxed ${
            isLove ? 'text-love-accent/80' : 'text-career-accent/80'
          }`}>
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}