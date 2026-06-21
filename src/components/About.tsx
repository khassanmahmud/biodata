"use client";

import { useEffect, useRef } from "react";
import { Calendar, MapPin, Coffee, Users } from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience", icon: Calendar },
  { value: "80+", label: "Projects Shipped", icon: Coffee },
  { value: "30+", label: "Happy Clients", icon: Users },
  { value: "London", label: "Based In", icon: MapPin },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".section-reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <div className="section-reveal flex justify-center lg:justify-start">
            <div className="relative">
              {/* Avatar placeholder */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center glass-card animate-pulse-glow">
                <div className="text-center">
                  <div className="text-7xl font-bold gradient-text mb-2">RA</div>
                  <div className="text-slate-400 text-sm">Your photo here</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 border border-indigo-500/30 bg-indigo-500/10">
                <div className="text-white font-bold text-lg">15+ yrs</div>
                <div className="text-indigo-300 text-xs">of expertise</div>
              </div>
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 border border-violet-500/30 bg-violet-500/10">
                <div className="text-white font-bold text-lg">80+</div>
                <div className="text-violet-300 text-xs">projects done</div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="space-y-6">
            <div className="section-reveal">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Senior Software Developer & Architect
              </h3>
              <p className="text-slate-400 leading-relaxed">
                I&apos;m a passionate software developer with over 15 years of experience
                designing and building scalable web applications, APIs, and distributed systems.
                I thrive at the intersection of clean architecture and pragmatic delivery.
              </p>
            </div>
            <div className="section-reveal">
              <p className="text-slate-400 leading-relaxed">
                Throughout my career I&apos;ve worn many hats — from individual contributor to
                tech lead — guiding teams across fintech, e-commerce, and SaaS. I care
                deeply about code quality, developer experience, and shipping products
                that actually make a difference.
              </p>
            </div>
            <div className="section-reveal">
              <p className="text-slate-400 leading-relaxed">
                When I&apos;m not coding, I&apos;m mentoring junior developers, contributing to
                open source, or exploring the latest advancements in cloud-native
                and AI-assisted development.
              </p>
            </div>

            {/* Quick facts */}
            <div className="section-reveal grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="glass-card rounded-2xl p-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-indigo-400 mb-2" />
                  <div className="text-white font-bold text-xl">{value}</div>
                  <div className="text-slate-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
