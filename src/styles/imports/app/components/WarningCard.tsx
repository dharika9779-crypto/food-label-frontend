import { motion } from 'motion/react';

interface WarningCardProps {
  type: 'allergy' | 'diabetic' | 'harmful';
  message: string;
  index: number;
}

export function WarningCard({ type, message, index }: WarningCardProps) {
  const styles = {
    allergy: {
      border: 'border-l-[#FF3D5A]',
      bg: 'bg-[#FF3D5A]/5',
      borderWidth: 'border-l-4',
    },
    diabetic: {
      border: 'border-l-[#FFB800]',
      bg: 'bg-[#FFB800]/5',
      borderWidth: 'border-l-4',
    },
    harmful: {
      border: 'border-l-[#FF3D5A]',
      bg: 'bg-[#FF3D5A]/10',
      borderWidth: 'border-l-4',
    },
  };

  const style = styles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`
        ${style.bg} ${style.border} ${style.borderWidth}
        glass-card rounded-xl p-5 border-t border-r border-b border-white/5
        backdrop-blur-lg
      `}
    >
      <p className="text-white font-mono text-sm leading-relaxed">
        {message}
      </p>
    </motion.div>
  );
}
