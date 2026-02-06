import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, PenTool, Wrench, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
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

    const cardElements = cards.querySelectorAll('.step-card');

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

  const steps = [
    {
      icon: Search,
      title: 'Assess',
      description: 'As-built review, data audit, stakeholder mapping.',
    },
    {
      icon: PenTool,
      title: 'Design',
      description: 'Architecture, interfaces, and governance.',
    },
    {
      icon: Wrench,
      title: 'Implement',
      description: 'Integration, testing, and training.',
    },
    {
      icon: TrendingUp,
      title: 'Optimize',
      description: 'Monitoring, alerts, and continuous improvement.',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="approach"
      className="relative w-screen h-screen overflow-hidden z-40"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/server_racks.jpg" 
          alt="Server Racks" 
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
            A phased approach to integration.
          </h2>
          <p className="body-text mb-8">
            We align engineering, IT, and operations—so change feels controlled, not chaotic.
          </p>

          <a 
            href="#impact" 
            className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            How We Work
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Step Cards Grid */}
        <div 
          ref={cardsRef}
          className="absolute grid grid-cols-2 gap-4"
          style={{ 
            right: '4.5%', 
            top: '14%', 
            width: '34%' 
          }}
        >
          {steps.map((step, i) => (
            <div 
              key={i}
              className="step-card glass-card p-5 hover:border-cyan/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="p-2.5 rounded-lg bg-cyan/10 w-fit mb-3">
                  <step.icon className="w-5 h-5 text-cyan" />
                </div>
                <h3 className="font-display font-semibold text-primary-light text-base mb-1">
                  {step.title}
                </h3>
                <p className="body-text text-xs leading-relaxed">
                  {step.description}
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
          Plan. Build. Run. Improve.
        </p>
      </div>
    </section>
  );
}
