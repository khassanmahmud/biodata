"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, Star } from "lucide-react";

import type { Project } from "@/lib/types";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const accentMap: Record<string, { border: string; text: string; bg: string }> = {
  indigo: { border: "hover:border-indigo-500/40", text: "text-indigo-400", bg: "bg-indigo-500/10" },
  violet: { border: "hover:border-violet-500/40", text: "text-violet-400", bg: "bg-violet-500/10" },
  purple: { border: "hover:border-purple-500/40", text: "text-purple-400", bg: "bg-purple-500/10" },
  pink:   { border: "hover:border-pink-500/40",   text: "text-pink-400",   bg: "bg-pink-500/10" },
  blue:   { border: "hover:border-blue-500/40",   text: "text-blue-400",   bg: "bg-blue-500/10" },
  cyan:   { border: "hover:border-cyan-500/40",   text: "text-cyan-400",   bg: "bg-cyan-500/10" },
};

export default function Projects({ projects }: { projects: Project[] }) {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-28 px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A selection of projects from my career — production systems, open source tools, and side projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const accent = accentMap[project.accent] ?? accentMap.indigo;
            return (
              <div
                key={project.id}
                className={`section-reveal glass-card rounded-3xl overflow-hidden group ${accent.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col ${
                  project.featured ? "md:col-span-1" : ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image area / gradient placeholder */}
                <div
                  className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="text-5xl font-bold text-white/10 select-none font-mono">
                    {project.title.slice(0, 2).toUpperCase()}
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 font-medium">
                      Featured
                    </span>
                  )}
                  {project.stars && (
                    <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" /> {(project.stars / 1000).toFixed(1)}k
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-md font-mono ${accent.bg} ${accent.text}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-3 border-t border-white/5">
                    <a
                      href={project.github}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      <GithubIcon /> Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-reveal text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-slate-300 hover:border-indigo-500/50 hover:text-white hover:bg-indigo-500/5 transition-all duration-200"
          >
            <GithubIcon />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
