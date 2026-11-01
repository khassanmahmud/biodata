import type { Profile } from "../types";

export const profile: Profile = {
  name: "Md. Rabiul Hassan Mahmud",
  initials: "RA",
  title: "AI-first Full Stack Engineer",
  tagline:
    "15 years in software development. I lead a full-stack team at BJIT in Tokyo, building with TypeScript, React, Next.js, Express, AWS and Terraform.",
  roles: [
    "Full-stack web apps with TypeScript, React and Next.js",
    "APIs with Node.js, Express, ASP.NET Core and FastAPI",
    "AWS infrastructure managed with Terraform",
    "AI agents and automation with Claude Code, Codex, MCP and n8n",
    "Leading engineering teams since 2015",
  ],
  location: "Tokyo, Japan",
  email: "hassanmahmud.sa@gmail.com",
  summary: [
    "I've been building software for 15 years, starting with PHP and WordPress sites in Bangladesh in 2011 and moving through ERP and microfinance systems to full-stack products for the Japanese market.",
    "Since 2018 I've worked at BJIT, first in Bangladesh and now in Tokyo, where I'm a Senior Software Manager and team lead. My work there has included speech recognition in a web app, QR payments for vending machines, and a 30% performance improvement on an e-commerce site.",
    "I work AI-first: multi-agent systems, the Model Context Protocol, Claude Code and OpenAI Codex are part of how my team designs and ships software.",
  ],
  stats: [
    { value: "15", label: "Years in software" },
    { value: "2015", label: "Leading teams since" },
    { value: "8", label: "Roles at 6 companies" },
    { value: "Tokyo", label: "Based in" },
  ],
  socials: [
    {
      label: "GitHub",
      value: "github.com/khassanmahmud",
      href: "https://github.com/khassanmahmud",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/khassanmahmud",
      href: "https://www.linkedin.com/in/khassanmahmud",
    },
  ],
  education: [
    {
      school: "International Islamic University Chittagong",
      degree: "BSc Engineering, Computer and Communication Engineering",
    },
  ],
  certifications: [
    "AI Builder: Create Agents, Voice Agents & Automations in n8n",
    "AI Coder: Complete Claude Code & Coding Agents Course",
    "AI Engineer Production Track: Deploy LLMs",
    "GitHub Actions: The Complete Guide",
    "Build ASP.NET Core Web API: Scratch to Finish (.NET 8)",
  ],
  languages: [
    { name: "English", level: "Full professional" },
    { name: "Japanese", level: "Limited working" },
  ],
};
