import { Mail, MapPin } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "./icons";
import type { Profile } from "@/lib/types";

export default function Contact({ profile }: { profile: Profile }) {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...profile.socials.map((social) => ({
      icon: social.label === "LinkedIn" ? LinkedinIcon : GithubIcon,
      label: social.label,
      value: social.value,
      href: social.href,
    })),
  ];

  return (
    <section id="contact" className="px-6 sm:px-12 py-10">
      <h2 className="font-mono font-semibold text-xl mb-2">Contact</h2>
      <p className="text-moss-700 max-w-[60ch] mb-8">
        I&apos;m available for consulting and senior full-time roles. Tell me what you&apos;re working on.
      </p>

      <ul className="max-w-xl divide-y divide-pine-950/10 border-y border-pine-950/10">
        {contactLinks.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 group"
            >
              <Icon className="w-4 h-4 text-brass-700" />
              <span className="text-sm text-moss-600 w-20">{label}</span>
              <span className="text-sm text-moss-800 group-hover:text-pine-950 group-hover:underline underline-offset-4 break-all">
                {value}
              </span>
            </a>
          </li>
        ))}
        <li className="flex items-center gap-3 py-3">
          <MapPin className="w-4 h-4 text-brass-700" />
          <span className="text-sm text-moss-600 w-20">Location</span>
          <span className="text-sm text-moss-800">{profile.location}</span>
        </li>
      </ul>
    </section>
  );
}
