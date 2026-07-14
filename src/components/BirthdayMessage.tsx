import { motion } from 'framer-motion';

export default function BirthdayMessage() {
  const lines = [
    'I know we don\'t always get everything we want immediately.',
    'But knowing you, I genuinely believe you\'ll unlock every one of those achievements.',
    'Keep creating amazing edits.',
    'Keep chasing your dreams.',
    'One day that dream bike won\'t be a dream anymore.',
    'And that business empire will just be another completed mission.',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-8 md:p-10 max-w-xl w-full"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-white mb-4 text-glow"
      >
        Happy Birthday!
      </motion.h2>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
            className="text-white/70 leading-relaxed text-sm md:text-base"
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + lines.length * 0.15, duration: 0.4 }}
          className="text-lg font-semibold text-white"
        >
          Happy Birthday, brother.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + (lines.length + 1) * 0.15 }}
          className="text-white/60 text-sm"
        >
          Have an amazing year ahead.
        </motion.p>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + (lines.length + 2) * 0.15, type: 'spring' }}
          className="inline-block text-2xl"
        >
          ❤️
        </motion.span>
      </div>
    </motion.div>
  );
}
