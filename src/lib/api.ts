import type { Experience, Profile, Project, SkillCategory } from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface Envelope<T> {
  data: T;
}

async function getData<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} responded ${response.status}`);
  }
  const body = (await response.json()) as Envelope<T>;
  if (!body?.data) {
    throw new Error(`GET ${path} returned no data`);
  }
  return body.data;
}

export interface SkillsPayload {
  categories: SkillCategory[];
  techBadges: string[];
}

export function fetchProfile(): Promise<Profile> {
  return getData<Profile>("/api/profile");
}

export function fetchSkills(): Promise<SkillsPayload> {
  return getData<SkillsPayload>("/api/skills");
}

export function fetchExperience(): Promise<Experience[]> {
  return getData<Experience[]>("/api/experience");
}

export function fetchProjects(): Promise<Project[]> {
  return getData<Project[]>("/api/projects");
}
