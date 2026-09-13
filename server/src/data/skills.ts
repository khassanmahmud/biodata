import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 94 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 82 },
    ],
  },
  {
    title: "Backend",
    color: "from-indigo-500 to-violet-500",
    skills: [
      { name: "Node.js", level: 97 },
      { name: "Python / Django", level: 88 },
      { name: "Go", level: 80 },
      { name: "Java / Spring", level: 78 },
    ],
  },
  {
    title: "Data & Infra",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "PostgreSQL / MySQL", level: 92 },
      { name: "Redis / Elasticsearch", level: 85 },
      { name: "MongoDB", level: 83 },
      { name: "AWS / GCP", level: 88 },
    ],
  },
  {
    title: "DevOps & Tools",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Docker / Kubernetes", level: 87 },
      { name: "CI/CD (GitHub Actions)", level: 90 },
      { name: "Terraform / IaC", level: 80 },
      { name: "Linux / Bash", level: 93 },
    ],
  },
];

export const techBadges: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Java",
  "PostgreSQL",
  "Redis",
  "MongoDB",
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST APIs",
  "Terraform",
  "CI/CD",
  "Microservices",
  "gRPC",
  "WebSockets",
  "Kafka",
  "Redis Streams",
  "Nginx",
  "Linux",
];
