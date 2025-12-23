import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';

export function ActionButtons() {
  const handleChat = () => {
    toast.success('Connecting you with an astrologer...', {
      description: 'A mystical advisor will be with you shortly ✨',
    });
  };

  const handleCall = () => {
    toast.success('Initiating call...', {
      description: 'Preparing your cosmic consultation 🌙',
    });
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 pb-5 sm:pb-6 bg-gradient-to-t from-background via-background/98 to-transparent backdrop-blur-sm"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="flex gap-2 sm:gap-3 max-w-md mx-auto">
        <motion.button
          onClick={handleChat}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3.5 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-md border border-primary/20 text-foreground font-medium transition-colors hover:bg-white active:bg-white shadow-md touch-manipulation"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-primary" />
          <span className="text-sm sm:text-base truncate">Chat</span>
        </motion.button>

        <motion.button
          onClick={handleCall}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3.5 sm:py-4 px-3 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg touch-manipulation"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base truncate">Call Astrologer</span>
        </motion.button>
      </div>
    </motion.div>
  );
}