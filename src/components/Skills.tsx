"use client";

import { useEffect, useRef } from "react";

type Skill = { name: string; level: number };

const skillCategories: { title: string; color: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 82 },
    ],
  },
  {
    title: "Backend",
    color: "from-indigo-500 to-violet-500",
    skills: [
      { name: "Node.js", level: 97 },
      { name: "Python / Django", level: 88 },
      { name: "Go", level: 80 },
      { name: "Java / Spring", level: 78 },
    ],
  },
  {
    title: "Data & Infra",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "PostgreSQL / MySQL", level: 92 },
      { name: "Redis / Elasticsearch", level: 85 },
      { name: "MongoDB", level: 83 },
      { name: "AWS / GCP", level: 88 },
    ],
  },
  {
    title: "DevOps & Tools",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Docker / Kubernetes", level: 87 },
      { name: "CI/CD (GitHub Actions)", level: 90 },
      { name: "Terraform / IaC", level: 80 },
      { name: "Linux / Bash", level: 93 },
    ],
  },
];

const techBadges = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Go", "Java",
  "PostgreSQL", "Redis", "MongoDB", "AWS", "GCP", "Docker", "Kubernetes",
  "GraphQL", "REST APIs", "Terraform", "CI/CD", "Microservices", "gRPC",
  "WebSockets", "Kafka", "Redis Streams", "Nginx", "Linux",
];

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

export default function Skills() {
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
          {skillCategories.map((cat, ci) => (
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
