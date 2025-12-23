import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Stars } from 'lucide-react';
import { SignPicker } from '@/components/horoscope/SignPicker';
import { DayTabs } from '@/components/horoscope/DayTabs';
import { MainHoroscopeCard } from '@/components/horoscope/MainHoroscopeCard';
import { DetailCard } from '@/components/horoscope/DetailCard';
import { ActionButtons } from '@/components/horoscope/ActionButtons';
import { StarField } from '@/components/horoscope/StarField';
import { zodiacSigns, getHoroscopeData } from '@/lib/horoscopeData';

const Index = () => {
  const [selectedSign, setSelectedSign] = useState('leo');
  const [activeDay, setActiveDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today');

  const dayOffset = activeDay === 'yesterday' ? -1 : activeDay === 'tomorrow' ? 1 : 0;
  const sign = zodiacSigns.find(s => s.id === selectedSign) || zodiacSigns[0];
  const horoscope = getHoroscopeData(selectedSign, dayOffset);

  return (
    <div className="min-h-screen pb-28 relative">
      {/* Background Effects */}
      <StarField />
      
      {/* Header */}
      <motion.header 
        className="pt-8 pb-4 px-4 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Moon className="w-5 h-5 text-primary" />
          <h1 className="font-serif text-2xl font-semibold text-gradient">Daily Horoscope</h1>
          <Stars className="w-5 h-5 text-primary" />
        </div>
        <p className="text-muted-foreground text-sm">Discover your cosmic guidance</p>
      </motion.header>

      {/* Sign Picker */}
      <SignPicker 
        selectedSign={selectedSign} 
        onSelectSign={setSelectedSign} 
      />

      {/* Day Tabs */}
      <div className="mb-6">
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
          className="space-y-4 relative z-10"
        >
          {/* Main Horoscope Card */}
          <MainHoroscopeCard sign={sign} horoscope={horoscope} />

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
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  );
};

export default Index;