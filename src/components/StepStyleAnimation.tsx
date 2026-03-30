import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ImageIcon } from "lucide-react";

type Step =
  | "idle"
  | "showPrompt"
  | "generating"
  | "pixel1"
  | "pixel2"
  | "pixel3"
  | "complete"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 600 },
  { step: "showPrompt", duration: 1200 },
  { step: "generating", duration: 1800 },
  { step: "pixel1", duration: 1000 },
  { step: "pixel2", duration: 1000 },
  { step: "pixel3", duration: 1200 },
  { step: "complete", duration: 2000 },
  { step: "reset", duration: 500 },
];

export function StepStyleAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = SCRIPT[stepIndex].step;

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, SCRIPT[stepIndex].duration);
    return () => clearTimeout(timer);
  }, [stepIndex, active]);

  const isGenerating = currentStep === "generating";
  const isComplete = currentStep === "complete";
  const showImage = ["pixel1", "pixel2", "pixel3", "complete"].includes(currentStep);

  const imageOpacity = (() => {
    switch (currentStep) {
      case "pixel1": return 0.3;
      case "pixel2": return 0.6;
      case "pixel3": return 0.85;
      case "complete": return 1;
      default: return 0;
    }
  })();

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      <p className="text-[0.55em] text-body-desc font-medium leading-none">AI Image Generation</p>

      {/* Image generation area */}
      <div className="flex-1 min-h-0 rounded-[0.3em] border border-border/30 bg-muted/10 overflow-hidden relative flex items-center justify-center">
        {/* Placeholder */}
        {!showImage && !isGenerating && (
          <motion.div
            className="flex flex-col items-center gap-[6px]"
            animate={{ opacity: currentStep === "showPrompt" ? 0.6 : 0.3 }}
          >
            <ImageIcon className="w-[10%] h-[10%] min-w-5 min-h-5 text-body-desc/30" />
            <span className="text-[0.4em] text-body-desc/40">Image preview</span>
          </motion.div>
        )}

        {/* Loading state */}
        {isGenerating && (
          <motion.div
            className="flex flex-col items-center gap-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-[8%] h-[8%] min-w-5 min-h-5 text-primary animate-spin" />
            <span className="text-[0.42em] text-primary">Generating image...</span>
          </motion.div>
        )}

        {/* Generated image (gradient simulation) */}
        {showImage && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageOpacity }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-amber-300/80 via-orange-400/60 to-purple-500/70 relative">
              {/* Mountain silhouette */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%]">
                <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0 80 L30 30 L60 55 L100 15 L140 45 L170 25 L200 50 L200 80 Z" fill="hsl(var(--title) / 0.3)" />
                </svg>
              </div>
              {/* Sun */}
              <motion.div
                className="absolute top-[20%] right-[25%] w-[15%] aspect-square rounded-full bg-yellow-300/80"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Lake reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-blue-400/30 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Status bar */}
      <motion.div
        className="w-full h-[13%] rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: isComplete
            ? "linear-gradient(135deg, hsl(var(--theme1)), hsl(var(--primary)))"
            : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
        }}
        animate={{ scale: isComplete ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isComplete ? (
          <motion.div
            className="flex items-center gap-[4px]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Check className="w-[0.5em] h-[0.5em] text-white" />
            <span className="text-[0.5em] font-semibold text-white">Image Ready</span>
          </motion.div>
        ) : isGenerating ? (
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-white/80"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        ) : (
          <span className="text-[0.5em] font-semibold text-white">Generate Image</span>
        )}
      </motion.div>
    </div>
  );
}
