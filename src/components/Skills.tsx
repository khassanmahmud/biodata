"use client";

import { useEffect, useRef } from "react";

import type { Skill, SkillCategory } from "@/lib/types";

function SkillBar({ name, level, color, delay }: Skill & { color: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = `${level}%`;
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [level, delay]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-slate-500 text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function Skills({
  categories,
  techBadges,
}: {
  categories: SkillCategory[];
  techBadges: string[];
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".section-reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
    <section
      id="skills"
      ref={ref}
      className="py-28 px-6 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I work with
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Skills & Tech Stack
          </h2>
        </div>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, ci) => (
            <div key={cat.title} className="section-reveal glass-card rounded-3xl p-6 hover:border-white/15 transition-all duration-300">
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    delay={ci * 150 + si * 80 + 300}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="section-reveal text-center">
          <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest">Also comfortable with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full glass-card text-slate-300 text-sm hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
