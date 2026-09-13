import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "cloudpay-gateway",
    title: "CloudPay Gateway",
    description:
      "High-throughput payment processing platform handling £5M+ daily transactions. Built with event-driven architecture for reliability and horizontal scalability.",
    image: null,
    tags: ["Node.js", "Kafka", "PostgreSQL", "Redis", "Docker"],
    github: "#",
    live: "#",
    featured: true,
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
    accent: "indigo",
  },
  {
    id: "devcollab-saas",
    title: "DevCollab SaaS",
    description:
      "Real-time collaborative development environment with live code sharing, integrated CI/CD pipelines, and AI-assisted code review.",
    image: null,
    tags: ["Next.js", "WebSockets", "Go", "Kubernetes", "AWS"],
    github: "#",
    live: "#",
    featured: true,
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    accent: "violet",
  },
  {
    id: "analyticsforge",
    title: "AnalyticsForge",
    description:
      "Data analytics dashboard built for enterprise clients. Ingests millions of events per day with sub-second query responses via smart caching layers.",
    image: null,
    tags: ["React", "D3.js", "Python", "ClickHouse", "Redis"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-purple-600/20 via-pink-600/10 to-transparent",
    accent: "purple",
  },
  {
    id: "openauth",
    title: "OpenAuth",
    description:
      "Open-source OAuth 2.0 / OpenID Connect identity server with PKCE, MFA, and social login support. 1.2k GitHub stars.",
    image: null,
    tags: ["Go", "JWT", "PostgreSQL", "Docker"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-pink-600/20 via-rose-600/10 to-transparent",
    accent: "pink",
    stars: 1200,
  },
  {
    id: "shopstream",
    title: "ShopStream",
    description:
      "Headless e-commerce engine with real-time inventory, AI product recommendations, and Stripe checkout integration.",
    image: null,
    tags: ["Next.js", "Stripe", "Elasticsearch", "Prisma"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    accent: "blue",
  },
  {
    id: "infrakit-cli",
    title: "InfraKit CLI",
    description:
      "Developer-friendly CLI tool for scaffolding cloud-native infrastructure using Terraform and Helm. Used by 500+ developers.",
    image: null,
    tags: ["Go", "Terraform", "Helm", "Kubernetes", "AWS"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-cyan-600/20 via-teal-600/10 to-transparent",
    accent: "cyan",
  },
];
