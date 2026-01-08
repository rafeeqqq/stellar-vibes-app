import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

export function ActionButtons() {
  const { trackCtaClicked } = useAnalytics();

  const handleTalkToAstrologer = () => {
    trackCtaClicked('talk_to_astrologer');
    window.location.href = 'astrolokal://HomeScreen';
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 pb-5 sm:pb-6 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="max-w-md mx-auto">
        <motion.button
          onClick={handleTalkToAstrologer}
          className="w-full flex items-center justify-center gap-2 py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl text-white font-bold touch-manipulation text-base sm:text-lg animate-pulse-cta"
          style={{
            background: 'linear-gradient(135deg, #E85A4F 0%, #E98A61 50%, #F4A261 100%)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Talk to Astrologer</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
