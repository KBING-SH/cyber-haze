import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Check, Copy, BookOpen } from "lucide-react";

type Step =
  | "idle"
  | "showResult"
  | "moveToCopy"
  | "clickCopy"
  | "copied"
  | "moveToPractice"
  | "clickPractice"
  | "showPractice"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 500 },
  { step: "showResult", duration: 1200 },
  { step: "moveToCopy", duration: 500 },
  { step: "clickCopy", duration: 200 },
  { step: "copied", duration: 1200 },
  { step: "moveToPractice", duration: 500 },
  { step: "clickPractice", duration: 200 },
  { step: "showPractice", duration: 2500 },
  { step: "reset", duration: 600 },
];

const COPY_POS: [number, number] = [30, 88];
const PRACTICE_POS: [number, number] = [70, 88];

const SOLUTION_LINES = [
  { label: "Problem:", text: "2x² + 5x - 3 = 0" },
  { label: "Step 1:", text: "a=2, b=5, c=-3" },
  { label: "Step 2:", text: "Δ = 25 + 24 = 49" },
  { label: "Answer:", text: "x₁ = 0.5, x₂ = -3" },
];

export function StepDownloadAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState<[number, number]>([50, 50]);
  const [cursorVisible, setCursorVisible] = useState(false);

  const currentStep = SCRIPT[stepIndex].step;

  useEffect(() => {
    switch (currentStep) {
      case "idle":
        setCursorVisible(false);
        setCursorPos([50, 50]);
        break;
      case "showResult":
        setCursorVisible(true);
        break;
      case "moveToCopy":
        setCursorPos(COPY_POS);
        break;
      case "moveToPractice":
        setCursorPos(PRACTICE_POS);
        break;
      case "reset":
        setCursorVisible(false);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, SCRIPT[stepIndex].duration);

    return () => clearTimeout(timer);
  }, [stepIndex, currentStep, active]);

  const showResult = currentStep !== "idle" && currentStep !== "reset";
  const showCopied = ["copied", "moveToPractice", "clickPractice", "showPractice"].includes(currentStep);
  const showPractice = currentStep === "showPractice";

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      {/* Solution result */}
      <div className="flex-1 min-h-0 flex flex-col gap-[3px]">
        <span className="text-[0.45em] text-body-desc">Solution Review</span>
        <motion.div
          className="flex-1 rounded-[0.3em] overflow-hidden border border-border/30 min-h-0 relative bg-muted/10 p-[4%] flex flex-col gap-[5%]"
          animate={{ opacity: showResult ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          {showResult ? (
            <>
              {SOLUTION_LINES.map((line, i) => (
                <div key={i} className="flex gap-[4px]">
                  <span className="text-[0.38em] font-semibold text-primary whitespace-nowrap">{line.label}</span>
                  <span className="text-[0.38em] font-mono text-title">{line.text}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[0.45em] text-body-desc">Waiting for solution...</span>
            </div>
          )}

          {/* Practice overlay */}
          <AnimatePresence>
            {showPractice && (
              <motion.div
                className="absolute inset-0 bg-card/95 flex flex-col items-center justify-center gap-[6%] p-[6%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BookOpen className="w-[8%] h-[8%] text-primary" />
                <span className="text-[0.42em] font-semibold text-title">Practice Problem</span>
                <span className="text-[0.38em] font-mono text-body-desc text-center">3x² - 7x + 2 = 0</span>
                <span className="text-[0.32em] text-body-desc">Try solving this one!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-[4%] shrink-0 relative">
        {/* Copy button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card"
          animate={{
            borderColor: currentStep === "clickCopy" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickCopy" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {showCopied ? (
            <motion.div className="flex items-center gap-[3px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Check className="w-[0.6em] h-[0.6em] text-primary" />
              <span className="text-[0.4em] text-primary font-medium">Copied</span>
            </motion.div>
          ) : (
            <>
              <Copy className="w-[0.5em] h-[0.5em] text-body-desc" />
              <span className="text-[0.4em] text-body-desc">Copy</span>
            </>
          )}
        </motion.div>

        {/* Practice button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card"
          animate={{
            borderColor: currentStep === "clickPractice" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickPractice" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <>
            <BookOpen className="w-[0.5em] h-[0.5em] text-body-desc" />
            <span className="text-[0.4em] text-body-desc">Practice</span>
          </>
        </motion.div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-30 pointer-events-none"
        animate={{
          left: `${cursorPos[0]}%`,
          top: `${cursorPos[1]}%`,
          opacity: cursorVisible ? 0.9 : 0,
        }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
