import { Calculator, BookOpen, Camera, BarChart3, Sparkles, Gift } from "lucide-react";

const features = [
  { icon: Calculator, text: "Solve algebra, geometry, calculus, and statistics problems with step-by-step guidance." },
  { icon: BookOpen, text: "Type a question or upload a screenshot to get clearer explanations for any math topic." },
  { icon: Camera, text: "Upload images of equations or problems — supports JPG, PNG, and WEBP formats." },
  { icon: BarChart3, text: "Statistics support with step-by-step solutions for probability, distributions, and more." },
  { icon: Sparkles, text: "AI math problem maker generates practice questions tailored to lesson goals." },
  { icon: Gift, text: "Claim 60 free credits daily — each math solve costs 10 credits." },
];

export function ToolFeatures() {
  return (
    <section className="py-8 md:py-12 bg-background" aria-labelledby="tool-features-title">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <h2 id="tool-features-title" className="text-xl md:text-2xl font-bold text-title text-center mb-6 md:mb-10">
          AI Math Tool — Key Features
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
