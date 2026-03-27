import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What are AI math tools and how do they work?",
    a: "AI math tools help users work through math problems by analyzing a typed or uploaded question and returning clearer answers with step-by-step guidance. They are often used for topics such as algebra, geometry, calculus, and statistics.",
  },
  {
    q: "What is an AI math tool best suited for solving various math problems?",
    a: "An AI math tool like Rita is useful for working through different kinds of math questions by letting users type or upload problems and review answers with clearer explanations. This makes it a practical option for study, homework, and review.",
  },
  {
    q: "Can AI math solvers provide step-by-step solutions?",
    a: "Yes, AI math tools can provide step-by-step solutions. This kind of guidance helps users follow the method behind the answer instead of only seeing the final result.",
  },
  {
    q: "Is it possible for an AI math tool to solve problems from images?",
    a: "Yes, AI math tools like Rita can support uploaded questions, including screenshots or images of math problems. This gives users another way to enter a question and review the solution.",
  },
  {
    q: "What is the purpose of an AI math problem generator?",
    a: "An AI math problem generator helps educators prepare practice questions based on a topic or concept. This supports lesson planning and gives students more focused material for review.",
  },
  {
    q: "Can AI math word problem generators create problems for different skill levels?",
    a: "AI math problem generators can be used to create practice that fits different lesson goals and study levels. This makes them useful when teachers want more targeted review material.",
  },
  {
    q: "How can students use AI math tools for learning and homework support?",
    a: "Students can use AI math tools to type or upload questions and receive answers with clearer explanations. This helps them review each step more carefully during homework and study.",
  },
  {
    q: "Can AI math tools assist with probability and statistics problems?",
    a: "Yes, AI math tools can assist with statistics problems by providing clearer solutions and step-by-step guidance. This makes statistics easier to review and understand during study sessions.",
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
