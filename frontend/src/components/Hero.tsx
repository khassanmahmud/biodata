import Image from "next/image";
import { MapPin } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./icons";
import type { Profile } from "@/lib/types";

export default function Hero({ profile }: { profile: Profile }) {
  const links = profile.socials.map((social) => ({
    icon: social.label === "LinkedIn" ? LinkedinIcon : GithubIcon,
    href: social.href,
    label: social.label,
  }));

  return (
    <section id="hero" className="px-6 sm:px-12 pt-10 sm:pt-12 pb-8">
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-10">
        <div className="flex-1 min-w-0">
          <h1 className="font-mono font-semibold text-3xl sm:text-4xl leading-tight tracking-tight uppercase">
            {profile.name}
          </h1>
          <p className="font-mono text-lg sm:text-xl text-brass-700 mt-2">
            {profile.title}
          </p>

          <p className="text-moss-700 text-base sm:text-lg leading-relaxed max-w-[60ch] mt-5">
            {profile.tagline}
          </p>

          <h2 className="font-mono font-semibold text-base mt-7 mb-2">
            What I do?
          </h2>
          <ul className="list-disc pl-5 marker:text-brass-500 text-moss-800 space-y-1">
            {profile.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>

          <p className="flex items-center gap-1.5 text-sm text-moss-600 mt-6">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </p>

          <ul className="flex flex-wrap gap-2 mt-4">
            {links.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-md border border-pine-950/15 text-moss-700 flex items-center justify-center hover:border-brass-500 hover:text-pine-950 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 self-start md:self-center">
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full p-1.5 bg-[conic-gradient(var(--color-brass-400),var(--color-sage-500),var(--color-fjord-500),var(--color-brass-400))]">
            <Image
              src="/image-me.jpeg"
              alt={`Portrait of ${profile.name}`}
              width={400}
              height={400}
              sizes="(min-width: 640px) 176px, 128px"
              loading="eager"
              className="w-full h-full rounded-full object-cover border-4 border-surface bg-pine-950"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
