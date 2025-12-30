import { motion } from 'framer-motion';

interface CombinedScoresCardProps {
  lovePercentage: number;
  loveText: string;
  careerPercentage: number;
  careerText: string;
  moneyPercentage: number;
  moneyText: string;
  healthPercentage: number;
  healthText: string;
  travelPercentage: number;
  travelText: string;
}

interface ScoreItemProps {
  emoji: string;
  label: string;
  percentage: number;
  text: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  index: number;
}

function ScoreItem({
  emoji,
  label,
  percentage,
  text,
  bgColor,
  borderColor,
  accentColor,
  index,
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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl">{emoji}</span>
          <h4 className="font-sans font-semibold text-lg sm:text-xl text-foreground">
            {label}
          </h4>
        </div>
        <span 
          className="font-bold text-lg sm:text-xl"
          style={{ color: accentColor }}
        >
          {percentage}%
        </span>
      </div>

      {/* Description text */}
      <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
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
  moneyPercentage,
  moneyText,
  healthPercentage,
  healthText,
  travelPercentage,
  travelText,
}: CombinedScoresCardProps) {
  const scoreItems = [
    {
      emoji: '💕',
      label: 'Love',
      percentage: lovePercentage,
      text: loveText,
      bgColor: '#FFF5F5',
      borderColor: '#FECACA',
      accentColor: '#E53E3E',
    },
    {
      emoji: '💼',
      label: 'Career',
      percentage: careerPercentage,
      text: careerText,
      bgColor: '#FFFAF0',
      borderColor: '#FBD38D',
      accentColor: '#DD6B20',
    },
    {
      emoji: '💰',
      label: 'Money',
      percentage: moneyPercentage,
      text: moneyText,
      bgColor: '#F0FFF4',
      borderColor: '#9AE6B4',
      accentColor: '#38A169',
    },
    {
      emoji: '💪',
      label: 'Health',
      percentage: healthPercentage,
      text: healthText,
      bgColor: '#EBF8FF',
      borderColor: '#90CDF4',
      accentColor: '#3182CE',
    },
    {
      emoji: '✈️',
      label: 'Travel',
      percentage: travelPercentage,
      text: travelText,
      bgColor: '#FAF5FF',
      borderColor: '#D6BCFA',
      accentColor: '#805AD5',
    },
  ];

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
        {scoreItems.map((item, index) => (
          <ScoreItem
            key={item.label}
            emoji={item.emoji}
            label={item.label}
            percentage={item.percentage}
            text={item.text}
            bgColor={item.bgColor}
            borderColor={item.borderColor}
            accentColor={item.accentColor}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
