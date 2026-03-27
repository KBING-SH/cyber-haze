import { useState, useEffect } from "react";
import { Brain, Calculator, BookOpen, BarChart3, PieChart, ChevronRight } from "lucide-react";

const sections = [
  {
    icon: Brain,
    title: "AI Math Learning Support",
    subtitle: "Clearer explanations and step-by-step guidance",
    paragraphs: [
      "An AI math tool helps users work through math topics with clearer explanations and step-by-step guidance. By focusing on common areas such as algebra, geometry, calculus, and statistics, it supports learning in a more direct and practical way.",
      "With this approach, users can connect each answer to the underlying method instead of only viewing the result. They can type a question or upload a screenshot or image to see how the problem is solved in practice.",
    ],
    imageFirst: true,
  },
  {
    icon: Calculator,
    title: "Smart Solve AI Features",
    subtitle: "Type or upload problems for clearer steps",
    paragraphs: [
      "An AI math tool like Rita helps students work through math questions by typing or uploading problems from different topics. It gives answers with clearer steps, making it easier to follow the logic without leaving the study flow.",
      "Using Rita feels like having steady support during homework or review. It supports learning by giving explanations that make each step easier to follow.",
    ],
    imageFirst: false,
  },
  {
    icon: BookOpen,
    title: "Custom AI Math Problem Maker",
    subtitle: "Generate practice questions for any topic",
    paragraphs: [
      "An AI math tool can also support educators when preparing practice materials. By using an AI math problem maker, teachers can enter a topic or concept and receive practice questions that fit lesson goals and classroom review.",
      "With this approach, instructors can prepare more varied exercises while keeping the work focused on the topic being taught. It adds useful support when building math practice for class.",
    ],
    imageFirst: true,
  },
  {
    icon: BarChart3,
    title: "Statistics AI Calculator Features",
    subtitle: "Step-by-step statistics guidance",
    paragraphs: [
      "An AI math tool like this also supports statistics questions with step-by-step guidance. It helps users follow the process behind the numbers, making statistics easier to study and review.",
      "This works well for students who want to understand how an answer is formed instead of only seeing the final result. It gives extra support during study sessions and homework review.",
    ],
    imageFirst: false,
  },
  {
    icon: PieChart,
    title: "Statistics Answers AI Tool",
    subtitle: "Clearer solutions for statistics questions",
    paragraphs: [
      "An AI math tool offers a direct way to work through statistics questions with clearer solutions. After entering a problem, this AI math tool analyzes it and returns answers in a way that is easier to follow.",
      "With this approach, users can review the method step by step and build a steadier understanding of statistics. It serves as practical support for homework, review, and general study.",
    ],
    imageFirst: true,
  },
];

export function ContentSections({ onSelectStyle }: { onSelectStyle?: (styleIndex: number) => void }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const checkScrollDone = () => {
      if (window.scrollY <= 5) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      } else {
        requestAnimationFrame(checkScrollDone);
      }
    };
    requestAnimationFrame(checkScrollDone);
  };

  return (
    <>
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="space-y-6 md:space-y-8 py-8 md:py-12">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 space-y-6 md:space-y-8">
          {sections.map((section, i) => (
            <article
              key={i}
              className={`rounded-2xl border border-border/50 bg-card shadow-soft p-5 md:p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-[60px] ${
                section.imageFirst ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Icon illustration area */}
              <div className="w-full lg:w-[45%] shrink-0">
                <div className="rounded-xl overflow-hidden bg-muted/30 border border-border/30 flex items-center justify-center py-12 md:py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                      <section.icon className="h-10 w-10 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-body-desc">{section.subtitle}</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[55%] space-y-5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">
                    <section.icon className="h-3.5 w-3.5" />
                    <span>{section.subtitle}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-title leading-tight tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base md:text-lg text-body2 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleTryNow}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-primary text-primary-foreground text-base font-semibold transition-all hover:opacity-90 hover:shadow-lg group"
                  >
                    <span>Try it now</span>
                    <ChevronRight className="h-4 w-4 text-primary-foreground/70 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function UploadTooltip() {
  const [pos, setPos] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("#upload-drop-zone"));
    const el = candidates.find((node) => {
      const rect = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });

    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }
  }, []);

  if (!pos) return null;

  return (
    <div
      className="absolute animate-fade-in flex items-center justify-center"
      style={{ top: pos.top, left: pos.left, width: pos.width, height: pos.height }}
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-[bounce_1s_ease-in-out_3]">
        👆 Upload your math problem here to get started
      </div>
    </div>
  );
}
