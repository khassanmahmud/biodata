"use client";

import { useEffect, useRef } from "react";
import { Calendar, MapPin, Coffee, Users } from "lucide-react";

import type { Profile } from "@/lib/types";

const STAT_ICONS = [Calendar, Coffee, Users, MapPin];

export default function About({ profile }: { profile: Profile }) {
  const { stats, summary, title, initials } = profile;
  const yearsBadge = stats[0]?.value ?? "15+";
  const projectsBadge = stats[1]?.value ?? "80+";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".section-reveal")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("visible"), i * 100);
              });
          }
        });
      },
      { threshold: 0.1 },
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
                  <div className="text-7xl font-bold gradient-text mb-2">
                    {initials}
                  </div>
                  <div className="text-slate-400 text-sm">Your photo here</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 border border-indigo-500/30 bg-indigo-500/10">
                <div className="text-white font-bold text-lg">
                  {yearsBadge} yrs
                </div>
                <div className="text-indigo-300 text-xs">of expertise</div>
              </div>
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 border border-violet-500/30 bg-violet-500/10">
                <div className="text-white font-bold text-lg">
                  {projectsBadge}
                </div>
                <div className="text-violet-300 text-xs">projects done</div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="space-y-6">
            <div className="section-reveal">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {title}
              </h3>
              {summary[0] && (
                <p className="text-slate-400 leading-relaxed">{summary[0]}</p>
              )}
            </div>
            {summary.slice(1).map((paragraph, i) => (
              <div className="section-reveal" key={i}>
                <p className="text-slate-400 leading-relaxed">{paragraph}</p>
              </div>
            ))}

            {/* Quick facts */}
            <div className="section-reveal grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ value, label }, i) => {
                const Icon = STAT_ICONS[i % STAT_ICONS.length];
                return (
                  <div
                    key={label}
                    className="glass-card rounded-2xl p-4 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-indigo-400 mb-2" />
                    <div className="text-white font-bold text-xl">{value}</div>
                    <div className="text-slate-400 text-sm">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
