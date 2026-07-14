import { motion } from 'framer-motion';
import { User, Film, Calendar, Target, Heart, Award, Activity, type LucideIcon } from 'lucide-react';

interface PlayerCardProps {
  visible: boolean;
}

interface Field {
  icon: LucideIcon;
  label: string;
  value: string;
}

const FIELDS: Field[] = [
  { icon: User, label: 'Name', value: 'Fateh Adnan' },
  { icon: Film, label: 'Class', value: 'Video Editor' },
  { icon: Calendar, label: 'Age', value: '22' },
  { icon: Target, label: 'Current Mission', value: 'Build a Business Empire' },
  { icon: Heart, label: 'Favorite Things', value: 'Cars · Gaming · Mountains' },
  { icon: Award, label: 'Dream Unlock', value: 'Heavy Bike' },
  { icon: Activity, label: 'Status', value: 'Grinding...' },
];

export default function PlayerCard({ visible }: PlayerCardProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card rounded-3xl p-8 md:p-10 max-w-lg w-full blue-glow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <User size={20} className="text-accent-light" />
        </div>
        <h2 className="text-sm font-bold tracking-[0.2em] text-accent-light">PLAYER PROFILE</h2>
      </div>

      <div className="space-y-4">
        {FIELDS.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
              <field.icon size={16} className="text-white/60 group-hover:text-accent-light transition-colors duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/40 uppercase tracking-wider font-mono">{field.label}</p>
              <p className="text-base text-white font-medium truncate">{field.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
