import { ExternalLink, Star } from "lucide-react";

import { GithubIcon } from "./icons";
import type { Project } from "@/lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-2">Projects</h2>
      <p className="text-moss-700 mb-8 max-w-[68ch]">
        Client work from my roles at BJIT Ltd and BJIT Inc.
      </p>

      <ul className="divide-y divide-pine-950/10">
        {projects.map((project) => (
          <li key={project.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-mono font-semibold">{project.title}</h3>
                <p className="text-sm text-moss-600 mt-0.5">{project.context}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-xs">
                {project.featured && (
                  <span className="px-2 py-0.5 rounded bg-brass-400/25 text-brass-800">
                    Featured
                  </span>
                )}
                {project.stars && (
                  <span className="inline-flex items-center gap-1 text-moss-700">
                    <Star className="w-3.5 h-3.5" />
                    {(project.stars / 1000).toFixed(1)}k
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-moss-800 leading-relaxed mt-2 max-w-[75ch]">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-1.5 mt-4">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-mist text-moss-800"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {(project.github || project.live) && (
              <div className="flex gap-4 mt-4 text-sm">
                {project.github && (
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-1.5 text-moss-700 hover:text-pine-950"
                  >
                    <GithubIcon /> Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="inline-flex items-center gap-1.5 text-moss-700 hover:text-pine-950"
                  >
                    <ExternalLink className="w-4 h-4" /> Live site
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
