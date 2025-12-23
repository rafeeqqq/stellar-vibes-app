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
    <div className="flex justify-center px-4">
      <div className="bg-muted/30 backdrop-blur-sm rounded-full p-1 flex gap-1">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onDayChange(tab.id)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeDay === tab.id 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {activeDay === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-golden rounded-full"
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