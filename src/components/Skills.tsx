import type { SkillCategory } from "@/lib/types";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="font-mono text-xs px-2 py-0.5 rounded bg-mist text-moss-800">
      {children}
    </li>
  );
}

export default function Skills({
  categories,
  techBadges,
}: {
  categories: SkillCategory[];
  techBadges: string[];
}) {
  return (
    <section id="skills" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-6">Skills</h2>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h3 className="font-mono font-medium text-brass-700 mb-3">
              {cat.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="font-mono font-medium text-brass-700 mt-10 mb-3">
        Also comfortable with
      </h3>
      <ul className="flex flex-wrap gap-1.5">
        {techBadges.map((tech) => (
          <li
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded border border-pine-950/15 text-moss-800"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
