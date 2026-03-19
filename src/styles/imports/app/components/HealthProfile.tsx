import { motion } from 'motion/react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';

interface HealthProfileProps {
  isDiabetic: boolean;
  allergies: string[];
  onDiabeticChange: (value: boolean) => void;
  onAllergiesChange: (allergies: string[]) => void;
}

const ALLERGY_OPTIONS = [
  'gluten',
  'dairy',
  'tree nuts',
  'peanuts',
  'soy',
  'eggs',
  'shellfish',
  'fish',
  'sesame',
  'sulfites'
];

export function HealthProfile({ 
  isDiabetic, 
  allergies, 
  onDiabeticChange, 
  onAllergiesChange 
}: HealthProfileProps) {
  const handleAllergyToggle = (allergy: string) => {
    if (allergies.includes(allergy)) {
      onAllergiesChange(allergies.filter(a => a !== allergy));
    } else {
      onAllergiesChange([...allergies, allergy]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Diabetic Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl p-8 border border-white/10 relative"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label htmlFor="diabetic" className="text-white font-display font-bold text-xl block mb-2">
              I am diabetic
            </Label>
            <p className="text-[#8B95A8] font-mono text-sm">
              Get warnings about sugar content
            </p>
          </div>
          <Switch
            id="diabetic"
            checked={isDiabetic}
            onCheckedChange={onDiabeticChange}
            className="data-[state=checked]:bg-[#AAFF45]"
          />
        </div>
      </motion.div>

      {/* Allergies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-2xl p-8 border border-white/10 relative"
      >
        <Label className="text-white font-display font-bold text-xl mb-2 block">
          Select your allergies
        </Label>
        <p className="text-[#8B95A8] font-mono text-sm mb-6">
          We'll flag any matching ingredients
        </p>
        
        <div className="flex flex-wrap gap-3">
          {ALLERGY_OPTIONS.map((allergy, index) => {
            const isSelected = allergies.includes(allergy);
            return (
              <motion.label
                key={allergy}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`
                  inline-flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer
                  transition-all duration-200 font-mono text-sm font-semibold
                  ${isSelected 
                    ? 'bg-gradient-to-r from-[#AAFF45] to-[#00E5FF] text-[#080B14] border-2 border-transparent shadow-lg'
                    : 'bg-white/5 border-2 border-white/10 text-[#8B95A8] hover:border-white/20 hover:bg-white/10'
                  }
                `}
                style={isSelected ? { boxShadow: '0 0 20px rgba(170, 255, 69, 0.4)' } : {}}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleAllergyToggle(allergy)}
                  className="hidden"
                />
                <span className="capitalize">{allergy}</span>
              </motion.label>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
