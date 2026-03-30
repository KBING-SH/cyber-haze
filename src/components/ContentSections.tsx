import { useState, useEffect } from "react";
import { ImageIcon, Type, Lightbulb, ImagePlus, PenTool, ChevronRight } from "lucide-react";
import sectionTextToImage from "@/assets/section-text-to-image.webp";
import sectionAiText from "@/assets/section-ai-text.webp";
import sectionIdeas from "@/assets/section-ideas.webp";
import sectionReference from "@/assets/section-reference.webp";
import sectionPrompts from "@/assets/section-prompts.webp";

const sections = [
  {
    icon: ImageIcon,
    title: "Create Free Images with AI Online",
    subtitle: "Turn text ideas into visuals online",
    image: sectionTextToImage,
    paragraphs: [
      "To create free images with AI, you can start with a text idea and turn it into a new visual online. This gives you a simple way to explore image creation for different concepts, moods, and styles without relying on complex design tools.",
      "By entering a clear description, you can guide the image result in a more direct way. It offers a practical way to turn words into visuals and explore new image ideas as you refine your prompt.",
    ],
    imageFirst: true,
  },
  {
    icon: Type,
    title: "AI Image Creation from Text",
    subtitle: "Describe what you want in text",
    image: sectionAiText,
    paragraphs: [
      "Creating free images with AI becomes more flexible when you describe what you want in text. This lets the tool generate visuals based on your idea, making the process more focused on image creation rather than manual editing.",
      "Text-based image generation works well when you want to try different visual directions from the same idea. Small prompt changes can lead to different results, which makes the process useful for exploring variations.",
    ],
    imageFirst: false,
  },
  {
    icon: Lightbulb,
    title: "AI Image Generator for Different Ideas",
    subtitle: "Explore concepts as visuals",
    image: sectionIdeas,
    paragraphs: [
      "An AI image generator helps you create free images with AI from simple written ideas. You describe a scene, object, or concept, and the tool turns that input into a visual, giving you a direct starting point for creative work.",
      "This is useful when you want to explore new directions without building an image from scratch by hand. It offers a straightforward way to test concepts and see how different ideas look as images.",
    ],
    imageFirst: true,
  },
  {
    icon: ImagePlus,
    title: "Reference Images for Better Direction",
    subtitle: "Guide results with visual references",
    image: sectionReference,
    paragraphs: [
      "Creating free images with AI can also involve using a reference image to guide the result. This adds visual direction to the generation process and can help shape the style, composition, or overall feel of the final image.",
      "A reference image works best as supporting input rather than the main focus of the page. It gives the AI a clearer starting point while keeping image generation centered on the idea you want to create.",
    ],
    imageFirst: false,
  },
  {
    icon: PenTool,
    title: "Writing Better AI Image Prompts",
    subtitle: "Refine prompts for better results",
    image: sectionPrompts,
    paragraphs: [
      "When you create free images with AI, the wording of your prompt can affect the final result. A clearer prompt gives the tool more direction, which can make the output closer to the image idea you have in mind.",
      "You can adjust your wording to explore different versions of the same concept. This gives you a simple way to refine image generation while keeping the creative process focused on your original idea.",
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
                <div className="rounded-xl overflow-hidden border border-border/30">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                    width="800"
                    height="608"
                    draggable={false}
                  />
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
        👆 Describe your image idea here to get started
      </div>
    </div>
  );
}