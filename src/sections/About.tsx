  import { useRef, useLayoutEffect } from 'react';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ArrowRight, Calendar, CheckCircle, Building2, Headphones } from 'lucide-react';

  gsap.registerPlugin(ScrollTrigger);

  export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const image = imageRef.current;
      const stats = statsRef.current;
      const content = contentRef.current;

      if (!section || !heading || !image || !stats || !content) return;

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

        // Image reveal with scale effect
        gsap.fromTo(image,
          { scale: 1.05, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: image,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Stats staggered reveal
        const statCards = stats.querySelectorAll('.stat-card');
        gsap.fromTo(statCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: stats,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Content reveal
        gsap.fromTo(content,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: content,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );

      }, section);

      return () => ctx.revert();
    }, []);

    const stats = [
      {
        icon: Calendar,
        number: 'Since 2015',
        label: 'Engineering-First'
      },
      {
        icon: CheckCircle,
        number: '50+',
        label: 'Projects Delivered'
      },
      {
        icon: Building2,
        number: '4',
        label: 'Industries Served'
      },
      {
        icon: Headphones,
        number: '24/7',
        label: 'Technical Support'
      },
    ];

    const valueProps = [
      'Engineering-Validated Solutions',
      'Data-Driven Decision Making',
      'Built for Mission-Critical Uptime',
    ];

    return (
      <section
        ref={sectionRef}
        id="about"
        className="relative w-full min-h-screen py-24 z-[80]"
        style={{ backgroundColor: '#070B14' }}
      >
        <div className="px-[8vw]">
          {/* Heading Block */}
          <div
            ref={headingRef}
            className="mb-12"
          >
            <h2 className="headline-2 text-primary-light mb-4">
              About DSM Consulting
            </h2>
            <p className="body-text max-w-xl">
              Engineering excellence meets operational intelligence
            </p>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="image-card mb-16 overflow-hidden"
            style={{ height: '60vh' }}
          >
            <img
              src="/server_room_wide.jpg"
              alt="DSM Consulting - Mission-critical data center infrastructure"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay for text readability if needed */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(7,11,20,0) 0%, rgba(7,11,20,0.3) 100%)'
              }}
            />
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card glass-card p-6 text-center hover:border-cyan/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-cyan/10">
                    <stat.icon className="w-6 h-6 text-cyan" />
                  </div>
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-primary-light mb-2">
                  {stat.number}
                </div>
                <div className="micro-label text-secondary-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Company Story - Two Column Layout */}
          <div
            ref={contentRef}
            className="grid lg:grid-cols-2 gap-12 mb-12"
          >
            {/* Left Column - Who We Are */}
            <div>
              <h3 className="headline-3 text-primary-light mb-6">
                Who We Are
              </h3>
              <p className="body-text mb-6">
                Founded in 2015, DSM Consulting was built on the belief that facilities engineering and data analytics shouldn't be separate disciplines. Our team combines PE-licensed engineers, data architects, and former operators who understand the stakes when downtime isn't an option. We design MEP systems, integrate IT/OT infrastructure, and build the analytics layer that turns sensor data into decisions.
              </p>
              <p className="body-text">
                We don't deploy technology for its own sake. Every engagement starts with an as-built assessment—baseline performance, stakeholder mapping, and a phased roadmap that respects your operational reality. From BMS and EPMS connectivity to predictive maintenance workflows, we align engineering, IT, and operations so change feels controlled, not chaotic.
              </p>
            </div>

            {/* Right Column - What We Do */}
            <div>
              <h3 className="headline-3 text-primary-light mb-6">
                What We Do
              </h3>
              <p className="body-text mb-8">
                We serve mission-critical sectors where reliability, compliance, and uptime aren't negotiable: data centers, healthcare facilities, financial services, and government operations. Whether you're managing a single site or a national portfolio, we help you measure what matters—then track the metrics that affect cost, risk, and resilience.
              </p>

              {/* Value Props Card */}
              <div className="glass-card p-6 sm:p-8">
                <p className="micro-label text-cyan mb-6">
                  Our Approach
                </p>
                <ul className="space-y-4">
                  {valueProps.map((prop, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan mt-0.5 flex-shrink-0" />
                      <span className="text-primary-light font-medium">
                        {prop}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href="#contact"
              className="text-cyan font-display font-medium text-lg flex items-center gap-1 hover:gap-2 transition-all justify-center"
            >
              Work With Us
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>
    );
  }