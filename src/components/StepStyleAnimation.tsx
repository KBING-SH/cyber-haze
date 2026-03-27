import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

// Simulates AI analyzing and solving the math problem step by step
const SOLUTION_STEPS = [
  "2x² + 5x - 3 = 0",
  "Using quadratic formula:",
  "x = (-5 ± √(25+24)) / 4",
  "x = (-5 ± 7) / 4",
  "x₁ = 0.5,  x₂ = -3",
];

type Step =
  | "idle"
  | "showProblem"
  | "analyzing"
  | "step1"
  | "step2"
  | "step3"
  | "step4"
  | "complete"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 600 },
  { step: "showProblem", duration: 1200 },
  { step: "analyzing", duration: 1500 },
  { step: "step1", duration: 1200 },
  { step: "step2", duration: 1200 },
  { step: "step3", duration: 1200 },
  { step: "step4", duration: 1500 },
  { step: "complete", duration: 1500 },
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

  const visibleSteps = (() => {
    switch (currentStep) {
      case "idle": return 0;
      case "showProblem": return 1;
      case "analyzing": return 1;
      case "step1": return 2;
      case "step2": return 3;
      case "step3": return 4;
      case "step4": return 5;
      case "complete": return 5;
      case "reset": return 0;
      default: return 0;
    }
  })();

  const isAnalyzing = currentStep === "analyzing";
  const isComplete = currentStep === "complete";

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      <p className="text-[0.55em] text-body-desc font-medium leading-none">AI Solution</p>

      {/* Solution area */}
      <div className="flex-1 min-h-0 rounded-[0.3em] border border-border/30 bg-muted/10 p-[4%] flex flex-col gap-[4%] overflow-hidden">
        {SOLUTION_STEPS.map((line, i) => (
          <motion.div
            key={i}
            className={`text-[0.42em] font-mono leading-relaxed ${
              i === 0 ? "font-semibold text-title" : "text-body-desc"
            }`}
            initial={{ opacity: 0, x: -5 }}
            animate={{
              opacity: i < visibleSteps ? 1 : 0,
              x: i < visibleSteps ? 0 : -5,
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {i === 0 ? (
              <span className="text-primary">{line}</span>
            ) : (
              line
            )}
          </motion.div>
        ))}

        {/* Loading indicator */}
        {isAnalyzing && (
          <motion.div
            className="flex items-center gap-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-[0.5em] h-[0.5em] text-primary animate-spin" />
            <span className="text-[0.4em] text-primary">Solving...</span>
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
            <span className="text-[0.5em] font-semibold text-white">Solution Complete</span>
          </motion.div>
        ) : isAnalyzing ? (
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
          <span className="text-[0.5em] font-semibold text-white">Get Answer</span>
        )}
      </motion.div>
    </div>
  );
}
