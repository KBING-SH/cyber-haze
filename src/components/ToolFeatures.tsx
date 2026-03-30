import { ImageIcon, Type, Upload, Ratio, PenTool, Gift } from "lucide-react";

const features = [
  { icon: ImageIcon, text: "Turn text descriptions into original images with AI-powered generation." },
  { icon: Type, text: "Use a reference image to guide the visual style and composition of results." },
  { icon: Upload, text: "Supports JPG, PNG, and WEBP uploads up to 20 MB for reference input." },
  { icon: Ratio, text: "Choose from multiple aspect ratios including 1:1, 16:9, 9:16, 4:3, and more." },
  { icon: PenTool, text: "Adjust prompt wording to explore different visual directions from the same idea." },
  { icon: Gift, text: "Claim 60 free credits daily — each image generation costs 10 credits." },
];

export function ToolFeatures() {
  return (
    <section className="py-8 md:py-12 bg-background" aria-labelledby="tool-features-title">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <h2 id="tool-features-title" className="text-xl md:text-2xl font-bold text-title text-center mb-6 md:mb-10">
          AI Image Generator — Key Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-4 rounded-xl border border-border/50 bg-card px-6 shadow-soft h-[120px]">
              <f.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm text-body2 leading-relaxed">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}