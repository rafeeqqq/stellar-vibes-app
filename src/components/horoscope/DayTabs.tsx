import { motion } from 'framer-motion';

interface DayTabsProps {
  activeDay: 'yesterday' | 'today' | 'tomorrow';
  onDayChange: (day: 'yesterday' | 'today' | 'tomorrow') => void;
}

const tabs = [
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
] as const;

export function DayTabs({ activeDay, onDayChange }: DayTabsProps) {
  return (
    <div className="flex justify-center px-3 sm:px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-full p-1 sm:p-1.5 flex gap-0.5 sm:gap-1 border border-primary/20 shadow-lg">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onDayChange(tab.id)}
            className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 touch-manipulation ${
              activeDay === tab.id 
                ? 'text-white' 
                : 'text-muted-foreground hover:text-primary active:text-primary'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {activeDay === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full shadow-md"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}