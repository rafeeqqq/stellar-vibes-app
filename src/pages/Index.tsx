import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignPicker } from '@/components/horoscope/SignPicker';
import { DayTabs } from '@/components/horoscope/DayTabs';
import { MainHoroscopeCard } from '@/components/horoscope/MainHoroscopeCard';
import { DailyReadingCard } from '@/components/horoscope/DailyReadingCard';
import { LuckyTipCard } from '@/components/horoscope/LuckyTipCard';
import { CombinedScoresCard } from '@/components/horoscope/CombinedScoresCard';
import { ActionButtons } from '@/components/horoscope/ActionButtons';
import { StarField } from '@/components/horoscope/StarField';
import { zodiacSigns } from '@/lib/horoscopeData';
import { useAIHoroscope } from '@/hooks/useAIHoroscope';
import { useAnalytics } from '@/hooks/useAnalytics';
import astrolokalLogo from '@/assets/astrolokal-logo.png';

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
  const { trackSignSelected, trackDayChanged, trackHoroscopeLoaded } = useAnalytics();

  const dayOffset = activeDay === 'yesterday' ? -1 : activeDay === 'tomorrow' ? 1 : 0;
  const sign = zodiacSigns.find(s => s.id === selectedSign) || zodiacSigns[0];
  const { horoscope, isLoading, isAIPowered } = useAIHoroscope(sign, dayOffset);

  const currentDate = useMemo(() => formatDate(dayOffset), [dayOffset]);

  // Track horoscope load
  useEffect(() => {
    if (!isLoading && horoscope) {
      trackHoroscopeLoaded(selectedSign, isAIPowered);
    }
  }, [isLoading, selectedSign, isAIPowered]);

  const handleSignChange = (signId: string) => {
    setSelectedSign(signId);
    trackSignSelected(signId);
  };

  const handleDayChange = (day: 'yesterday' | 'today' | 'tomorrow') => {
    setActiveDay(day);
    trackDayChanged(day);
  };

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
        onSelectSign={handleSignChange} 
      />

      {/* Day Tabs with Date Display */}
      <div className="mb-4 sm:mb-5">
        <DayTabs activeDay={activeDay} onDayChange={handleDayChange} />
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
            dayOffset={dayOffset}
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

          {/* Lucky Tip */}
          <LuckyTipCard tip={horoscope.dailyAffirmation} signColor={sign.color} />
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default Index;
