"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import {
  fetchExperience,
  fetchProfile,
  fetchProjects,
  fetchSkills,
} from "@/lib/api";
import {
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkillCategories,
  fallbackTechBadges,
} from "@/lib/fallback";
import type { SectionKey } from "@/lib/sections";
import type {
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
  | { section: "projects"; projects: Project[] };

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
  }
}

function SectionLoading() {
  return (
    <div className="flex items-center justify-center py-40">
      <span className="w-8 h-8 border-2 border-white/20 border-t-indigo-400 rounded-full animate-spin" />
    </div>
  );
}

function FallbackNotice() {
  return (
    <p className="max-w-6xl mx-auto px-6 pt-10 text-sm text-amber-400/90">
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
      <main>
        <Hero profile={heroProfile} onNavigate={selectSection} />
        <div id="section-content" ref={contentRef} className="scroll-mt-16">
          {loading && <SectionLoading />}
          {!loading && usedFallback && <FallbackNotice />}
          {!loading && data && renderSection(data)}
        </div>
      </main>
    </>
  );
}
