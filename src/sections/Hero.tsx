import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageCardRef = useRef<HTMLDivElement>(null);
    const microLabelRef = useRef<HTMLSpanElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const headline = headlineRef.current;
      const subheadline = subheadlineRef.current;
      const cta = ctaRef.current;
      const imageCard = imageCardRef.current;
      const microLabel = microLabelRef.current;
      const caption = captionRef.current;
      const leftContent = leftContentRef.current;

      if (!section || !panel || !headline || !subheadline || !cta || !imageCard || !microLabel || !caption || !leftContent) return;

      const ctx = gsap.context(() => {
        // Load animation timeline
        const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        loadTl
          .fromTo(panel,
            { scale: 0.96, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8 }
          )
          .fromTo(microLabel,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.5'
          )
          .fromTo(headline.querySelectorAll('.word'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 },
            '-=0.4'
          )
          .fromTo(subheadline,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.3'
          )
          .fromTo(cta,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.4'
          )
          .fromTo(imageCard,
            { x: '8vw', opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9 },
            '-=0.8'
          )
          .fromTo(caption,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.5'
          );

        // Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              // Reset all elements when scrolling back to top
              gsap.set([panel, headline, subheadline, cta, imageCard, microLabel, caption], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });

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
          .fromTo(subheadline,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
            0.72
          )
          .fromTo(cta,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
            0.74
          )
          .fromTo(imageCard,
            { x: 0, opacity: 1 },
            { x: '18vw', opacity: 0.25, ease: 'power2.in' },
            0.7
          )
          .fromTo(microLabel,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
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

    // Split headline into words for animation
    const headlineText = "Digital Intelligence for Mission-Critical Facilities";
    const words = headlineText.split(' ');

    return (
      <section
        ref={sectionRef}
        className="relative w-screen min-h-screen overflow-hidden z-10"
        style={{ backgroundColor: '#070B14' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero_data_center.jpg"
            alt="Data Center"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(7,11,20,0.85) 0%, rgba(7,11,20,0.35) 55%, rgba(7,11,20,0.6) 100%)'
            }}
          />
        </div>

        {/* Glass Panel */}
        <div
          ref={panelRef}
          className="absolute glass-panel w-[92vw] h-[85vh] sm:w-[88vw] sm:h-[82vh] md:w-[84vw] md:h-[78vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Left Content Area - With bottom constraint to stay above caption */}
          <div
            ref={leftContentRef}
            className="absolute left-[6.5%] top-[4%] sm:top-[5%] md:top-[6%] right-[6.5%] md:right-[40%] bottom-[12%] sm:bottom-[10%] overflow-hidden"
          >
          {/* Micro Label */}
          <span
            ref={microLabelRef}
              className="micro-label text-cyan text-xs sm:text-sm block mb-4 sm:mb-5"
          >
            FACILITIES ENGINEERING
          </span>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="headline-1 text-primary-light text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6"
            >
              {words.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
              className="body-text text-sm sm:text-base max-w-full md:max-w-[90%] mb-5 sm:mb-6"
          >
            DSM converges engineering intelligence, advanced analytics, and system integration into a unified operational layer—hardening reliability and accelerating decision velocity in mission-critical environments.
          </p>

          {/* CTA Row */}
          <div
            ref={ctaRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6"
          >
            <button className="btn-primary flex items-center gap-2 text-sm sm:text-base">
              Start Digital Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#about"
              className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm sm:text-base"
            >
              Explore Engineering Capabilities
              <ArrowRight className="w-4 h-4" />
            </a>
            </div>
          </div>

          {/* Right Image Card */}
          <div
            ref={imageCardRef}
            className="absolute image-card hidden md:block"
            style={{
              right: '4.5%',
              top: '12%',
              width: '30%',
              height: '50%'
            }}
          >
            <img
              src="/server_room_wide.jpg"
              alt="Server Room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Left Caption */}
        <div
          ref={captionRef}
          className="absolute left-[6vw] right-[6vw] bottom-[2vh] sm:bottom-[3vh] px-4 sm:px-0"
        >
          <p className="micro-label text-secondary-light mb-1 text-[9px] sm:text-xs leading-relaxed">
            Engineering-Validated • IT/OT Integration • 24/7 Mission-Critical
          </p>
          <p className="body-text text-[11px] sm:text-sm">
            Data-driven. Engineering-led. Built for uptime.
          </p>
        </div>
      </section>
    );
  }
