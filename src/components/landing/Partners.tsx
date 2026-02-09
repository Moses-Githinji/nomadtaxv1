import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Safaricom", logo: "/partners/safaricom.png" },
  { name: "Etica", logo: "/partners/etica.png" },
  { name: "Ndovu", logo: "/partners/ndovu.png" },
  { name: "Britam", logo: "/partners/britam.png" },
  { name: "Equity Bank", logo: "/partners/equity.png" },
  { name: "I&M Bank", logo: "/partners/im-bank.png" },
  { name: "KRA", logo: "/partners/kra.png" },
  { name: "Sanlam", logo: "/partners/sanlam.png" },
  { name: "CIC", logo: "/partners/cic.png" },
];

export function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    let scrollPosition = 0;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        
        // Reset position when first set of logos scrolls out
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-16 bg-slate-900/50 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Trusted by Leading Organizations
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join thousands of professionals and businesses using NomadTax for seamless tax compliance
          </p>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900/50 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-12 overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Render partners twice for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-nomad-green/30 transition-all duration-300 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to text if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const text = document.createElement('span');
                      text.className = 'fallback-text text-slate-400 font-semibold text-lg group-hover:text-white transition-colors';
                      text.textContent = partner.name;
                      parent.appendChild(text);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Hover to pause • Partners integrate seamlessly with NomadTax
          </p>
        </div>
      </div>
    </section>
  );
}
