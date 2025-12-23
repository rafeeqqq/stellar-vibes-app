import { motion } from 'framer-motion';
import { Heart, Briefcase, Activity, Star } from 'lucide-react';

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
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

function ScoreItem({
  icon,
  label,
  percentage,
  text,
  bgColor,
  borderColor,
  iconColor,
}: ScoreItemProps) {
  return (
    <motion.div
      className="rounded-2xl p-4 sm:p-5 border"
      style={{
        background: bgColor,
        borderColor: borderColor,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div style={{ color: iconColor }}>{icon}</div>
          <h4 className="font-sans font-semibold text-lg sm:text-xl text-foreground">
            {label}
          </h4>
        </div>
        <span 
          className="font-bold text-lg sm:text-xl"
          style={{ color: iconColor }}
        >
          {percentage}%
        </span>
      </div>

      {/* Description text */}
      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
        {text}
      </p>
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
        <Star className="w-5 h-5 text-amber-500" fill="currentColor" />
        <h3 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
          Daily Insights
        </h3>
      </div>

      {/* Score Cards */}
      <div className="space-y-3">
        <ScoreItem
          icon={<Heart className="w-6 h-6" fill="currentColor" />}
          label="Love"
          percentage={lovePercentage}
          text={loveText}
          bgColor="linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)"
          borderColor="#FECACA"
          iconColor="#DC2626"
        />
        <ScoreItem
          icon={<Briefcase className="w-6 h-6" />}
          label="Career"
          percentage={careerPercentage}
          text={careerText}
          bgColor="linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)"
          borderColor="#FDE68A"
          iconColor="#D97706"
        />
        <ScoreItem
          icon={<Activity className="w-6 h-6" />}
          label="Health"
          percentage={healthPercentage}
          text={healthText}
          bgColor="linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)"
          borderColor="#A7F3D0"
          iconColor="#059669"
        />
      </div>
    </motion.div>
  );
}
