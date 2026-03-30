import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How can I create free images with AI online?",
    a: "You can create free images with AI online by entering a text description and letting the tool generate a visual based on your idea. Some tools may also support a reference image as additional input.",
  },
  {
    q: "Can I create free images with AI from text?",
    a: "Yes, you can create free images with AI from text by describing the scene, object, or concept you want to generate. The tool uses that written input to create a new image.",
  },
  {
    q: "What is a simple way to generate free images with AI?",
    a: "A simple way to generate free images with AI is to start with a clear text prompt. This gives the tool direct input and helps guide the image result more effectively.",
  },
  {
    q: "Can I make free images with AI for different ideas?",
    a: "Yes, you can make free images with AI for different ideas by changing the prompt wording and trying different concepts. This allows you to explore multiple visual directions from simple text input.",
  },
  {
    q: "Can a reference image help when creating free AI images?",
    a: "Yes, a reference image can help guide the result when creating free AI images. It works as supporting input that helps shape the visual direction of the generated image.",
  },
  {
    q: "How does free AI image generation work?",
    a: "Free AI image generation works by taking text input, and in some cases a reference image, and turning that information into a new visual result. The wording of the prompt can influence how the image turns out.",
  },
  {
    q: "What should I enter to create free images with AI?",
    a: "You can enter a text description of the image you want to create. A clearer prompt usually gives the tool better direction for generating the visual result.",
  },
  {
    q: "Why does prompt wording matter in AI image generation?",
    a: "Prompt wording matters because it affects how the tool interprets your idea. Small wording changes can lead to different image results, which makes prompt writing part of the creative process.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8 md:py-12" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-title">FAQ</h2>
        </div>

        <div className="max-w-[750px] mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl bg-card shadow-sm transition-all duration-200 border border-border/60 border-l-[3px]",
                  isOpen ? "border-l-primary shadow-md" : "border-l-transparent hover:border-l-primary/40"
                )}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                >
                  <span
                    itemProp="name"
                    className={cn(
                      "text-base font-semibold transition-colors",
                      isOpen ? "text-title" : "text-title group-hover:text-primary"
                    )}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p itemProp="text" className="px-6 pb-5 text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}