import { Globe } from "lucide-react";

import type { Experience as ExperienceEntry } from "@/lib/types";

export default function Experience({
  experiences,
}: {
  experiences: ExperienceEntry[];
}) {
  return (
    <section id="experience" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-6 capitalize">Work experience</h2>

      <ol className="divide-y divide-pine-950/10">
        {experiences.map((exp) => (
          <li key={exp.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-mono font-semibold text-lg">{exp.role}</h3>
              <p className="font-mono text-sm text-moss-600 whitespace-nowrap">
                {exp.period}
              </p>
            </div>
            <p className="text-sm text-moss-700 mt-1">
              <span className="text-brass-700 font-medium">{exp.company}</span>
              <span className="text-moss-500"> / </span>
              {exp.type}
              <span className="text-moss-500"> / </span>
              {exp.location}
            </p>

            {exp.description && (
              <p className="text-moss-800 leading-relaxed max-w-[68ch] mt-3">
                {exp.description}
              </p>
            )}

            {exp.highlights.length > 0 && (
              <ul className="list-disc pl-5 marker:text-brass-500 text-moss-800 space-y-1 mt-3 max-w-[68ch]">
                {exp.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 empty:hidden">
              {exp.tech.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-xs px-2 py-0.5 rounded bg-mist text-moss-800"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {exp.url && (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brass-700 hover:text-brass-800 underline underline-offset-4 decoration-brass-400/60"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {exp.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
