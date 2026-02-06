import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const cardElements = cards.querySelectorAll('.team-card');

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

  const team = [
    {
      name: 'Alex Mercer',
      role: 'Managing Director',
      image: '/team_01.jpg',
    },
    {
      name: 'Samira Patel',
      role: 'Head of Engineering',
      image: '/team_02.jpg',
    },
    {
      name: 'Jordan Okonkwo',
      role: 'Analytics Lead',
      image: '/team_03.jpg',
    },
    {
      name: 'Riley Chen',
      role: 'Integration Lead',
      image: '/team_04.jpg',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about"
      className="relative w-full min-h-screen py-24 z-[80]"
      style={{ backgroundColor: '#070B14' }}
    >
      {/* Heading Block */}
      <div 
        ref={headingRef}
        className="px-[8vw] mb-12"
      >
        <h2 className="headline-2 text-primary-light mb-4">
          About DSM
        </h2>
        <p className="body-text max-w-xl">
          Engineers, data architects, and operators—working as one team.
        </p>
      </div>

      {/* Team Grid */}
      <div 
        ref={cardsRef}
        className="px-[8vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {team.map((member, i) => (
          <div 
            key={i}
            className="team-card group"
          >
            <div className="image-card mb-4 overflow-hidden" style={{ height: '34vh' }}>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-2">
              <h3 className="font-display font-semibold text-primary-light text-lg">
                {member.name}
              </h3>
              <p className="body-text text-sm">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-[8vw] mt-12">
        <a 
          href="#contact" 
          className="text-cyan font-display font-medium flex items-center gap-1 hover:gap-2 transition-all w-fit"
        >
          Join the Team
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
