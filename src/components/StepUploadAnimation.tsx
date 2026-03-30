import { motion } from "framer-motion";
import { Upload, Check, Type } from "lucide-react";

const CYCLE = 6.5;

export function StepUploadAnimation({ active = true }: { active?: boolean }) {
  if (!active) {
    return (
      <div className="w-full h-full bg-card flex items-center justify-center">
        <div className="w-full h-full flex flex-col p-[8%] gap-[4%]">
          <p className="text-[0.65em] text-body-desc font-medium leading-none">Describe your image</p>
          <div className="relative flex-1 rounded-lg border border-border/40 bg-muted/10 p-[4%] flex items-start min-h-0">
            <span className="text-[0.5em] text-body-desc/40">Type your image idea...</span>
          </div>
          <div className="flex flex-col gap-[3%]">
            <p className="text-[0.55em] text-body-desc leading-none">Reference (optional)</p>
            <div className="h-[2.5em] rounded-md border-2 border-dashed border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]">
              <Upload className="w-[0.5em] h-[0.5em] text-body-desc/40" />
              <span className="text-[0.45em] text-body-desc/40">Upload reference image</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typingText = "A sunset over mountains with golden light reflecting on a calm lake";

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex items-center justify-center">
      <div className="w-full h-full flex flex-col p-[8%] gap-[4%]">
        <p className="text-[0.65em] text-body-desc font-medium leading-none">Describe your image</p>
        <div className="relative flex-1 rounded-lg border border-border/40 bg-muted/10 p-[4%] flex items-start min-h-0 overflow-hidden">
          {/* Placeholder fading out */}
          <motion.span
            className="text-[0.5em] text-body-desc/40 absolute"
            animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 1] }}
            transition={{ duration: CYCLE, times: [0, 0.15, 0.2, 0.4, 0.6, 0.85, 0.93, 1], repeat: Infinity }}
          >
            Type your image idea...
          </motion.span>

          {/* Typing text appearing */}
          <motion.span
            className="text-[0.48em] text-title leading-relaxed"
            animate={{ opacity: [0, 0, 1, 1, 1, 1, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.18, 0.25, 0.5, 0.7, 0.88, 0.93, 1], repeat: Infinity }}
          >
            {typingText}
          </motion.span>

          {/* Typing cursor */}
          <motion.div
            className="absolute right-[6%] top-[20%] w-[2px] h-[0.8em] bg-primary"
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        <div className="flex flex-col gap-[3%]">
          <motion.div
            className="flex items-center gap-1 h-[1.2em]"
            animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.3, 0.5, 0.55, 0.85, 0.93, 1], repeat: Infinity }}
          >
            <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-2 h-2 text-primary" />
            </div>
            <span className="text-[0.5em] text-primary leading-none">Prompt ready</span>
          </motion.div>
          <p className="text-[0.55em] text-body-desc leading-none">Reference (optional)</p>
          <div className="h-[2.5em] rounded-md border-2 border-dashed border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]">
            <Upload className="w-[0.5em] h-[0.5em] text-body-desc/40" />
            <span className="text-[0.45em] text-body-desc/40">Upload reference image</span>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute w-4 h-4 z-10"
        style={{ top: "30%", right: "20%" }}
        animate={{ x: [20, 20, 20, 0, 0, 0, 0, 20], y: [-20, -20, -20, 10, 10, 10, 10, -20], opacity: [0, 0, 0.9, 0.9, 0.9, 0, 0, 0] }}
        transition={{ duration: CYCLE, times: [0, 0.2, 0.28, 0.46, 0.5, 0.55, 0.8, 1], repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
