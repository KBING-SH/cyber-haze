import { useState, useEffect } from "react";
import { ImageIcon, Palette, Wand2, Layers, Sparkles } from "lucide-react";

const TOPICS = [
  { icon: ImageIcon, label: "Realistic", color: "text-primary" },
  { icon: Palette, label: "Artistic", color: "text-theme1" },
  { icon: Wand2, label: "Fantasy", color: "text-primary" },
  { icon: Layers, label: "3D Render", color: "text-theme1" },
  { icon: Sparkles, label: "Anime", color: "text-primary" },
];

const SAMPLE_PROMPTS = [
  "A sunset over mountains 🌄",
  "Cyberpunk city at night 🌃",
  "Watercolor flower garden 🌸",
  "Cute cat in space suit 🐱",
  "Fantasy castle in clouds ☁️",
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
        {/* Animated prompt */}
        <div className="relative h-16 flex items-center justify-center">
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <span
              key={prompt}
              className={`absolute text-2xl md:text-3xl font-bold text-title transition-all duration-500 ${
                activeIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {prompt}
            </span>
          ))}
        </div>

        {/* Style chips */}
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
          Describe your idea or upload a reference image to get started
        </p>
      </div>
    </div>
  );
}
