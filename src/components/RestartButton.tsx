import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { sounds } from '../lib/sounds';

interface RestartButtonProps {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        sounds.click();
        onRestart();
      }}
      className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent-dark text-white font-semibold text-lg shadow-lg hover:shadow-accent/30 transition-shadow duration-300"
    >
      <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
      Restart Adventure →
    </motion.button>
  );
}
