import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function ActionButtons() {
  const handleTalkToAstrologer = () => {
    window.location.href = 'astrolokal://HomeScreen';
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 pb-5 sm:pb-6 bg-gradient-to-t from-background via-background/98 to-transparent backdrop-blur-sm"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="max-w-md mx-auto">
        <motion.button
          onClick={handleTalkToAstrologer}
          className="w-full flex items-center justify-center gap-2 py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-violet-500 text-white font-bold shadow-lg touch-manipulation text-base sm:text-lg"
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
