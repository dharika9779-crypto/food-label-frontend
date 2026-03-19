import { motion } from 'motion/react';

interface IngredientChipProps {
  name: string;
  category: 'safe' | 'moderate' | 'harmful' | 'unknown';
  index: number;
}

export function IngredientChip({ name, category, index }: IngredientChipProps) {
  const styles = {
    safe: {
      bg: 'bg-[#00E676]/10',
      border: 'border-[#00E676]/40',
      text: 'text-[#00E676]',
      glow: 'chip-glow-safe',
    },
    moderate: {
      bg: 'bg-[#FFB800]/10',
      border: 'border-[#FFB800]/40',
      text: 'text-[#FFB800]',
      glow: 'chip-glow-moderate',
    },
    harmful: {
      bg: 'bg-[#FF3D5A]/10',
      border: 'border-[#FF3D5A]/40',
      text: 'text-[#FF3D5A]',
      glow: 'chip-glow-harmful',
    },
    unknown: {
      bg: 'bg-white/5',
      border: 'border-white/20',
      text: 'text-[#8B95A8]',
      glow: '',
    },
  };

  const style = styles[category];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        ${style.bg} ${style.border} ${style.text} ${style.glow}
        inline-flex items-center px-4 py-2 rounded-full border-2
        font-mono text-sm font-semibold backdrop-blur-sm
        transition-all duration-200 cursor-default
      `}
      title={`${category.toUpperCase()}: ${name}`}
    >
      {name}
    </motion.span>
  );
}
