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
      className={`mx-4 rounded-3xl p-5 ${isLove ? 'bg-love-gradient' : 'bg-career-gradient'}`}
      initial={{ opacity: 0, x: isLove ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: isLove ? 0.1 : 0.2 }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div 
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isLove ? 'bg-love-accent/20' : 'bg-career-accent/20'
          }`}
        >
          {isLove ? (
            <Heart className="w-6 h-6 text-love-accent" fill="currentColor" />
          ) : (
            <Briefcase className="w-6 h-6 text-career-accent" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-serif text-xl font-semibold ${
              isLove ? 'text-love-accent' : 'text-career-accent'
            }`}>
              {isLove ? 'Love' : 'Career'}
            </h3>
            <div className="flex items-center gap-1">
              <motion.span 
                className={`text-2xl font-bold ${
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
          <div className={`h-2 rounded-full mb-3 ${
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
          <p className={`text-sm leading-relaxed ${
            isLove ? 'text-love-accent/80' : 'text-career-accent/80'
          }`}>
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}