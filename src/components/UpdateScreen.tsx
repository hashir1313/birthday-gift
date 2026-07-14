import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import StatusMessage from './StatusMessage';
import { PROGRESS_STEPS } from '../lib/progressSteps';
import { sounds } from '../lib/sounds';

interface UpdateScreenProps {
  onComplete: () => void;
}

export default function UpdateScreen({ onComplete }: UpdateScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Installing Birthday Update...');
  const [isError, setIsError] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showComplete, setShowComplete] = useState(false);
  const startedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    sounds.startup();

    let currentProgress = 0;

    const run = async () => {
      for (let i = 0; i < PROGRESS_STEPS.length; i++) {
        const step = PROGRESS_STEPS[i];
        setStepIndex(i);

        if (step.isError) {
          setIsError(true);
          setErrorTitle(step.errorTitle);
          setErrorMessage(step.errorMessage);
          sounds.error();
          setCurrentMessage(step.message);
          await wait(2200);
          setIsError(false);
        } else {
          setCurrentMessage(step.message);
        }

        const target = step.target;
        while (currentProgress < target) {
          const remaining = target - currentProgress;
          const increment = Math.min(5, remaining);
          currentProgress += increment;
          setProgress(currentProgress);
          await wait(3000 + Math.random() * 2000);
        }
      }

      sounds.complete();
      setShowComplete(true);
      await wait(2000);
      onCompleteRef.current();
    };

    run();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      {!showComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="text-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Installing Birthday Update...
            </h1>
            <p className="text-white/40 text-sm md:text-base">
              Please don't turn off your friend.
            </p>
          </div>

          <ProgressCircle progress={progress} />

          <StatusMessage
            message={currentMessage}
            isError={isError}
            errorTitle={errorTitle}
            errorMessage={errorMessage}
          />

          <div className="w-full max-w-md mt-4">
            <div className="flex items-center justify-between text-xs text-white/30 mb-2 font-mono">
              <span>Birthday Update v22.0</span>
              <span className="flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin" />
                Step {stepIndex + 1} / {PROGRESS_STEPS.length}
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-light to-accent rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center blue-glow"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white text-center text-glow"
          >
            Birthday Update Installed Successfully
          </motion.h1>
        </motion.div>
      )}
    </motion.div>
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
