import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0f1a]">
      {/* Background Image Layer - z-index: 0 */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/95 via-[#0a0f1a]/80 to-[#0a0f1a]/60" />
      </div>

      {/* Decorative Background Text Layer - z-index: 1 */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none">
        <span className="absolute top-[15%] left-[5%] text-[8rem] md:text-[12rem] font-bold text-white/[0.03] tracking-wider">
          FACILITIES
        </span>
        <span className="absolute top-[35%] right-[10%] text-[6rem] md:text-[10rem] font-bold text-white/[0.03] tracking-wider">
          ENGINEERING
        </span>
        <span className="absolute bottom-[20%] left-[15%] text-[7rem] md:text-[11rem] font-bold text-white/[0.03] tracking-wider">
          DATA CENTERS
        </span>
      </div>

      {/* Main Content Layer - z-index: 10 */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-24">
          <div className="max-w-4xl">
            {/* Eyebrow Text */}
            <p className="mb-6 text-sm font-medium tracking-[0.2em] text-[#4db8ff] uppercase">
              Facilities Engineering
            </p>

            {/* Main Headline */}
            <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Digital
              <br />
              Intelligence for
              <br />
              Mission-Critical
              <br />
              <span className="text-white">Facilities</span>
            </h1>

            {/* Description */}
            <p className="mb-10 max-w-xl text-lg text-gray-300 leading-relaxed">
              DSM integrates engineering, analytics, and integration to improve 
              reliability, performance, and operational decision-making across 
              mission-critical environments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-[#4db8ff] hover:bg-[#3aa8f0] text-[#0a0f1a] font-semibold px-8 py-6 text-base rounded-full transition-all duration-300"
              >
                Start Digital Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="#capabilities" 
                className="inline-flex items-center text-[#4db8ff] hover:text-white font-medium transition-colors duration-300"
              >
                Explore Engineering Capabilities
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4db8ff]" />
                Engineering-Validated
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4db8ff]" />
                IT/OT Integration
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4db8ff]" />
                24/7 Mission-Critical Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline - z-index: 10 */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <p className="text-sm text-gray-500 tracking-wide">
          Data-driven. Engineering-led. Built for uptime.
        </p>
      </div>
    </section>
  );
}
