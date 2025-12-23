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
      className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="flex gap-3 max-w-md mx-auto">
        <motion.button
          onClick={handleChat}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground font-medium transition-colors hover:bg-muted"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat with Astrologer</span>
        </motion.button>

        <motion.button
          onClick={handleCall}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-golden text-primary-foreground font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" />
          <span>Call Astrologer</span>
        </motion.button>
      </div>
    </motion.div>
  );
}