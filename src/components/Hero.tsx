"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Mail, Download } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const roles = [
  "Full-Stack Developer",
  "Software Architect",
  "Backend Engineer",
  "Tech Lead",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid-pattern"
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to new opportunities
        </div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Hi, I&apos;m <span className="gradient-text">Md. Rabiul Hassan Mahmud</span>
        </h1>

        {/* Typing role */}
        <div
          className="text-2xl sm:text-3xl text-slate-300 font-medium mb-6 h-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="cursor-blink">{displayed}</span>
        </div>

        {/* Tagline */}
        <p
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          15+ years crafting robust, scalable software. From startup MVPs to
          enterprise systems — I turn complex problems into elegant solutions.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-indigo-500/25 animate-pulse-glow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full border border-white/15 text-slate-300 font-semibold hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-200"
          >
            Contact Me
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-6 mb-16 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          {[
            { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
            {
              icon: LinkedinIcon,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
            {
              icon: Mail,
              href: "mailto:hassanmahmud.sa@gmail.com",
              label: "Email",
            },
            { icon: Download, href: "/resume.pdf", label: "Resume" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={label}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm hidden sm:block">{label}</span>
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
