import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ScoreRingProps {
  score: number;
  grade: string;
}

export function ScoreRing({ score, grade }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Count up animation
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  const getScoreConfig = (score: number) => {
    if (score >= 80) {
      return {
        color: '#00E676',
        glowClass: 'ring-glow-emerald',
        label: 'Excellent Choice'
      };
    } else if (score >= 60) {
      return {
        color: '#00E5FF',
        glowClass: 'ring-glow-cyan',
        label: 'Good Choice'
      };
    } else if (score >= 40) {
      return {
        color: '#FFB800',
        glowClass: 'ring-glow-amber',
        label: 'Fair – Watch Some Ingredients'
      };
    } else {
      return {
        color: '#FF3D5A',
        glowClass: 'ring-glow-coral',
        label: 'Poor Choice – Many Concerns'
      };
    }
  };

  const config = getScoreConfig(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center mb-6">
        <svg width="220" height="220" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="14"
          />
          
          {/* Animated progress circle */}
          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={config.glowClass}
          />
          
          {/* Rotating gradient shimmer overlay */}
          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="url(#shimmerGradient)"
            strokeWidth="2"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0, opacity: 0.5 }}
            animate={{ 
              strokeDashoffset: -circumference,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <defs>
            <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity="0" />
              <stop offset="50%" stopColor={config.color} stopOpacity="1" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <div 
              className="text-7xl font-display font-bold mb-1"
              style={{ color: config.color }}
            >
              {grade}
            </div>
            <div className="text-3xl font-mono text-white font-bold">
              {displayScore}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-xl font-display font-semibold text-white text-center"
      >
        {config.label}
      </motion.p>
    </div>
  );
}
