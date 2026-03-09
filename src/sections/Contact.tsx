"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, Clock, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  botField: string;
};

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join("&");
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    botField: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: left,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        form,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const payload = {
        "form-name": "contact",
        ...formData,
      };

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode(payload),
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        botField: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Netlify form submission error:", error);
      setSubmitError(
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen py-24 z-[90]"
      style={{ backgroundColor: "#070B14" }}
    >
      <div className="px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div ref={leftRef}>
          <h2 className="headline-2 text-primary-light mb-6">
            Let&apos;s build your digital operations layer.
          </h2>
          <p className="body-text mb-10 max-w-md">
            Tell us what you&apos;re running. We&apos;ll map the fastest path to
            integrated, data-driven facilities.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10">
                <Mail className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="micro-label text-secondary-light mb-1">Email</p>
                <a
                  href="mailto:info@dsm-consulting.com"
                  className="text-primary-light hover:text-cyan transition-colors"
                >
                  info@dsm-consulting.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10">
                <Phone className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="micro-label text-secondary-light mb-1">Phone</p>
                <a
                  href="tel:+1-800-391-0805"
                  className="text-primary-light hover:text-cyan transition-colors"
                >
                  +1 (800) 391-0805
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10">
                <MapPin className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="micro-label text-secondary-light mb-1">Office</p>
                <p className="text-primary-light">
                  1901 W. Lambert St., Suite 203S
                  <br />
                  Los Angeles, CA 90631
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10">
                <Clock className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="micro-label text-secondary-light mb-1">
                  Business Hours
                </p>
                <p className="text-primary-light">
                  Monday - Friday: 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10">
                <Headphones className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="micro-label text-secondary-light mb-1">
                  Tech Support
                </p>
                <a
                  href="mailto:support@dsm-consulting.com"
                  className="text-primary-light hover:text-cyan transition-colors"
                >
                  support@dsm-consulting.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div ref={formRef} className="glass-card p-8 lg:p-10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="p-4 rounded-full bg-cyan/10 mb-4">
                <Send className="w-8 h-8 text-cyan" />
              </div>
              <h3 className="font-display font-semibold text-primary-light text-xl mb-2">
                Message Sent
              </h3>
              <p className="body-text">
                We&apos;ll reply within two business days.
              </p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human:
                  <input
                    name="bot-field"
                    value={formData.botField}
                    onChange={handleChange}
                  />
                </label>
              </p>

              <div>
                <label
                  htmlFor="name"
                  className="micro-label text-secondary-light mb-2 block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="micro-label text-secondary-light mb-2 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="micro-label text-secondary-light mb-2 block"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="micro-label text-secondary-light mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-primary-light placeholder:text-secondary-light/50 focus:border-cyan/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-400">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>

              <p className="body-text text-xs text-center mt-4">
                We reply within two business days.
              </p>
            </form>
          )}
        </div>
      </div>

      <footer className="px-[8vw] mt-24 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-primary-light text-xl">
              DSM
            </span>
            <span className="text-secondary-light text-sm">Consulting</span>
          </div>
          <p className="body-text text-xs">
            © 2026 DSM Consulting. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
