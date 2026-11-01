import type { Profile } from "@/lib/types";

export default function About({ profile }: { profile: Profile }) {
  const { stats, summary, education, certifications, languages } = profile;

  return (
    <section id="about" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-6">About Me</h2>

      <div className="space-y-4 max-w-[68ch] text-moss-800 leading-relaxed">
        {summary.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-10 rounded-lg overflow-hidden border border-pine-950/10 bg-pine-950/10">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-surface px-4 py-4">
            <dt className="text-sm text-moss-600">{label}</dt>
            <dd className="font-mono font-semibold text-2xl mt-1">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid md:grid-cols-3 gap-x-10 gap-y-8 mt-10">
        <div>
          <h3 className="font-mono font-medium text-brass-700 mb-3">
            Education
          </h3>
          <ul className="space-y-3">
            {education.map(({ school, degree }) => (
              <li key={school}>
                <p className="font-medium">{school}</p>
                <p className="text-sm text-moss-700">{degree}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono font-medium text-brass-700 mb-3">
            Certifications
          </h3>
          <ul className="list-disc pl-5 marker:text-brass-500 space-y-1.5 text-sm text-moss-800">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono font-medium text-brass-700 mb-3">
            Languages
          </h3>
          <ul className="space-y-2">
            {languages.map(({ name, level }) => (
              <li key={name}>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-moss-700">{level}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
