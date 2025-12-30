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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => ref.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

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

  return (
    <div className="w-full relative">
      {/* Left Navigation Button */}
      <motion.button
        onClick={navigateToPrevSign}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 shadow-md border border-border flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollLeft ? 1 : 0.5 }}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        onClick={navigateToNextSign}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 shadow-md border border-border flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollRight ? 1 : 0.5 }}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </motion.button>

      {/* Scrollable Sign List */}
      <motion.div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-3 sm:py-4 px-10 sm:px-14 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {zodiacSigns.map((sign, index) => (
          <motion.div
            key={sign.id}
            data-sign={sign.id}
            className="snap-center flex-shrink-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
          >
            <ZodiacAvatar
              sign={sign}
              isSelected={selectedSign === sign.id}
              onClick={() => onSelectSign(sign.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
