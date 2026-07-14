import { motion } from 'framer-motion';
import { Heart, Sparkles, Zap, DollarSign, Rocket, Cake, type LucideIcon } from 'lucide-react';

interface StatBar {
  icon: LucideIcon;
  label: string;
  fill: number;
  color: string;
}

const STATS: StatBar[] = [
  { icon: Heart, label: 'Health', fill: 10, color: '#3B82F6' },
  { icon: Sparkles, label: 'Creativity', fill: 10, color: '#60A5FA' },
  { icon: Zap, label: 'Motivation', fill: 9, color: '#3B82F6' },
  { icon: DollarSign, label: 'Money', fill: 6, color: '#60A5FA' },
  { icon: Rocket, label: 'Future', fill: 10, color: '#3B82F6' },
];

export default function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-8 md:p-10 max-w-md w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <Cake size={20} className="text-accent-light" />
        </div>
        <h2 className="text-sm font-bold tracking-[0.2em] text-accent-light">SYSTEM STATUS</h2>
      </div>

      <div className="space-y-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <stat.icon size={16} className="text-white/50 shrink-0" />
            <span className="text-sm text-white/70 w-20 shrink-0 font-mono">{stat.label}</span>
            <div className="flex-1 flex gap-1">
              {Array.from({ length: 10 }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: j < stat.fill ? 1 : 0.15,
                    scaleY: 1,
                  }}
                  transition={{ delay: 0.3 + i * 0.1 + j * 0.03 }}
                  className="h-5 flex-1 rounded-sm"
                  style={{
                    backgroundColor: j < stat.fill ? stat.color : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 pt-4 border-t border-white/5"
        >
          <span className="text-sm text-white/70 font-mono">Birthday</span>
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-light text-sm font-bold tracking-wider">
            COMPLETE
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
