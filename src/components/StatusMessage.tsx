import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface StatusMessageProps {
  message: string;
  isError?: boolean;
  errorTitle?: string;
  errorMessage?: string;
}

export default function StatusMessage({
  message,
  isError,
  errorTitle,
  errorMessage,
}: StatusMessageProps) {
  return (
    <div className="h-20 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {isError ? (
          <motion.div
            key={`error-${message}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-lg font-medium text-white/80">{message}</p>
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <span className="font-medium">{errorTitle}</span>
            </div>
            <p className="text-sm text-red-400/70">{errorMessage}</p>
          </motion.div>
        ) : (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-medium text-white/80"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
