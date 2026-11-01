"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTIONS, type SectionKey } from "@/lib/sections";

export default function Navbar({
  active,
  onSelect,
}: {
  active: SectionKey;
  onSelect: (section: SectionKey) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (section: SectionKey) => {
    setIsOpen(false);
    onSelect(section);
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-9 h-9 rounded-full overflow-hidden bg-pine-950 ring-2 ring-brass-400 ring-offset-2 ring-offset-paper"
        >
          <Image
            src="/image-me.jpeg"
            alt=""
            width={400}
            height={400}
            sizes="36px"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </button>

        <ul className="hidden md:flex items-center gap-2 font-mono text-sm">
          {SECTIONS.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => handleSelect(key)}
                aria-current={active === key ? "true" : undefined}
                className={`px-2.5 py-1 rounded transition-colors ${
                  active === key
                    ? "bg-brass-400/25 text-brass-800"
                    : "text-moss-600 hover:text-pine-950"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-moss-700 hover:text-pine-950 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {isOpen && (
        <ul className="md:hidden border-y border-pine-950/10 bg-surface px-4 py-2 font-mono text-sm">
          {SECTIONS.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => handleSelect(key)}
                aria-current={active === key ? "true" : undefined}
                className={`w-full text-left px-2.5 py-2.5 rounded ${
                  active === key ? "bg-brass-400/25 text-brass-800" : "text-moss-700"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
