import { motion } from 'framer-motion';
import { Heart, Briefcase } from 'lucide-react';

interface DetailCardProps {
  type: 'love' | 'career';
  percentage: number;
  text: string;
}

export function DetailCard({ type, percentage, text }: DetailCardProps) {
  const isLove = type === 'love';
  
  const config = {
    love: {
      icon: Heart,
      title: 'Love',
      bgGradient: 'from-rose-500/10 to-pink-500/10',
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-500',
      progressBg: 'bg-rose-500/20',
      progressFill: 'from-rose-500 to-pink-400',
      textColor: 'text-rose-600 dark:text-rose-400',
      subtextColor: 'text-rose-700/70 dark:text-rose-300/70',
      fill: true,
    },
    career: {
      icon: Briefcase,
      title: 'Career',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-500',
      progressBg: 'bg-amber-500/20',
      progressFill: 'from-amber-500 to-orange-400',
      textColor: 'text-amber-600 dark:text-amber-400',
      subtextColor: 'text-amber-700/70 dark:text-amber-300/70',
      fill: false,
    },
  };

  const c = config[type];
  const Icon = c.icon;
  
  return (
    <motion.div
      className={`mx-3 sm:mx-4 rounded-2xl p-4 bg-gradient-to-br ${c.bgGradient} border border-white/10 dark:border-white/5`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: isLove ? 0.1 : 0.15 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.iconBg}`}>
            <Icon className={`w-4 h-4 ${c.iconColor}`} fill={c.fill ? 'currentColor' : 'none'} />
          </div>
          <h3 className={`font-serif text-base font-semibold ${c.textColor}`}>
            {c.title}
          </h3>
        </div>
        <motion.div 
          className={`text-2xl font-bold ${c.textColor}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          {percentage}%
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className={`h-2 rounded-full ${c.progressBg} mb-3 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${c.progressFill}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {/* Text */}
      <p className={`text-xs leading-relaxed ${c.subtextColor} line-clamp-2`}>
        {text}
      </p>
    </motion.div>
  );
}
