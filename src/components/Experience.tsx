"use client";

import { useEffect, useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

import type { Experience as ExperienceEntry } from "@/lib/types";

export default function Experience({
  experiences,
}: {
  experiences: ExperienceEntry[];
}) {
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
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Career journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="section-reveal relative pl-16 md:pl-20">
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-5 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${exp.accent} shadow-lg flex items-center justify-center`}
                >
                  <Briefcase className="w-2.5 h-2.5 text-white" />
                </div>

                <div className="glass-card rounded-3xl p-6 sm:p-8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={exp.url}
                          className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 text-xs px-2 py-0.5 rounded-full bg-white/5">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${exp.accent} bg-opacity-10 text-white whitespace-nowrap self-start`}
                      style={{
                        background: "rgba(99,102,241,0.12)",
                        border: "1px solid rgba(99,102,241,0.25)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-slate-400 text-sm"
                      >
                        <span
                          className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.accent}`}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
