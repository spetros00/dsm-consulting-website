import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Leaf, DollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const caption = captionRef.current;
    const bg = bgRef.current;

    if (!section || !panel || !headline || !cards || !caption || !bg) return;

    const cardElements = cards.querySelectorAll('.metric-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1: ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(panel, 
          { y: '100vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(headline, 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(cardElements[0], 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(cardElements[1], 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        .fromTo(cardElements[2], 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.16
        )
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .to({}, { duration: 0.14 }); // Hold for entrance

      // Phase 3: EXIT (70% - 100%)
      scrollTl
        .fromTo(panel, 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0.25, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(cardElements, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0.25, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(caption, 
          { y: 0, opacity: 1 }, 
          { y: '6vh', opacity: 0, ease: 'power2.in' }, 
          0.85
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const metrics = [
    {
      icon: Shield,
      title: 'Uptime & Reliability',
      description: 'SLA-aligned monitoring with root-cause clarity.',
    },
    {
      icon: Leaf,
      title: 'Energy & Sustainability',
      description: 'Carbon and cost visibility across portfolios.',
    },
    {
      icon: DollarSign,
      title: 'Cost & Risk',
      description: 'Capital planning tied to real operational data.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="impact"
      className="relative w-screen h-screen overflow-hidden z-50"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/server_corridor.jpg" 
          alt="Server Corridor" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(7,11,20,0.88) 0%, rgba(7,11,20,0.45) 60%, rgba(7,11,20,0.7) 100%)'
          }}
        />
      </div>

      {/* Glass Panel */}
      <div 
        ref={panelRef}
        className="absolute glass-panel"
        style={{
          width: '84vw',
          height: '78vh',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Headline Block */}
        <div 
          ref={headlineRef}
          className="absolute"
          style={{ left: '6.5%', top: '14%', width: '34%' }}
        >
          <h2 className="headline-2 text-primary-light mb-6">
            Measure what matters.
          </h2>
          <p className="body-text mb-8">
            We baseline performance, then track the metrics that affect uptime, cost, and risk.
          </p>

          <a 
            href="#industries" 
            className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            See Case Studies
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Metric Cards */}
        <div 
          ref={cardsRef}
          className="absolute flex flex-col gap-5"
          style={{ 
            right: '4.5%', 
            top: '14%', 
            width: '34%' 
          }}
        >
          {metrics.map((metric, i) => (
            <div 
              key={i}
              className="metric-card glass-card p-6 hover:border-cyan/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan/10">
                  <metric.icon className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-light text-lg mb-2">
                    {metric.title}
                  </h3>
                  <p className="body-text text-sm">
                    {metric.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Left Caption */}
      <div 
        ref={captionRef}
        className="absolute"
        style={{ left: '6vw', bottom: '6vh' }}
      >
        <p className="body-text text-sm">
          Data becomes accountability.
        </p>
      </div>
    </section>
  );
}
