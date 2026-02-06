import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Server, HeartPulse, Landmark, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
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

    const cardElements = cards.querySelectorAll('.industry-card');

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
          0.06
        )
        .fromTo(cardElements[2], 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.12
        )
        .fromTo(cardElements[3], 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.18
        )
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .to({}, { duration: 0.12 }); // Hold for entrance

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

  const industries = [
    {
      icon: Server,
      title: 'Data Centers',
      description: 'Uptime-first design and real-time operations.',
    },
    {
      icon: HeartPulse,
      title: 'Healthcare',
      description: 'Safe, compliant infrastructure for patient care.',
    },
    {
      icon: Landmark,
      title: 'Financial Services',
      description: 'Risk-aware systems and audit-ready reporting.',
    },
    {
      icon: Shield,
      title: 'Government & Defense',
      description: 'Secure integration and classified-ready workflows.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="industries"
      className="relative w-screen h-screen overflow-hidden z-[60]"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/data_center_aisle.jpg" 
          alt="Data Center Aisle" 
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
            Built for mission-critical sectors.
          </h2>
          <p className="body-text mb-8">
            Compliance, resilience, and scale—tailored to the environments you operate in.
          </p>

          <a 
            href="#insights" 
            className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Explore by Industry
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Industry Cards Grid */}
        <div 
          ref={cardsRef}
          className="absolute grid grid-cols-2 gap-4"
          style={{ 
            right: '4.5%', 
            top: '14%', 
            width: '34%' 
          }}
        >
          {industries.map((industry, i) => (
            <div 
              key={i}
              className="industry-card glass-card p-5 hover:border-cyan/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="p-2.5 rounded-lg bg-cyan/10 w-fit mb-3">
                  <industry.icon className="w-5 h-5 text-cyan" />
                </div>
                <h3 className="font-display font-semibold text-primary-light text-base mb-1">
                  {industry.title}
                </h3>
                <p className="body-text text-xs leading-relaxed">
                  {industry.description}
                </p>
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
          Sector expertise. Engineering rigor.
        </p>
      </div>
    </section>
  );
}
