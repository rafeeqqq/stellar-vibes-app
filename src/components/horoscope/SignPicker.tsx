import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      const selectedIndex = zodiacSigns.findIndex(s => s.id === selectedSign);
      const scrollAmount = selectedIndex * 84 - (scrollRef.current.clientWidth / 2) + 42;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, [selectedSign]);

  return (
    <div className="w-full">
      <motion.div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {zodiacSigns.map((sign, index) => (
          <motion.div
            key={sign.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
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