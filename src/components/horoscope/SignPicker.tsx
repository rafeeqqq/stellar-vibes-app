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
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Left Navigation Button */}
      <motion.button
        onClick={navigateToPrevSign}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 shadow-lg border-2 border-primary-foreground/20 flex items-center justify-center touch-manipulation active:scale-95 transition-all hover:bg-primary"
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        onClick={navigateToNextSign}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/90 shadow-lg border-2 border-primary-foreground/20 flex items-center justify-center touch-manipulation active:scale-95 transition-all hover:bg-primary"
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
      </motion.button>

      {/* Scrollable Sign List */}
      <motion.div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-4 sm:py-5 px-16 sm:px-20 snap-x snap-mandatory"
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
