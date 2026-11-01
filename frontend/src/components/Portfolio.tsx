"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import AiCourses from "./AiCourses";
import {
  fetchCourses,
  fetchExperience,
  fetchProfile,
  fetchProjects,
  fetchSkills,
} from "@/lib/api";
import {
  fallbackCourses,
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkillCategories,
  fallbackTechBadges,
} from "@/lib/fallback";
import type { SectionKey } from "@/lib/sections";
import type {
  Course,
  Experience as ExperienceEntry,
  Profile,
  Project,
  SkillCategory,
} from "@/lib/types";

type SectionData =
  | { section: "about"; profile: Profile }
  | { section: "contact"; profile: Profile }
  | { section: "skills"; categories: SkillCategory[]; techBadges: string[] }
  | { section: "experience"; experiences: ExperienceEntry[] }
  | { section: "projects"; projects: Project[] }
  | { section: "courses"; courses: Course[] };

async function loadSection(section: SectionKey): Promise<SectionData> {
  switch (section) {
    case "about":
    case "contact":
      return { section, profile: await fetchProfile() };
    case "skills": {
      const { categories, techBadges } = await fetchSkills();
      return { section, categories, techBadges };
    }
    case "experience":
      return { section, experiences: await fetchExperience() };
    case "projects":
      return { section, projects: await fetchProjects() };
    case "courses":
      return { section, courses: await fetchCourses() };
  }
}

function fallbackSection(section: SectionKey): SectionData {
  switch (section) {
    case "about":
    case "contact":
      return { section, profile: fallbackProfile };
    case "skills":
      return {
        section,
        categories: fallbackSkillCategories,
        techBadges: fallbackTechBadges,
      };
    case "experience":
      return { section, experiences: fallbackExperiences };
    case "projects":
      return { section, projects: fallbackProjects };
    case "courses":
      return { section, courses: fallbackCourses };
  }
}

function renderSection(data: SectionData) {
  switch (data.section) {
    case "about":
      return <About profile={data.profile} />;
    case "contact":
      return <Contact profile={data.profile} />;
    case "skills":
      return (
        <Skills categories={data.categories} techBadges={data.techBadges} />
      );
    case "experience":
      return <Experience experiences={data.experiences} />;
    case "projects":
      return <Projects projects={data.projects} />;
    case "courses":
      return <AiCourses courses={data.courses} />;
  }
}

function SectionLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <span className="w-6 h-6 border-2 border-pine-950/15 border-t-brass-500 rounded-full animate-spin" />
    </div>
  );
}

function FallbackNotice() {
  return (
    <p className="mx-6 sm:mx-12 mt-8 text-sm text-amber-800 bg-amber-100/60 border border-amber-300/60 rounded-md px-3.5 py-2.5">
      Couldn&apos;t reach the API — showing bundled fallback content.
    </p>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<SectionKey>("about");
  const [data, setData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);
  const [heroProfile, setHeroProfile] = useState<Profile>(fallbackProfile);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((profile) => {
        if (!cancelled) setHeroProfile(profile);
      })
      .catch(() => {
        // Keep the bundled default in the hero.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const loaded = await loadSection(active);
        if (cancelled) return;
        setData(loaded);
        setUsedFallback(false);
      } catch {
        if (cancelled) return;
        setData(fallbackSection(active));
        setUsedFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [active]);

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
          <Hero profile={heroProfile} />
          <div
            id="section-content"
            ref={contentRef}
            className="scroll-mt-20 border-t border-pine-950/10 min-h-[24rem]"
          >
            {!data && loading && <SectionLoading />}
            {data && (
              // Keep the previous section on screen, dimmed, while the next one
              // loads; the key change replays the entrance on each switch.
              <div
                aria-busy={loading}
                className={`transition-opacity duration-200 ${
                  loading ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}
              >
                <div key={data.section} className="animate-section-in">
                  {usedFallback && <FallbackNotice />}
                  {renderSection(data)}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
