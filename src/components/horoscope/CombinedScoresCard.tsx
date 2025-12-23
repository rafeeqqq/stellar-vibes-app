import { motion } from 'framer-motion';
import { Heart, Briefcase, Activity } from 'lucide-react';

interface CombinedScoresCardProps {
  lovePercentage: number;
  loveText: string;
  careerPercentage: number;
  careerText: string;
  healthPercentage: number;
  healthText: string;
}

interface ScoreItemProps {
  icon: React.ReactNode;
  label: string;
  percentage: number;
  text: string;
  bgClass: string;
  borderClass: string;
  accentColor: string;
}

function ScoreItem({
  icon,
  label,
  percentage,
  text,
  bgClass,
  borderClass,
  accentColor,
}: ScoreItemProps) {
  return (
    <motion.div
      className={`rounded-2xl p-4 sm:p-5 border ${bgClass} ${borderClass}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={accentColor}>{icon}</div>
          <h4 className="font-sans font-semibold text-lg sm:text-xl text-foreground">
            {label}
          </h4>
        </div>
        <span className={`font-bold text-lg sm:text-xl ${accentColor}`}>
          {percentage}%
        </span>
      </div>

      {/* Description text - more prominent */}
      <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
        {text}
      </p>

      {/* Additional insight tip based on percentage */}
      <div className={`mt-3 pt-3 border-t border-border/50`}>
        <p className={`text-xs sm:text-sm font-medium ${accentColor}`}>
          {percentage >= 80 
            ? `Excellent energy for ${label.toLowerCase()} matters today!`
            : percentage >= 60 
            ? `Good prospects ahead. Stay positive and proactive.`
            : percentage >= 40
            ? `Room for growth. Focus on small, meaningful steps.`
            : `Take it easy. Self-reflection brings clarity.`
          }
        </p>
      </div>
    </motion.div>
  );
}

export function CombinedScoresCard({
  lovePercentage,
  loveText,
  careerPercentage,
  careerText,
  healthPercentage,
  healthText,
}: CombinedScoresCardProps) {
  return (
    <motion.div
      className="mx-3 sm:mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <h3 className="font-sans text-lg sm:text-xl font-bold text-gradient">
          Daily Insights
        </h3>
      </div>

      {/* Score Cards */}
      <div className="space-y-3">
        <ScoreItem
          icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />}
          label="Love"
          percentage={lovePercentage}
          text={loveText}
          bgClass="bg-love-gradient"
          borderClass="border-love/30"
          accentColor="text-love-dark"
        />
        <ScoreItem
          icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />}
          label="Career"
          percentage={careerPercentage}
          text={careerText}
          bgClass="bg-career-gradient"
          borderClass="border-career/30"
          accentColor="text-career-dark"
        />
        <ScoreItem
          icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6" />}
          label="Health"
          percentage={healthPercentage}
          text={healthText}
          bgClass="bg-secondary"
          borderClass="border-primary/20"
          accentColor="text-primary"
        />
      </div>
    </motion.div>
  );
}
