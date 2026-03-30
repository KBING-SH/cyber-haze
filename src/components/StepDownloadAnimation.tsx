import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Share2 } from "lucide-react";

type Step =
  | "idle"
  | "showResult"
  | "moveToDownload"
  | "clickDownload"
  | "downloaded"
  | "moveToShare"
  | "clickShare"
  | "shared"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 500 },
  { step: "showResult", duration: 1200 },
  { step: "moveToDownload", duration: 500 },
  { step: "clickDownload", duration: 200 },
  { step: "downloaded", duration: 1500 },
  { step: "moveToShare", duration: 500 },
  { step: "clickShare", duration: 200 },
  { step: "shared", duration: 2500 },
  { step: "reset", duration: 600 },
];

const DL_POS: [number, number] = [30, 88];
const SHARE_POS: [number, number] = [70, 88];

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
      case "moveToDownload":
        setCursorPos(DL_POS);
        break;
      case "moveToShare":
        setCursorPos(SHARE_POS);
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
  const showDownloaded = ["downloaded", "moveToShare", "clickShare", "shared"].includes(currentStep);
  const showShared = currentStep === "shared";

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      {/* Image result */}
      <div className="flex-1 min-h-0 flex flex-col gap-[3px]">
        <span className="text-[0.45em] text-body-desc">Generated Image</span>
        <motion.div
          className="flex-1 rounded-[0.3em] overflow-hidden border border-border/30 min-h-0 relative"
          animate={{ opacity: showResult ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          {showResult ? (
            <div className="w-full h-full bg-gradient-to-br from-amber-300/80 via-orange-400/60 to-purple-500/70 relative">
              <div className="absolute bottom-0 left-0 right-0 h-[40%]">
                <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0 80 L30 30 L60 55 L100 15 L140 45 L170 25 L200 50 L200 80 Z" fill="hsl(var(--title) / 0.3)" />
                </svg>
              </div>
              <div className="absolute top-[20%] right-[25%] w-[15%] aspect-square rounded-full bg-yellow-300/80" />
              <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-blue-400/30 to-transparent" />
              
              {/* Quality badge */}
              <div className="absolute top-[6%] left-[6%] bg-card/80 rounded px-[4%] py-[2%]">
                <span className="text-[0.35em] font-medium text-title">HD Quality</span>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
              <span className="text-[0.45em] text-body-desc">Waiting for image...</span>
            </div>
          )}

          {/* Share overlay */}
          <AnimatePresence>
            {showShared && (
              <motion.div
                className="absolute inset-0 bg-card/90 flex flex-col items-center justify-center gap-[6%] p-[6%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="w-[8%] h-[8%] text-primary" />
                <span className="text-[0.42em] font-semibold text-title">Link Copied!</span>
                <span className="text-[0.35em] text-body-desc text-center">Share your AI image anywhere</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-[4%] shrink-0 relative">
        {/* Download button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card"
          animate={{
            borderColor: currentStep === "clickDownload" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickDownload" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {showDownloaded ? (
            <motion.div className="flex items-center gap-[3px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Check className="w-[0.6em] h-[0.6em] text-primary" />
              <span className="text-[0.4em] text-primary font-medium">Saved</span>
            </motion.div>
          ) : (
            <>
              <Download className="w-[0.5em] h-[0.5em] text-body-desc" />
              <span className="text-[0.4em] text-body-desc">Download</span>
            </>
          )}
        </motion.div>

        {/* Share button */}
        <motion.div
          className="flex-1 h-[2em] rounded-lg border border-border/50 flex items-center justify-center gap-[4px] bg-card"
          animate={{
            borderColor: currentStep === "clickShare" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
            scale: currentStep === "clickShare" ? 0.95 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <Share2 className="w-[0.5em] h-[0.5em] text-body-desc" />
          <span className="text-[0.4em] text-body-desc">Share</span>
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
