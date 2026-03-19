import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploaderProps {
  onExtractComplete: (text: string, usedFallback: boolean) => void;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export function ImageUploader({ onExtractComplete, onFileSelect, selectedFile }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect(file);
  };

 const handleExtract = async () => {
  if (!selectedFile) return;
  
  setIsExtracting(true);
  
  try {
    const { apiService } = await import('../services/api');
    const result = await apiService.uploadImage(selectedFile);
    // success ho ya fallback — dono cases mein aage badho
    onExtractComplete(result.text, result.used_fallback);
  } catch (error) {
    console.error('Extract failed:', error);
    // Network error pe bhi fallback text ke saath aage badho
    onExtractComplete(
      'INGREDIENTS: Water, Sugar, Wheat Flour, Salt, High Fructose Corn Syrup, Sodium Benzoate, Monosodium Glutamate, Soy Lecithin, Citric Acid, Modified Starch, Natural Flavor, Caramel Color, Red 40, Aspartame, Sunflower Oil, Calcium Carbonate, Ascorbic Acid, Vitamin D3.',
      true
    );
  } finally {
    setIsExtracting(false);
  }
};

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-3xl p-16 transition-all duration-300
          ${isDragging 
            ? 'border-[#AAFF45] bg-[#AAFF45]/5 shadow-[0_0_24px_rgba(170,255,69,0.3)]' 
            : preview 
            ? 'border-[#00E5FF] bg-[#00E5FF]/5' 
            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }
        `}
      >
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="mb-6 relative inline-block">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-80 rounded-2xl shadow-2xl border-2 border-[#00E5FF]/50"
                style={{ boxShadow: '0 0 32px rgba(0, 229, 255, 0.3)' }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#00E5FF] rounded-full flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)' }}
              >
                <svg className="w-7 h-7 text-[#080B14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
            <p className="text-[#AAFF45] font-display text-lg font-bold mb-1">Image Ready</p>
            <p className="text-[#8B95A8] font-mono text-sm">Click below to extract text</p>
          </motion.div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8 inline-flex items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AAFF45]/20 to-[#00E5FF]/20 flex items-center justify-center border border-white/10">
                <Upload className="w-12 h-12 text-[#AAFF45]" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-display font-bold text-white mb-3">
              Drop your food label here
            </h3>
            <p className="text-[#8B95A8] mb-8 font-mono text-sm">
              or click to browse from your device
            </p>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
            
            <label htmlFor="file-upload">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#AAFF45] to-[#00E5FF] hover:from-[#AAFF45] hover:to-[#00E5FF] text-[#080B14] font-display font-bold rounded-xl shadow-lg btn-glow"
              >
                <span className="cursor-pointer flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Choose Image
                </span>
              </Button>
            </label>

            <p className="text-xs text-[#8B95A8]/60 mt-6 font-mono">
              JPG, PNG, WebP • Max 10MB
            </p>
          </div>
        )}
      </motion.div>

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleExtract}
            disabled={!selectedFile || isExtracting}
            size="lg"
            className="w-full bg-[#AAFF45] hover:bg-[#AAFF45] text-[#080B14] font-display font-bold rounded-xl shadow-lg disabled:opacity-30 disabled:cursor-not-allowed btn-glow relative overflow-hidden"
          >
            {isExtracting ? (
              <>
                <div className="absolute inset-0 shimmer"></div>
                <Loader2 className="w-5 h-5 mr-2 animate-spin relative z-10" />
                <span className="relative z-10">Extracting Text...</span>
              </>
            ) : (
              'Extract Text'
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
