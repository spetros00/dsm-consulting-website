import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ClientLogin() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [attempted, setAttempted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="client-login"
      className="relative w-full min-h-screen py-24 flex items-center justify-center z-[85]"
      style={{ backgroundColor: '#070B14' }}
    >
      <div className="px-[8vw] w-full max-w-md">
        <div ref={contentRef}>
          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-6 rounded-2xl bg-cyan/10">
              <Lock className="w-12 h-12 text-cyan" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="headline-2 text-primary-light mb-4 text-center">
            Client Portal
          </h2>
          <p className="body-text text-center mb-10">
            Secure access for authorized clients only
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label htmlFor="username" className="micro-label text-secondary-light mb-2 block">
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="micro-label text-secondary-light mb-2 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>

            {/* Error Message (shown after submission attempt) */}
            {attempted && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-400 font-medium text-sm mb-1">
                    Access Denied
                  </p>
                  <p className="text-red-400/80 text-sm">
                    This portal is for authorized clients only. Please contact your account manager for access credentials.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Sign In
            </button>

            <p className="body-text text-xs text-center mt-4">
              Need access? Contact us at <a href="mailto:info@dsm-consulting.com" className="text-cyan hover:underline">info@dsm-consulting.com</a>
            </p>
          </form>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-secondary-light hover:text-cyan transition-colors text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
