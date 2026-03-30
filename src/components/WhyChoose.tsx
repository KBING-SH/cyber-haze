import { Type, Palette, ImagePlus, Ratio, PenTool, Shield } from "lucide-react";

const features = [
  {
    icon: Type,
    title: "Text to Image",
    desc: "Describe your idea in words and let AI turn it into a visual. A direct way to create images from concepts.",
    accent: "from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    stat: "✨",
    statLabel: "Create",
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    desc: "Explore different visual styles from the same prompt. One idea, many creative directions.",
    accent: "from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    iconBg: "bg-gradient-to-br from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    stat: "8+",
    statLabel: "Styles",
  },
  {
    icon: ImagePlus,
    title: "Reference Support",
    desc: "Upload a reference image to guide style, composition, and overall feel of the result.",
    accent: "from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    iconBg: "bg-gradient-to-br from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    stat: "📷",
    statLabel: "Upload",
  },
  {
    icon: Ratio,
    title: "Flexible Ratios",
    desc: "Choose from multiple aspect ratios to match your content needs — social posts, banners, and more.",
    accent: "from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    stat: "10+",
    statLabel: "Ratios",
  },
  {
    icon: PenTool,
    title: "Prompt Refinement",
    desc: "Adjust your wording to explore variations. Small changes can lead to different visual results.",
    accent: "from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    stat: "✏️",
    statLabel: "Refine",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    desc: "We prioritize user privacy during image generation. Uploaded images are handled according to Rita's privacy policy.",
    accent: "from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    iconBg: "bg-gradient-to-br from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    stat: "✓",
    statLabel: "Privacy",
  },
];

export function WhyChoose() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          Why Choose Rita
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center mb-8 md:mb-14 max-w-xl mx-auto">
          Powerful AI + simple workflow — making image creation accessible to everyone
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-card border border-border/40 p-4 md:p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${f.iconBg} flex items-center justify-center shadow-md shrink-0`}>
                    <f.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-title">{f.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xl font-bold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent`}>
                    {f.stat}
                  </div>
                  <div className="text-[11px] text-body-desc">{f.statLabel}</div>
                </div>
              </div>
              <p className="text-sm text-body-desc leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}