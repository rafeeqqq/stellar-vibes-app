import { motion } from 'framer-motion';
import { Heart, Briefcase, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface CombinedScoresCardProps {
  lovePercentage: number;
  loveText: string;
  careerPercentage: number;
  careerText: string;
  healthPercentage: number;
  healthText: string;
}

interface CircularProgressProps {
  percentage: number;
  color: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
}

function CircularProgress({ percentage, color, icon, label, isExpanded, onClick }: CircularProgressProps) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-secondary"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-0.5" style={{ color }}>{icon}</div>
          <span className="text-sm sm:text-base font-semibold text-foreground">{percentage}%</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1.5 flex items-center gap-1">
        {label}
        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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
  const [expandedSection, setExpandedSection] = useState<'love' | 'career' | 'health' | null>(null);

  const toggleSection = (section: 'love' | 'career' | 'health') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getExpandedText = () => {
    switch (expandedSection) {
      case 'love':
        return { title: 'Love & Relationships', text: loveText, color: '#F43F5E' };
      case 'career':
        return { title: 'Career & Finance', text: careerText, color: '#8B5CF6' };
      case 'health':
        return { title: 'Health & Wellness', text: healthText, color: '#10B981' };
      default:
        return null;
    }
  };

  const expandedContent = getExpandedText();

  return (
    <motion.div
      className="mx-3 sm:mx-4 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/90 backdrop-blur-sm border border-primary/10 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <h3 className="font-serif text-lg sm:text-xl font-semibold text-gradient mb-4 text-center">
        Daily Scores
      </h3>

      {/* Three circular progress indicators */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <CircularProgress
          percentage={lovePercentage}
          color="#F43F5E"
          icon={<Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="#F43F5E" />}
          label="Love"
          isExpanded={expandedSection === 'love'}
          onClick={() => toggleSection('love')}
        />
        <CircularProgress
          percentage={careerPercentage}
          color="#8B5CF6"
          icon={<Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />}
          label="Career"
          isExpanded={expandedSection === 'career'}
          onClick={() => toggleSection('career')}
        />
        <CircularProgress
          percentage={healthPercentage}
          color="#10B981"
          icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5" />}
          label="Health"
          isExpanded={expandedSection === 'health'}
          onClick={() => toggleSection('health')}
        />
      </div>

      {/* Expandable detail section */}
      <motion.div
        initial={false}
        animate={{
          height: expandedContent ? 'auto' : 0,
          opacity: expandedContent ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {expandedContent && (
          <div
            className="mt-4 p-3 sm:p-4 rounded-xl border"
            style={{
              backgroundColor: `${expandedContent.color}10`,
              borderColor: `${expandedContent.color}30`,
            }}
          >
            <h4
              className="text-sm sm:text-base font-semibold mb-1.5"
              style={{ color: expandedContent.color }}
            >
              {expandedContent.title}
            </h4>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
              {expandedContent.text}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
