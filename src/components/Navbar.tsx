"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { SECTIONS, type SectionKey } from "@/lib/sections";

export default function Navbar({
  active,
  onSelect,
}: {
  active: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = (section: SectionKey) => {
    setIsOpen(false);
    onSelect(section);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080810]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-white font-bold text-lg group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">RA</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {SECTIONS.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => handleSelect(key)}
                aria-current={active === key ? "true" : undefined}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  active === key
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300 ${
                    active === key ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleSelect("contact")}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-indigo-500/25"
        >
          Hire Me
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/5`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {SECTIONS.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => handleSelect(key)}
                aria-current={active === key ? "true" : undefined}
                className={`text-sm font-medium w-full text-left py-2 border-b border-white/5 transition-colors ${
                  active === key ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleSelect("contact")}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
