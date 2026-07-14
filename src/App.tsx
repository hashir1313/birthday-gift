import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateScreen from './components/UpdateScreen';
import LevelUpScreen from './components/LevelUpScreen';
import PlayerCard from './components/PlayerCard';
import AchievementCard from './components/AchievementCard';
import BirthdayMessage from './components/BirthdayMessage';
import SystemStatus from './components/SystemStatus';
import RestartButton from './components/RestartButton';

type Phase = 'installing' | 'levelup' | 'dashboard';

function App() {
  const [phase, setPhase] = useState<Phase>('installing');
  const [showPlayerCard, setShowPlayerCard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== 'dashboard') return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setShowPlayerCard(true), 600));
    timers.push(setTimeout(() => setShowAchievements(true), 1600));
    timers.push(setTimeout(() => setShowBirthday(true), 2600));
    timers.push(setTimeout(() => setShowSystemStatus(true), 3800));
    timers.push(setTimeout(() => setShowRestart(true), 4800));

    return () => timers.forEach(clearTimeout);
  }, [phase, resetKey]);

  useEffect(() => {
    if (phase === 'dashboard' && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [phase]);

  const handleRestart = () => {
    setShowPlayerCard(false);
    setShowAchievements(false);
    setShowBirthday(false);
    setShowSystemStatus(false);
    setShowRestart(false);
    setPhase('installing');
    setResetKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-surface-900 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'installing' && (
          <motion.div key={`install-${resetKey}`} className="relative z-10">
            <UpdateScreen onComplete={() => setPhase('levelup')} />
          </motion.div>
        )}

        {phase === 'levelup' && (
          <motion.div key="levelup" className="relative z-10">
            <LevelUpScreen onContinue={() => setPhase('dashboard')} />
          </motion.div>
        )}

        {phase === 'dashboard' && (
          <motion.div
            key={`dashboard-${resetKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            ref={scrollRef}
            className="relative z-10 min-h-screen overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-8 py-12 px-4 md:px-6 max-w-4xl mx-auto">
              <PlayerCard visible={showPlayerCard} />
              {showAchievements && <AchievementCard />}
              {showBirthday && <BirthdayMessage />}
              {showSystemStatus && <SystemStatus />}
              {showRestart && (
                <div className="pb-8">
                  <RestartButton onRestart={handleRestart} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
