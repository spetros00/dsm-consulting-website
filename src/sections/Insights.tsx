import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const cardElements = cards.querySelectorAll('.insight-card');

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(heading, 
        { y: 24, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards staggered reveal
      cardElements.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 40, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const articles = [
    {
      title: 'The Facilities Data Audit',
      description: 'What to collect, how to clean it, and who should own it.',
      image: '/card_image_01.jpg',
    },
    {
      title: 'Integration Roadmap 101',
      description: 'A 90-day plan to connect BMS, EPMS, and analytics.',
      image: '/card_image_02.jpg',
    },
    {
      title: 'Predictive Maintenance Myths',
      description: 'What works, what doesn\'t, and how to start small.',
      image: '/card_image_03.jpg',
    },
    {
      title: 'Cybersecurity for OT Networks',
      description: 'Segmentation, monitoring, and safe integrations.',
      image: '/server_racks.jpg',
    },
    {
      title: 'Sustainability Metrics That Stick',
      description: 'From baselines to board-ready reporting.',
      image: '/server_corridor.jpg',
    },
    {
      title: 'Change Management for Operators',
      description: 'How to roll out new tools without breaking workflows.',
      image: '/data_center_aisle.jpg',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="insights"
      className="relative w-full min-h-screen py-24 z-[70]"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Heading Block */}
      <div 
        ref={headingRef}
        className="px-[8vw] mb-12"
      >
        <h2 className="headline-2 text-primary-light mb-4">
          Insights
        </h2>
        <p className="body-text max-w-xl">
          Practical thinking on facilities, data, and digital operations.
        </p>
      </div>

      {/* Articles Grid */}
      <div 
        ref={cardsRef}
        className="px-[8vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {articles.map((article, i) => (
          <article 
            key={i}
            className="insight-card group cursor-pointer"
          >
            <div className="image-card mb-4 overflow-hidden" style={{ height: '26vh' }}>
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-2">
              <h3 className="font-display font-semibold text-primary-light text-lg mb-2 group-hover:text-cyan transition-colors">
                {article.title}
              </h3>
              <p className="body-text text-sm">
                {article.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="px-[8vw] mt-12">
        <a 
          href="#about" 
          className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all w-fit"
        >
          View All Insights
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
