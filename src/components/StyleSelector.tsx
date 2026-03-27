import { useState, useEffect } from "react";
import { Calculator, BookOpen, TrendingUp, Sigma, PieChart } from "lucide-react";

const TOPICS = [
  { icon: Calculator, label: "Algebra", color: "text-primary" },
  { icon: BookOpen, label: "Geometry", color: "text-theme1" },
  { icon: TrendingUp, label: "Calculus", color: "text-primary" },
  { icon: Sigma, label: "Statistics", color: "text-theme1" },
  { icon: PieChart, label: "Probability", color: "text-primary" },
];

const SAMPLE_EQUATIONS = [
  "2x² + 5x - 3 = 0",
  "∫ sin(x) dx = ?",
  "d/dx [x³ + 2x]",
  "P(A∪B) = ?",
  "lim x→0 sin(x)/x",
];

export function StyleSelector() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TOPICS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl xl:rounded-[32px] border border-border/50 bg-card shadow-soft overflow-hidden h-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="text-center space-y-6 max-w-md">
        {/* Animated equation */}
        <div className="relative h-16 flex items-center justify-center">
          {SAMPLE_EQUATIONS.map((eq, i) => (
            <span
              key={eq}
              className={`absolute text-2xl md:text-3xl font-mono font-bold text-title transition-all duration-500 ${
                activeIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {eq}
            </span>
          ))}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TOPICS.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-medium ${
                  activeIdx === i
                    ? "border-primary/40 bg-primary/10 text-primary scale-105"
                    : "border-border/50 bg-muted/50 text-body-desc"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-body-desc">
          Type a question or upload an image to get started
        </p>
      </div>
    </div>
  );
}
