import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { zodiacSigns } from '@/lib/horoscopeData';
import { ZodiacAvatar } from './ZodiacAvatar';

interface SignPickerProps {
  selectedSign: string;
  onSelectSign: (signId: string) => void;
}

export function SignPicker({ selectedSign, onSelectSign }: SignPickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(`[data-sign="${selectedSign}"]`) as HTMLElement;
      if (selectedElement) {
        const containerWidth = scrollRef.current.clientWidth;
        const elementLeft = selectedElement.offsetLeft;
        const elementWidth = selectedElement.offsetWidth;
        const scrollAmount = elementLeft - (containerWidth / 2) + (elementWidth / 2);
        scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, [selectedSign]);

  const navigateToPrevSign = () => {
    const currentIndex = zodiacSigns.findIndex(s => s.id === selectedSign);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : zodiacSigns.length - 1;
    onSelectSign(zodiacSigns[prevIndex].id);
  };

  const navigateToNextSign = () => {
    const currentIndex = zodiacSigns.findIndex(s => s.id === selectedSign);
    const nextIndex = currentIndex < zodiacSigns.length - 1 ? currentIndex + 1 : 0;
    onSelectSign(zodiacSigns[nextIndex].id);
  };

  const currentSign = zodiacSigns.find(s => s.id === selectedSign);

  return (
    <div className="w-full">
      {/* Main Navigation Row - Large and Bold */}
      <div className="flex items-center justify-center gap-3 px-2 py-3">
        {/* Left Arrow - Large and Obvious */}
        <motion.button
          onClick={navigateToPrevSign}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center touch-manipulation active:scale-90 transition-transform border-4 border-primary-foreground/20"
          whileTap={{ scale: 0.85 }}
          aria-label="Previous sign"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />
        </motion.button>

        {/* Center - Currently Selected Sign (Large Display) */}
        <motion.div 
          className="flex-1 max-w-[200px] flex flex-col items-center"
          key={selectedSign}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-3 bg-primary/30 rounded-full blur-xl" />
            
            {/* Main avatar - large */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-primary shadow-2xl overflow-hidden bg-card">
              {currentSign && (
                <ZodiacAvatar
                  sign={currentSign}
                  isSelected={true}
                  onClick={() => {}}
                  isMain={true}
                />
              )}
            </div>
          </div>
          
          {/* Sign name - Bold and Large */}
          <motion.h2 
            className="mt-3 text-xl sm:text-2xl font-bold text-foreground text-center"
            key={`name-${selectedSign}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentSign?.name}
          </motion.h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {currentSign?.dateRange}
          </p>
        </motion.div>

        {/* Right Arrow - Large and Obvious */}
        <motion.button
          onClick={navigateToNextSign}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center touch-manipulation active:scale-90 transition-transform border-4 border-primary-foreground/20"
          whileTap={{ scale: 0.85 }}
          aria-label="Next sign"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />
        </motion.button>
      </div>

      {/* Instruction Text */}
      <p className="text-center text-xs text-muted-foreground mb-2 px-4">
        👆 Tap arrows to change sign or scroll below
      </p>

      {/* Scrollable Sign Strip - Smaller thumbnails */}
      <motion.div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4 bg-secondary/30 rounded-xl mx-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {zodiacSigns.map((sign) => (
          <motion.button
            key={sign.id}
            data-sign={sign.id}
            onClick={() => onSelectSign(sign.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl transition-all touch-manipulation ${
              selectedSign === sign.id 
                ? 'bg-primary/20 ring-2 ring-primary' 
                : 'bg-card/60 hover:bg-card'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <ZodiacAvatar
              sign={sign}
              isSelected={selectedSign === sign.id}
              onClick={() => onSelectSign(sign.id)}
              isThumb={true}
            />
            <span className={`text-[10px] sm:text-xs font-semibold ${
              selectedSign === sign.id ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {sign.name}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
