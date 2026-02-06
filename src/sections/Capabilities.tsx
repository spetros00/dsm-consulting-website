import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Settings, Database, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const headline = headlineRef.current;
    const imageCard = imageCardRef.current;
    const caption = captionRef.current;
    const bg = bgRef.current;

    if (!section || !panel || !headline || !imageCard || !caption || !bg) return;

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
        .fromTo(imageCard, 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(bg, 
          { scale: 1.08, opacity: 0.7 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .to({}, { duration: 0.3 }); // Hold for entrance

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
        .fromTo(imageCard, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0.25, ease: 'power2.in' }, 
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

  const capabilities = [
    { icon: Settings, text: 'MEP + infrastructure design' },
    { icon: Database, text: 'Data architecture & integration' },
    { icon: LineChart, text: 'Predictive analytics & automation' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="capabilities"
      className="relative w-screen h-screen overflow-hidden z-20"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img 
          src="/server_room_wide.jpg" 
          alt="Server Room" 
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
          style={{ left: '6.5%', top: '16%', width: '40%' }}
        >
          <h2 className="headline-2 text-primary-light mb-6">
            Engineering + Analytics.<br />One Team.
          </h2>
          <p className="body-text mb-8">
            We design, model, and integrate systems—then build the data layer 
            that turns telemetry into decisions.
          </p>
          
          {/* Capability List */}
          <div className="space-y-4 mb-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-3">
                <cap.icon className="w-5 h-5 text-cyan" />
                <span className="text-primary-light font-medium">{cap.text}</span>
              </div>
            ))}
          </div>

          <a 
            href="#services" 
            className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            See Our Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Right Image Card */}
        <div 
          ref={imageCardRef}
          className="absolute image-card"
          style={{ 
            right: '4.5%', 
            top: '12%', 
            width: '30%', 
            height: '52%' 
          }}
        >
          <img 
            src="/control_room.jpg" 
            alt="Control Room" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Left Caption */}
      <div 
        ref={captionRef}
        className="absolute"
        style={{ left: '6vw', bottom: '6vh' }}
      >
        <p className="body-text text-sm">
          From as-built to real-time digital operations.
        </p>
      </div>
    </section>
  );
}
