import { motion } from 'framer-motion';
import { Heart, Briefcase, Activity, Sparkles, MessageCircle } from 'lucide-react';

interface CombinedScoresCardProps {
  lovePercentage: number;
  loveText: string;
  careerPercentage: number;
  careerText: string;
  healthPercentage: number;
  healthText: string;
}

interface ScoreCardProps {
  icon: React.ReactNode;
  label: string;
  percentage: number;
  text: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  tagline: string;
}

function ScoreCard({
  icon,
  label,
  percentage,
  text,
  gradientFrom,
  gradientTo,
  glowColor,
  tagline,
}: ScoreCardProps) {
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const isHighScore = percentage >= 75;

  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-2xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}15, ${gradientTo}08)`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effect for high scores */}
      {isHighScore && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Circular Progress */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="42%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/20"
          />
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50%"
            cy="50%"
            r="42%"
            stroke={`url(#gradient-${label})`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-1">{icon}</div>
          <motion.span
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: gradientFrom }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>

        {/* Sparkle effect for high scores */}
        {isHighScore && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: gradientFrom }} />
          </motion.div>
        )}
      </div>

      {/* Label */}
      <h4 className="font-sans font-bold text-base sm:text-lg text-foreground mb-1">{label}</h4>
      
      {/* Tagline */}
      <p className="text-xs sm:text-sm text-center font-medium mb-3" style={{ color: gradientFrom }}>
        {tagline}
      </p>

      {/* Detailed text */}
      <div
        className="w-full p-3 rounded-xl text-xs sm:text-sm text-foreground/80 leading-relaxed"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}10, ${gradientTo}05)`,
          borderLeft: `3px solid ${gradientFrom}`,
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function getTagline(category: string, percentage: number): string {
  if (category === 'love') {
    if (percentage >= 80) return "💕 Love is in the air!";
    if (percentage >= 60) return "💖 Good vibes today";
    if (percentage >= 40) return "💗 Steady connections";
    return "💜 Focus on self-love";
  }
  if (category === 'career') {
    if (percentage >= 80) return "🚀 Sky's the limit!";
    if (percentage >= 60) return "📈 Momentum building";
    if (percentage >= 40) return "💼 Stay focused";
    return "🎯 Plan strategically";
  }
  if (percentage >= 80) return "⚡ Peak energy!";
  if (percentage >= 60) return "🌟 Feeling good";
  if (percentage >= 40) return "🌿 Balance is key";
  return "🧘 Rest and recover";
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
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/90 backdrop-blur-sm border border-primary/10 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-sans text-lg sm:text-xl font-bold bg-gradient-to-r from-love-dark via-career-dark to-emerald-600 bg-clip-text text-transparent">
          Daily Scores
        </h3>
        <Sparkles className="w-5 h-5 text-primary" />
      </div>

      {/* Three Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ScoreCard
          icon={<Heart className="w-6 h-6 sm:w-7 sm:h-7 text-love" fill="currentColor" />}
          label="Love"
          percentage={lovePercentage}
          text={loveText}
          gradientFrom="#ec4899"
          gradientTo="#f472b6"
          glowColor="rgba(236, 72, 153, 0.4)"
          tagline={getTagline('love', lovePercentage)}
        />
        <ScoreCard
          icon={<Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-career" />}
          label="Career"
          percentage={careerPercentage}
          text={careerText}
          gradientFrom="#3b82f6"
          gradientTo="#60a5fa"
          glowColor="rgba(59, 130, 246, 0.4)"
          tagline={getTagline('career', careerPercentage)}
        />
        <ScoreCard
          icon={<Activity className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />}
          label="Health"
          percentage={healthPercentage}
          text={healthText}
          gradientFrom="#10b981"
          gradientTo="#34d399"
          glowColor="rgba(16, 185, 129, 0.4)"
          tagline={getTagline('health', healthPercentage)}
        />
      </div>

      {/* Talk to Astrologer CTA */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc)',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-sans font-bold text-white text-base sm:text-lg mb-1">
              Need Personalized Guidance?
            </h4>
            <p className="text-white/80 text-xs sm:text-sm">
              Get detailed insights from our expert astrologers
            </p>
          </div>
          
          <motion.button
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-purple-600 font-bold text-sm sm:text-base shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Talk to Astrologer</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
