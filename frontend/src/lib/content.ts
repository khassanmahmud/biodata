import type {
  Course,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "./types";

// Site content, bundled into the static export.

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

export const skillCategories: SkillCategory[] = [
  {
    title: "AI",
    skills: [
      "Multi-agent systems",
      "Model Context Protocol (MCP)",
      "Claude Code",
      "OpenAI Codex",
      "Amazon Bedrock",
      "n8n",
      "ElevenLabs",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Redux",
      "MobX",
      "Material UI",
      "PWA",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "ASP.NET Core",
      "FastAPI",
      "REST APIs",
      "PHP",
      "Laravel",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS Lambda",
      "API Gateway",
      "S3",
      "CloudFront",
      "Terraform",
      "GitHub Actions",
      "Azure",
      "Docker",
    ],
  },
  {
    title: "Data",
    skills: ["MySQL", "MS SQL Server"],
  },
  {
    title: "Testing",
    skills: ["React Testing Library", "Unit testing", "Integration testing"],
  },
];

export const techBadges: string[] = [
  "Git",
  "GitHub",
  "Bitbucket",
  "npm",
  "Yarn",
  "Webpack",
  "Vite",
  "Jira",
  "Confluence",
  "Figma",
  "Agile",
  "Scrum",
];

export const experiences: Experience[] = [
  {
    id: "bjit-senior-software-manager",
    role: "Senior Software Manager, Team Lead",
    company: "BJIT Inc",
    url: "",
    period: "Aug 2023 – Present",
    location: "Tokyo, Japan",
    type: "Full-time",
    description:
      "Leading an AI-first full-stack team building with TypeScript, React, Next.js, Express, AWS and Terraform.",
    highlights: [],
    tech: ["TypeScript", "React", "Next.js", "Express", "AWS", "Terraform"],
  },
  {
    id: "bjit-principal-software-engineer",
    role: "Principal Software Engineer, Team Lead",
    company: "BJIT Ltd",
    url: "",
    period: "Jul 2022 – Aug 2023",
    location: "Bangladesh",
    type: "Full-time",
    description: "",
    highlights: [],
    tech: [],
  },
  {
    id: "bjit-senior-software-engineer",
    role: "Senior Software Engineer",
    company: "BJIT Ltd",
    url: "",
    period: "Oct 2018 – Jun 2022",
    location: "Bangladesh",
    type: "Full-time",
    description: "Built web applications for Japanese clients and users.",
    highlights: [
      "Integrated a speech recognition API into a web app for Japanese users",
      "Built a music blog for a Japanese client",
      "Worked on QR code payments for Japanese vending machines",
      "Built a railway information website for people planning to visit Japan",
      "Improved performance of an e-commerce site for the Japanese market by 30%",
      "Migrated a JavaScript React project to TypeScript",
    ],
    tech: ["React", "TypeScript", "JavaScript"],
  },
  {
    id: "ambala-it",
    role: "Software Engineer, Team Lead",
    company: "Ambala IT",
    url: "",
    period: "Oct 2016 – Sep 2018",
    location: "Bangladesh",
    type: "Full-time",
    description:
      "Technical lead of a 7-person team building ERP and microfinance software.",
    highlights: [
      "Led the ERP and microfinance development team from 2015",
      "Built a large ERP system with 5 modules: inventory, fixed asset management, procurement, HR and payroll, and accounting",
      "Built microfinance software for an NGO",
      "Managed Linux CentOS servers",
    ],
    tech: ["Linux", "CentOS"],
  },
  {
    id: "upwork",
    role: "Frontend Developer",
    company: "Upwork",
    url: "",
    period: "Sep 2015 – Sep 2016",
    location: "Bangladesh",
    type: "Freelance",
    description: "Built frontend projects for clients.",
    highlights: [
      "Built frontend projects with HTML5, CSS3, JavaScript and jQuery",
      "Built and customized WordPress sites with the Unyson framework",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery", "WordPress"],
  },
  {
    id: "orangebd",
    role: "Software Engineer",
    company: "Orange Business Development Ltd. (Orangebd)",
    url: "",
    period: "Dec 2012 – Aug 2015",
    location: "Bangladesh",
    type: "Full-time",
    description:
      "Built websites and web applications, and led the quality control team.",
    highlights: [
      "Built websites with WordPress and a custom CMS",
      "Built custom web applications with PHP, MySQL, JavaScript, jQuery, AJAX and JSON",
      "Led the quality control team as Head of QC",
      "Led a team of junior software engineers",
      "Supervised the outsourcing department",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "jQuery", "WordPress"],
  },
  {
    id: "software-address",
    role: "Programmer",
    company: "Software Address",
    url: "",
    period: "Jan 2012 – Nov 2012",
    location: "Bangladesh",
    type: "Full-time",
    description: "Built websites and custom PHP software.",
    highlights: [
      "Converted PSD designs to HTML and HTML to WordPress themes",
      "Built custom software with PHP and MySQL",
      "Built websites with WordPress, Joomla and Drupal",
      "Redesigned and maintained client websites",
    ],
    tech: ["PHP", "MySQL", "WordPress", "Joomla", "Drupal"],
  },
  {
    id: "untitled-it-solutions",
    role: "Web Developer",
    company: "Untitled IT Solutions",
    url: "",
    period: "Sep 2011 – Dec 2011",
    location: "Bangladesh",
    type: "Full-time",
    description: "Built and customized WordPress websites.",
    highlights: [
      "Converted PSD designs to HTML and HTML to WordPress themes",
      "Customized WordPress and WordPress plugins",
      "Redesigned and maintained client websites",
    ],
    tech: ["WordPress", "HTML", "CSS"],
  },
];

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

// AI courses completed, from the certifications on the résumé.
export const courses: Course[] = [
  {
    id: "ai-builder-n8n",
    title: "AI Builder: Create Agents, Voice Agents & Automations in n8n",
    description:
      "Building AI agents, voice agents and workflow automations with n8n.",
    topics: ["AI agents", "Voice agents", "Automation", "n8n"],
    certificateUrl:
      "https://www.udemy.com/certificate/UC-a088342e-9b91-4b2e-8257-05d6aab5c2c5/",
  },
  {
    id: "ai-engineer-production-track",
    title: "AI Engineer Production Track: Deploy LLMs",
    description: "Taking large language model applications into production.",
    topics: ["LLMs", "Deployment", "Production"],
    certificateUrl:
      "https://www.udemy.com/certificate/UC-207e31f5-072c-49b2-a105-90982bb624ab/",
  },
  {
    id: "ai-coder-claude-code",
    title: "AI Coder: Complete Claude Code & Coding Agents Course",
    description:
      "Writing software with Claude Code and other AI coding agents.",
    topics: ["Claude Code", "Coding agents", "AI-assisted development"],
    certificateUrl:
      "https://www.udemy.com/certificate/UC-59f12ae8-2f09-4ecf-8126-2b89e350fe83/",
  },
];
