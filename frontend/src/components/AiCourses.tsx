import { Award, GraduationCap } from "lucide-react";

import type { Course } from "@/lib/types";

export default function AiCourses({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-2 capitalize">AI courses</h2>
      <p className="text-moss-700 mb-8 max-w-[68ch]">
        Courses I&apos;ve completed on building and shipping AI systems.
      </p>

      <ol className="divide-y divide-pine-950/10 border-y border-pine-950/10">
        {courses.map((course) => (
          <li key={course.id} className="flex gap-4 py-5">
            <GraduationCap className="w-5 h-5 text-brass-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono font-semibold">{course.title}</h3>
              <p className="text-moss-800 leading-relaxed mt-1 max-w-[68ch]">
                {course.description}
              </p>
              <ul className="flex flex-wrap gap-1.5 mt-3">
                {course.topics.map((topic) => (
                  <li
                    key={topic}
                    className="font-mono text-xs px-2 py-0.5 rounded bg-mist text-moss-800"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              {course.certificateUrl && (
                <a
                  href={course.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-brass-700 hover:text-brass-800 underline underline-offset-4 decoration-brass-400/60"
                >
                  <Award className="w-4 h-4" />
                  View certificate
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
