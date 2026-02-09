import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Digital Marketer",
      content: "I used to dread the 20th of every month. NomadTax completely removed that anxiety. My tax tank is always full now.",
      rating: 5,
    },
    {
      name: "James O.",
      role: "Senior Developer",
      content: "The Triple Tank method is genius. I'm actually saving money for the first time in 5 years of freelancing.",
      rating: 5,
    },
    {
      name: "Michelle W.",
      role: "Content Creator",
      content: "Intuitive UI and the KRA calculations are spot on. It even handles the new housing levy correctly.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-slate-900/50 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Trusted by Kenyan Nomads
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Join 2,000+ freelancers who have automated their financial compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-white/20"} />
                ))}
              </div>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                "{item.content}"
              </p>
              <div>
                <div className="font-bold text-white">{item.name}</div>
                <div className="text-sm text-slate-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
