import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Maria Gonzalez",
    role: "Freelance Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "Creating free images with AI has changed how I handle visuals for my blog. I can start with a short idea and get original images that fit my content direction well. It has become a useful way to build visuals without spending extra time on manual design work.",
    rating: "4.9/5",
  },
  {
    name: "David Kim",
    role: "Social Media Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "Creating free images with AI has been useful for my social media work. I can try different text ideas and generate visuals that match different post directions. It gives me a steady way to build image options when I need fresh content.",
    rating: "5.0/5",
  },
  {
    name: "Aisha Patel",
    role: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "Using free AI to create images helps me keep my marketing materials visually consistent. I can describe what I need and generate images that are closer to my ideas. The process feels clear and manageable even without a design background.",
    rating: "4.8/5",
  },
  {
    name: "Lars Jensen",
    role: "Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "I've tried free AI image creation tools and found them useful for early concept exploration. Starting from text ideas helps me test visual directions before moving into more detailed design work. It has become a practical part of brainstorming.",
    rating: "4.9/5",
  },
  {
    name: "Sophie Martin",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "Creating free images with AI has made content planning smoother for me. I can turn simple ideas into visuals and compare different directions before choosing one. It gives me more flexibility when I need images for new projects.",
    rating: "5.0/5",
  },
  {
    name: "Kenji Tanaka",
    role: "Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "The option to create free images with AI fits well with my daily work. I can generate visuals from short descriptions and adjust the prompt when I want a different result. It gives me a useful way to explore image ideas without slowing down my workflow.",
    rating: "4.9/5",
  },
  {
    name: "Elena Petrova",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "For school projects, creating free images with AI has been helpful. I can describe a concept and get visuals that make presentations feel more complete. It gives me another way to present ideas when I want something more visual than plain text.",
    rating: "4.8/5",
  },
  {
    name: "Michael O'Connor",
    role: "Blogger",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "I like using AI to create free images because it lets me turn written ideas into visuals quickly. It's especially useful when I want something original for a post and need to try more than one creative direction. The process feels direct and easy to work with.",
    rating: "5.0/5",
  },
  {
    name: "Priya Singh",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "Creating free images with AI has added a useful step to my creative process. I can begin with a concept, test different prompt wording, and see how the visual changes. It gives me more room to explore before I move into deeper editing work.",
    rating: "4.9/5",
  },
  {
    name: "Carlos Ramirez",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "I use free AI image creation tools to build visuals for my website and content plans. Starting from text ideas makes it easier to generate images that match different directions I want to test. It has been a practical option for creating visuals without extra complexity.",
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
          Sample feedback from users who tried Rita's AI image generator for creating free images.
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}