import type { Project } from "../types";

// Project history from the CV (Md_Rabiul_Hassan_Mahmud.pdf), newest first.
// Add github/live links where they can be shared.
export const projects: Project[] = [
  {
    id: "drone-delivery-webshop",
    title: "Drone Delivery – Webshop",
    context: "Rakuten Inc, Japan · Senior Software Engineer · Jan 2021 – Present",
    description:
      "Large-scale e-commerce frontend for Rakuten's drone delivery service in the Japanese market. Led the JavaScript-to-TypeScript migration and improved site performance by 30%.",
    tags: [
      "React",
      "TypeScript",
      "ASP.NET",
      "Redux",
      "React Testing Library",
      "Webpack",
      "Azure DevOps",
      "Figma",
    ],
    featured: true,
  },
  {
    id: "drone-delivery-service-management",
    title: "Drone Delivery – Service Management System",
    context: "Rakuten Inc, Japan · Senior Software Engineer · Jan 2020 – Present",
    description:
      "Internal service-management system supporting Rakuten's drone delivery operations; built reusable, state-managed (MobX) UI components for large-scale use.",
    tags: [
      "React",
      "TypeScript",
      "ASP.NET",
      "MobX",
      "React Testing Library",
      "Webpack",
      "Azure DevOps",
      "Figma",
    ],
    featured: true,
  },
  {
    id: "locotetsu-railway-platform",
    title: "Locotetsu – Railway Platform",
    context: "Archeco Inc, Japan · Lead Senior Software Engineer · Sep – Dec 2019",
    description:
      "Railway information website for travellers and inbound visitors to Japan.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
    featured: false,
  },
  {
    id: "qr-payment-server",
    title: "QR Payment Server",
    context: "IT Access, Japan · Senior Software Engineer · Jun – Aug 2019",
    description:
      "QR-based payment server powering Japanese vending machines; supported Rakuten Pay, AliPay, MerPay and StarPay.",
    tags: ["PHP", "Laravel", "Oracle SQL Server", "REST API"],
    featured: false,
  },
  {
    id: "sony-msx-blog",
    title: "Sony MSX Blog",
    context: "Sony Music Entertainment, Japan · Lead Sr. Software Engineer · Mar – May 2019",
    description: "Music blog platform built for Sony Music Entertainment, Japan.",
    tags: ["PHP", "WordPress", "MySQL"],
    featured: false,
  },
  {
    id: "pocketalk-link",
    title: "Pocketalk Link",
    context: "SourceNext, Japan · Senior Software Engineer · Oct 2018 – Mar 2019",
    description:
      "Web application integrating a Speech Recognition (SRE) API to enhance communication workflows.",
    tags: ["PHP", "Laravel", "Vue.js", "MySQL"],
    featured: false,
  },
  {
    id: "microfinance-software",
    title: "Micro-Finance & Micro-Credit Software",
    context: "European Client (NDA) · Lead Software Engineer · Oct 2017 – Sep 2018",
    description:
      "Micro-finance and micro-credit management software delivered for an NGO operating 90 branches nationwide.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
    featured: false,
  },
  {
    id: "ambala-erp",
    title: "Ambala ERP",
    context: "European Client (NDA) · Lead Software Engineer · Mar – Sep 2017",
    description:
      "Enterprise resource planning suite covering Inventory, Fixed Asset Management, Procurement, HR & Payroll and Accounting.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
    featured: false,
  },
  {
    id: "ambala-pos",
    title: "Ambala Social Enterprise – POS",
    context: "European Client (NDA) · Lead Software Engineer · Oct 2016 – Feb 2017",
    description: "Point-of-sale system built for a social enterprise.",
    tags: ["PHP", "MySQL", "JavaScript"],
    featured: false,
  },
];
