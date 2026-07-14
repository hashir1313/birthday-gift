import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sounds';

interface LevelUpScreenProps {
  onContinue: () => void;
}

export default function LevelUpScreen({ onContinue }: LevelUpScreenProps) {
  const firedRef = useRef(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    sounds.levelUp();

    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#60A5FA', '#FFFFFF', '#2563EB'],
      });
    };

    fire();
    const t1 = setTimeout(fire, 600);
    const t2 = setTimeout(fire, 1200);
    const t3 = setTimeout(fire, 1800);

    const continueTimer = setTimeout(onContinue, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(continueTimer);
    };
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-light/30 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="text-6xl md:text-8xl font-extrabold text-white mb-6 text-glow tracking-tight"
        >
          Level Up!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="space-y-2"
        >
          <p className="text-xl md:text-2xl text-white font-semibold">Congratulations!</p>
          <p className="text-base md:text-lg text-white/70">
            You have successfully completed Level 21.
          </p>
          <p className="text-lg md:text-xl text-accent-light font-medium">
            Welcome to Level 22.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
