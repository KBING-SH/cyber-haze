import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Emily Carter",
    role: "High School Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "I've been using this AI math tool for a few weeks, and it has made difficult problems easier to follow. The step-by-step explanations help me understand ideas that used to feel confusing. It has become a useful part of my math homework routine.",
    rating: "4.9/5",
  },
  {
    name: "Rajesh Kumar",
    role: "College Engineering Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "This AI math tool is useful when I work through calculus and algebra problems. The detailed steps make it easier to follow the reasoning behind each solution, which matters for my coursework. It gives me solid study support when I need to review a problem carefully.",
    rating: "5.0/5",
  },
  {
    name: "Sofia Martinez",
    role: "Middle School Teacher",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "As a teacher, I find this AI math tool useful for giving students clearer explanations and extra practice. It helps me prepare questions and reinforce lessons in a more focused way. Being able to upload problems and review solutions saves time during lesson planning.",
    rating: "4.8/5",
  },
  {
    name: "Liam O'Connor",
    role: "University Student",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "Using this AI math tool has made statistics problems feel more manageable. The step-by-step guidance makes the concepts easier to follow and less overwhelming during exam review. It's a dependable study resource when I need extra support.",
    rating: "4.9/5",
  },
  {
    name: "Mei Lin",
    role: "High School Math Tutor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "This AI math tool works well as extra support during tutoring sessions. It gives clear solutions that I can review with my students, and the explanations make it easier for them to understand each step. It fits naturally into regular math practice.",
    rating: "5.0/5",
  },
  {
    name: "David Johnson",
    role: "College Student",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "I find this AI math tool useful for checking my work and reviewing different ways to solve a problem. Uploading an image of an equation is convenient, and the explanations make it easier to learn from mistakes instead of only checking the answer.",
    rating: "4.8/5",
  },
  {
    name: "Amina Hassan",
    role: "STEM Professional",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "In my STEM work, I appreciate how this AI math tool handles topics like linear algebra and differential equations. The step-by-step solutions are clear and practical, which makes it useful when I need to revisit a concept or review a method.",
    rating: "4.9/5",
  },
  {
    name: "Carlos Diaz",
    role: "High School Student",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "This AI math tool has changed how I approach math problems. The explanations are straightforward and make it easier to understand the reasoning behind each step. It gives me useful support whenever I get stuck during homework.",
    rating: "5.0/5",
  },
  {
    name: "Hana Lee",
    role: "College Mathematics Major",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "The AI math tool breaks down harder problems into clearer steps, which supports my learning. It helps me review different methods for solving equations and gives me a better grasp of the process. It has been useful during exam preparation.",
    rating: "4.9/5",
  },
  {
    name: "Michael Thompson",
    role: "High School Student",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "I've tried several math tools, and this AI math tool stands out for its clear explanations and steady support. It helps me work through algebra and geometry problems in a way that feels easier to follow. Over time, it has helped me feel more confident in class.",
    rating: "4.8/5",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const { scrollRef, handlers } = useDraggableMarquee();

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-grab active:cursor-grabbing select-none touch-none scrollbar-hide"
      {...handlers}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-3 md:gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ willChange: "transform" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            className="w-[260px] md:w-[380px] shrink-0 rounded-xl md:rounded-2xl border border-border/50 bg-card p-3 md:p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <figure>
              <blockquote className="text-xs md:text-sm text-body2 leading-relaxed md:leading-[1.75] mb-2 md:mb-4 line-clamp-3">
                "{t.content}"
              </blockquote>
              <figcaption className="flex items-center gap-2 md:gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name}, ${t.role}`}
                  className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                  loading="lazy"
                  width="36"
                  height="36"
                  draggable={false}
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-title leading-snug">
                    {t.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-body-desc">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="py-8 md:py-12 overflow-hidden"
      aria-labelledby="user-feedback-title"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 mb-6 md:mb-12">
        <h2 id="user-feedback-title" className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          What Users Say
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center max-w-lg mx-auto">
          Sample feedback from users who tried Rita's AI math tool for learning and problem solving.
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
