"use client";

import { useCallback, useRef, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import AiCourses from "./AiCourses";
import {
  courses,
  experiences,
  profile,
  projects,
  skillCategories,
  techBadges,
} from "@/lib/content";
import type { SectionKey } from "@/lib/sections";

function renderSection(section: SectionKey) {
  switch (section) {
    case "about":
      return <About profile={profile} />;
    case "contact":
      return <Contact profile={profile} />;
    case "skills":
      return <Skills categories={skillCategories} techBadges={techBadges} />;
    case "experience":
      return <Experience experiences={experiences} />;
    case "projects":
      return <Projects projects={projects} />;
    case "courses":
      return <AiCourses courses={courses} />;
  }
}

export default function Portfolio() {
  const [active, setActive] = useState<SectionKey>("about");
  const contentRef = useRef<HTMLDivElement>(null);

  const selectSection = useCallback((section: SectionKey) => {
    setActive(section);
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <>
      <Navbar active={active} onSelect={selectSection} />
      <main className="w-full max-w-5xl mx-auto sm:px-6">
        <div className="bg-surface sm:border sm:border-pine-950/10 sm:rounded-xl">
          <Hero profile={profile} />
          <div
            id="section-content"
            ref={contentRef}
            className="scroll-mt-20 border-t border-pine-950/10 min-h-[24rem]"
          >
            {/* The key change replays the entrance animation on each switch. */}
            <div key={active} className="animate-section-in">
              {renderSection(active)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
