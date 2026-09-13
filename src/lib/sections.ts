export const SECTIONS = [
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];
