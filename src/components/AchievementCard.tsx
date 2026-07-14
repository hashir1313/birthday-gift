import { motion } from 'framer-motion';
import { Check, Lock, Film, Car, Gamepad2, Briefcase, Award, type LucideIcon } from 'lucide-react';

interface Achievement {
  icon: LucideIcon;
  title: string;
  unlocked: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: Film, title: 'Master Editor', unlocked: true },
  { icon: Car, title: 'Car Enthusiast', unlocked: true },
  { icon: Gamepad2, title: 'Gamer', unlocked: true },
  { icon: Briefcase, title: 'Freelancer', unlocked: true },
  { icon: Car, title: 'Dream Bike', unlocked: false },
  { icon: Briefcase, title: 'Business Empire', unlocked: false },
  { icon: Award, title: 'Legendary Success', unlocked: false },
];

export default function AchievementCard() {
  return (
    <div className="w-full max-w-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-bold tracking-[0.2em] text-accent-light text-center mb-6"
      >
        ACHIEVEMENTS
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((ach, i) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 150 }}
            className={`relative rounded-2xl p-4 flex flex-col items-center gap-2 text-center ${
              ach.unlocked
                ? 'glass border-white/10'
                : 'glass border-accent/20 locked-glow'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                ach.unlocked
                  ? 'bg-accent/20'
                  : 'bg-white/5'
              }`}
            >
              <ach.icon
                size={22}
                className={ach.unlocked ? 'text-accent-light' : 'text-white/30'}
              />
            </div>
            <div className="flex items-center gap-1.5">
              {ach.unlocked ? (
                <Check size={14} className="text-accent-light" />
              ) : (
                <Lock size={12} className="text-accent/50" />
              )}
              <p className={`text-sm font-medium ${ach.unlocked ? 'text-white' : 'text-white/40'}`}>
                {ach.title}
              </p>
            </div>
            {!ach.unlocked && (
              <span className="text-[10px] text-accent/40 font-mono uppercase tracking-wider">Locked</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
