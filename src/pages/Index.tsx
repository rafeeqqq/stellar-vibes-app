import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignPicker } from '@/components/horoscope/SignPicker';
import { DayTabs } from '@/components/horoscope/DayTabs';
import { MainHoroscopeCard } from '@/components/horoscope/MainHoroscopeCard';
import { DetailCard } from '@/components/horoscope/DetailCard';
import { HealthCard } from '@/components/horoscope/HealthCard';
import { AffirmationCard } from '@/components/horoscope/AffirmationCard';
import { InsightsCard } from '@/components/horoscope/InsightsCard';
import { PanchangCard } from '@/components/horoscope/PanchangCard';
import { ActionButtons } from '@/components/horoscope/ActionButtons';
import { StarField } from '@/components/horoscope/StarField';
import { zodiacSigns, getHoroscopeData } from '@/lib/horoscopeData';
import astrolokalLogo from '@/assets/astrolokal-logo.png';

const Index = () => {
  const [selectedSign, setSelectedSign] = useState('leo');
  const [activeDay, setActiveDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today');

  const dayOffset = activeDay === 'yesterday' ? -1 : activeDay === 'tomorrow' ? 1 : 0;
  const sign = zodiacSigns.find(s => s.id === selectedSign) || zodiacSigns[0];
  const horoscope = getHoroscopeData(selectedSign, dayOffset);

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
          <img 
            src={astrolokalLogo} 
            alt="AstroLokal" 
            className="h-9 sm:h-11 w-auto"
          />
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

      {/* Day Tabs */}
      <div className="mb-4 sm:mb-6">
        <DayTabs activeDay={activeDay} onDayChange={setActiveDay} />
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

          {/* Panchang Card */}
          <PanchangCard 
            sign={sign}
            nakshatra={horoscope.nakshatra}
            tithi={horoscope.tithi}
          />

          {/* Daily Affirmation */}
          <AffirmationCard affirmation={horoscope.dailyAffirmation} />
          {/* Insights Card */}
          <InsightsCard 
            sign={sign}
            compatibleSign={horoscope.compatibleSign}
            avoidSign={horoscope.avoidSign}
            focusArea={horoscope.focusArea}
            focusEmoji={horoscope.focusEmoji}
          />

          {/* Detail Cards */}
          <DetailCard 
            type="love" 
            percentage={horoscope.lovePercentage} 
            text={horoscope.loveText} 
          />
          <DetailCard 
            type="career" 
            percentage={horoscope.careerPercentage} 
            text={horoscope.careerText} 
          />
          <HealthCard 
            percentage={horoscope.healthPercentage} 
            text={horoscope.healthText} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default Index;