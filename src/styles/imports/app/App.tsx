import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { HealthProfile } from './components/HealthProfile';
import { ResultsPanel } from './components/ResultsPanel';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import type { FullScanResponse } from './services/api';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<FullScanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const handleExtractComplete = (text: string, fallback: boolean) => {
    setExtractedText(text);
    setUsedFallback(fallback);
    setCurrentStep(2);
    
    if (fallback) {
      toast.warning('Using demo mode - Backend unavailable', {
        description: 'Connect your FastAPI backend for live analysis'
      });
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    
    try {
      const { apiService } = await import('./services/api');
      const result = await apiService.fullScan(extractedText, isDiabetic, allergies);
      setAnalysisResult(result);
      setCurrentStep(3);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedFile(null);
    setExtractedText('');
    setIsDiabetic(false);
    setAllergies([]);
    setAnalysisResult(null);
    setUsedFallback(false);
  };

  return (
    <div className="min-h-screen animated-bg">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      />
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ 
              background: 'rgba(8, 11, 20, 0.9)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-4 border-white/10 border-t-[#AAFF45] mb-6 mx-auto"
                style={{ boxShadow: '0 0 24px rgba(170, 255, 69, 0.4)' }}
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white font-display text-xl font-bold"
              >
                Analyzing Ingredients...
              </motion.p>
              <p className="text-[#8B95A8] font-mono text-sm mt-2">
                This will only take a moment
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/5 backdrop-blur-xl bg-white/[0.02]"
      >
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  filter: [
                    'drop-shadow(0 0 8px rgba(170, 255, 69, 0.6))',
                    'drop-shadow(0 0 16px rgba(170, 255, 69, 0.9))',
                    'drop-shadow(0 0 8px rgba(170, 255, 69, 0.6))'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#AAFF45] text-4xl"
              >
                ⬡
              </motion.div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white">
                  LabelLens
                </h1>
                <p className="text-sm text-[#8B95A8] font-mono">
                  Decode what's really in your food.
                </p>
              </div>
            </div>
            
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:border-[#AAFF45] hover:text-[#AAFF45] hover:bg-[#AAFF45]/5 font-display font-bold transition-all duration-200 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Scan Another Product
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#AAFF45]/30 to-transparent" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <AnimatePresence mode="wait">
          {/* Step 1 - Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                >
                  <span className="text-[#AAFF45] font-display font-bold text-lg">01</span>
                  <span className="text-white font-mono text-sm font-semibold">Upload Food Label</span>
                </motion.div>
              </div>
              
              <div className="glass-card rounded-3xl p-10 border border-white/10 relative">
                <div className="gradient-border-top" />
                <ImageUploader
                  onExtractComplete={handleExtractComplete}
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                />
              </div>
            </motion.div>
          )}

          {/* Step 2 - Health Profile */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                >
                  <span className="text-[#AAFF45] font-display font-bold text-lg">02</span>
                  <span className="text-white font-mono text-sm font-semibold">Health Profile</span>
                </motion.div>
              </div>

              {usedFallback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 glass-card rounded-2xl p-5 border-2 border-[#FFB800]/30 bg-[#FFB800]/5"
                >
                  <p className="text-[#FFB800] font-mono text-sm">
                    ⚠️ Demo Mode Active — Backend service unavailable. Using sample data.
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-3xl p-10 border border-white/10 mb-8 relative"
              >
                <div className="gradient-border-top" />
                <div className="mb-8">
                  <label className="block text-[#8B95A8] font-mono text-sm mb-3 font-semibold">
                    Extracted Text:
                  </label>
                  <textarea
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    className="w-full bg-white/5 text-white border-2 border-white/10 rounded-2xl p-6 font-mono text-sm min-h-[140px] focus:outline-none focus:border-[#AAFF45]/50 focus:bg-white/[0.07] transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Extracted ingredients will appear here..."
                    style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)' }}
                  />
                  <div className="text-right mt-2">
                    <span className="text-[#8B95A8] font-mono text-xs">
                      {extractedText.length} characters
                    </span>
                  </div>
                </div>

                <HealthProfile
                  isDiabetic={isDiabetic}
                  allergies={allergies}
                  onDiabeticChange={setIsDiabetic}
                  onAllergiesChange={setAllergies}
                />
              </motion.div>

              <Button
                onClick={handleAnalyze}
                disabled={loading || !extractedText}
                size="lg"
                className="w-full bg-[#AAFF45] hover:bg-[#AAFF45] text-[#080B14] font-display font-bold rounded-xl shadow-lg disabled:opacity-30 disabled:cursor-not-allowed btn-glow text-lg py-7 relative overflow-hidden"
              >
                {loading ? (
                  <>
                    <div className="absolute inset-0 shimmer"></div>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin relative z-10" />
                    <span className="relative z-10">Analyzing Ingredients...</span>
                  </>
                ) : (
                  'Analyse Ingredients'
                )}
              </Button>
            </motion.div>
          )}

          {/* Step 3 - Results */}
          {currentStep === 3 && analysisResult && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                >
                  <span className="text-[#AAFF45] font-display font-bold text-lg">03</span>
                  <span className="text-white font-mono text-sm font-semibold">Results</span>
                </motion.div>
              </div>

              <div className="glass-card rounded-3xl p-10 border border-white/10 relative">
                <div className="gradient-border-top" />
                <ResultsPanel results={analysisResult} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-white/5 mt-20 backdrop-blur-xl bg-white/[0.01]"
      >
        <div className="max-w-6xl mx-auto px-8 py-8 text-center">
          <p className="text-[#8B95A8] font-mono text-sm">
            Powered by AI • FastAPI Backend • Built with React + Tailwind
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
