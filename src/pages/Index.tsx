import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignPicker } from '@/components/horoscope/SignPicker';
import { DayTabs } from '@/components/horoscope/DayTabs';
import { MainHoroscopeCard } from '@/components/horoscope/MainHoroscopeCard';
import { DailyReadingCard } from '@/components/horoscope/DailyReadingCard';
import { AffirmationCard } from '@/components/horoscope/AffirmationCard';
import { CombinedScoresCard } from '@/components/horoscope/CombinedScoresCard';
import { ActionButtons } from '@/components/horoscope/ActionButtons';
import { StarField } from '@/components/horoscope/StarField';
import { zodiacSigns, getHoroscopeData } from '@/lib/horoscopeData';
import astrolokalLogo from '@/assets/astrolokal-logo.png';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const formatDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
};

const Index = () => {
  const [selectedSign, setSelectedSign] = useState('leo');
  const [activeDay, setActiveDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today');

  const dayOffset = activeDay === 'yesterday' ? -1 : activeDay === 'tomorrow' ? 1 : 0;
  const sign = zodiacSigns.find(s => s.id === selectedSign) || zodiacSigns[0];
  const horoscope = getHoroscopeData(selectedSign, dayOffset);

  const greeting = useMemo(() => getGreeting(), []);
  const currentDate = useMemo(() => formatDate(dayOffset), [dayOffset]);

  return (
    <div className="min-h-screen pb-32 sm:pb-28 relative overflow-x-hidden">
      {/* Background Effects */}
      <StarField />
      
      {/* Header */}
      <motion.header 
        className="pt-5 sm:pt-6 pb-2 sm:pb-3 px-4 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p 
          className="text-primary/80 text-xs sm:text-sm font-medium mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {greeting} ✨
        </motion.p>
        <div className="flex items-center justify-center mb-1">
          <div className="shimmer-effect rounded-lg">
            <img 
              src={astrolokalLogo} 
              alt="AstroLokal" 
              className="h-9 sm:h-11 w-auto"
            />
          </div>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Your Daily Horoscope
        </p>
      </motion.header>

      {/* Sign Picker */}
      <SignPicker 
        selectedSign={selectedSign} 
        onSelectSign={setSelectedSign} 
      />

      {/* Day Tabs with Date Display */}
      <div className="mb-4 sm:mb-5">
        <DayTabs activeDay={activeDay} onDayChange={setActiveDay} />
        <motion.p 
          key={currentDate}
          className="text-center text-muted-foreground text-[10px] sm:text-xs mt-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentDate}
        </motion.p>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedSign}-${activeDay}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 sm:space-y-4 relative z-10"
        >
          {/* Main Horoscope Card */}
          <MainHoroscopeCard sign={sign} horoscope={horoscope} />

          {/* Today's Reading - moved up */}
          <DailyReadingCard
            sign={sign}
            generalReading={horoscope.generalReading}
            dos={horoscope.dos}
            donts={horoscope.donts}
            shubhMuhurat={horoscope.shubhMuhurat}
            remedy={horoscope.remedy}
            mantra={horoscope.mantra}
          />

          {/* Daily Insights - moved up */}
          <CombinedScoresCard 
            lovePercentage={horoscope.lovePercentage}
            loveText={horoscope.loveText}
            careerPercentage={horoscope.careerPercentage}
            careerText={horoscope.careerText}
            moneyPercentage={horoscope.moneyPercentage}
            moneyText={horoscope.moneyText}
            healthPercentage={horoscope.healthPercentage}
            healthText={horoscope.healthText}
            travelPercentage={horoscope.travelPercentage}
            travelText={horoscope.travelText}
          />

          {/* Daily Affirmation - moved to bottom */}
          <AffirmationCard affirmation={horoscope.dailyAffirmation} signColor={sign.color} />
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default Index;
