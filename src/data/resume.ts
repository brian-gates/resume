export type ResumeData = {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    website: string;
    linkedin: string;
  };
  summary: string;
  skills: {
    expert: string[];
    intermediate: string[];
  };
  experience: {
    company: string;
    position: string;
    period: string;
    description?: string;
    achievements: string[];
  }[];
};

export const resumeData: ResumeData = {
  name: "Brian Gates",
  title: "Staff Software Engineer",
  contact: {
    email: "brian.g.gates@gmail.com",
    phone: "(949)280-4708",
    github: "https://github.com/brian-gates",
    website: "https://briangates.me",
    linkedin: "https://www.linkedin.com/in/briangates/",
  },
  summary:
    "Building mission critical software with web technologies since 2006. Now building it with a supervised fleet of AI coding agents.",
  skills: {
    expert: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Claude Code",
      "MCP",
      "AI agent orchestration",
      "React Three Fiber",
      "Temporal",
      "Zod",
      "Tailwind CSS",
      "CSS",
      "HTML",
      "RESTful APIs",
      "Git",
      "UI",
      "UX",
      "A11y",
      "CI/CD",
      "Datadog",
    ],
    intermediate: [
      "Azure",
      "C#",
      "C++",
      "Electron",
      "ETL",
      "GraphQL",
      "MySQL",
      "Neo4j",
      "Nest.js",
      "OAuth",
      "PHP",
      "Playwright",
      "PostgreSQL",
      "Python",
      "Ruby on Rails",
      "Star Schema",
    ],
  },
  experience: [
    {
      company: "Machina Labs",
      position: "Senior Software Engineer",
      period: "December 2025 - present",
      description:
        "Building the production web app that plans robotic sheet metal forming at Machina Labs.",
      achievements: [
        "Shipped path planning and slice workflow UIs on Temporal, with 3D toolpath visualization in React Three Fiber",
        "Architected a unified Next.js 16 app from a multi-repo codebase, with Azure AD OAuth and an MCP server for AI agent access",
        "Run a fleet of roughly 30 AI coding agents, each on its own Jira ticket, git worktree, branch, pull request, and preview environment. Throughput rose about 3x, from roughly 5 merged PRs a week to 15 to 30",
        "Automated the release path end to end, from version bump and changelog to production slot swap and Jira reconciliation",
        "Integrated Datadog RUM and APM, and enforced Zod validation at every API boundary",
      ],
    },
    {
      company: "Dataplor",
      position: "Senior Software Engineer",
      period: "June 2025 - December 2025",
      description:
        "Built Dataplor's SaaS platform for point of interest and visitation data analysis.",
      achievements: [
        "Built Hermes, an MCP (Model Context Protocol) server enabling AI-powered data filtering with tool-assisted querying for brands, areas, and business categories",
        "Integrated Hermes MCP server into dataplor-api's AI search endpoint, enabling intelligent tool-assisted filtering in the platform application",
        "Demonstrated MCP integration with third-party clients (Cursor) and built reference implementation using Vercel's AI SDK for HTTP and streaming CLI interfaces",
        "Implemented Microsoft Entra ID multi-tenant authentication with Datadog and Sentry monitoring for authentication tracking and error management",
        "Built comprehensive brand performance analytics dashboard in Next.js/TypeScript featuring same-store performance analysis, year-over-year trend visualization, and store-level breakdowns",
        "Designed and implemented weighted average calculations and multi-axis visualizations showing total brand vs same-store traffic trends alongside store count evolution",
        "Optimized dashboard performance from 2 minutes (existing APIs) to 8 seconds (SQL queries) to 50ms by architecting ETL pipelines in Ruby on Rails with Star Schema data modeling",
      ],
    },
    {
      company: "Yardzen",
      position: "Staff Software Engineer",
      period: "March 2024 - May 2025",
      description:
        "Built the next generation of Yardzen's website and marketing platform.",
      achievements: [
        "Replatformed the marketing site from WordPress to Next.js, deployed on Cloud Run via GitHub Actions and Nx",
        "Integrated Contentful so non-engineering teams could publish pages themselves, cutting the release cycle from weeks to hours",
        "Built a new onboarding quiz that doubled the conversion rate of its predecessor",
        "Built marketing funnels including Contractor Connect (200 leads at 9% conversion in its first month) and a Lowe's partnership page (3.6k visitors and 109 add-to-carts in two weeks)",
        "Established a design system and Storybook with design and marketing, built to WCAG accessibility guidelines",
        "Championed AI tooling like Cursor, establishing rules for AI, adding MCP integrations, and promoting best practices for using AI agents to write code",
      ],
    },
    {
      company: "Hadrian",
      position: "Senior Software Engineer",
      period: "Oct 2023 - Feb 2024",
      description:
        "Built internal workflow management software for manufacturing.",
      achievements: [
        "Helped build and release version two of Hadrian's internal workflow management software that guides all aspects of the factory's execution to build high precision parts for aerospace and aeronautics",
        "Built visual Node-based workflow editor with Xyflow (formerly React Flow)",
        "Crafted responsive UIs from Figma designs in Next.js/React with TailwindCSS, Radix, and ShadUI",
        "Created type-safe forms with helpful validations using Zod, React-hook-forms, and TypeScript",
        "Ensured system observability by working with infrastructure team to integrate Next.js and Datadog for visibility into spans, traces, errors, logs, and session replays",
        "Collaborated with backend teams to negotiate API endpoints' proto specifications",
        "Gathered feedback from users to implement features and improvements",
      ],
    },
    {
      company: "Dollar Shave Club",
      position: "Software Engineering Manager",
      period: "Feb 2020 - April 2023",
      description: "Managed Frontend and Backend engineering teams.",
      achievements: [
        "Reduced average time to response from weeks to hours by implementing a new engineering incident response process",
        "Reduced average number of errors per session by 75% by improving observability tooling and triage process",
        "Onboarded and offboarded third party engineering teams, established new processes and team structures to facilitate productive collaboration",
        "Interviewed, hired, and onboarded new engineers",
        "Held regular one on ones with engineers to discuss goals, growth, and career advancement",
        "Oversaw migration of site to a new platform, reducing engineering overhead and total staff count",
        "Orchestrated holiday events, parties, and game nights to boost morale. Two time winner of Top Tacos award for keeping it fun",
        "Mentored engineers with regular code pairings and learning activities",
      ],
    },
    {
      company: "Dollar Shave Club",
      position: "Senior Software Engineer",
      period: "Feb 2018 - Feb 2020",
      description: "Developed dollarshaveclub.com and internal tooling.",
      achievements: [
        "Worked with the Frontend team to upgrade the site experience to the latest Web Content Accessibility Guidelines standards",
        "Worked with the Data team to ensure functional business analytics and reporting",
        "Ran A/B tests to measure the impact of UX changes",
        "Maintained and added features to internal tooling",
        "Rebuilt checkout experience from JavaScript to TypeScript and 0 to 100% test coverage",
        "Paired with Backend team engineers to discuss API changes",
        "Partnered with design team to establish a common design language",
        "Integrated Contentful to enable the Product team to rapidly roll out new landing pages",
      ],
    },
    {
      company: "Codex Digital",
      position: "Senior Software Engineer",
      period: "Jun 2013 - Oct 2017",
      description:
        "Built digital asset management software for Netflix and Marvel.",
      achievements: [
        "Collaborated with the core team to implement a shot pull system used by Marvel using Node, Express, Neo4j, and Redis for the REST API, and Ember.js for the UI",
        "Created cross-platform desktop application to facilitate uploading media to Netflix's Asset Ingestion API using Electron, React, Node, and CouchDB",
        "Created a reporting system to track and verify shot archival used by Shed using Node, Express, Neo4j, Redis, wkhtmltopdf, and Ember.js",
        "Created a lens tracking database using Node.js, Ember.js, Neo4j, and Redis",
        "Implemented workflow tools such as JIRA, GitHub, Slack, and Travis CI, to help team organization, communication, and development flow",
        "Worked closely with a security team to ensure software always met highest security standards, including code audits and penetration testing",
      ],
    },
    {
      company: "5th Kind",
      position: "Lead Software Engineer",
      period: "Jun 2009 - Jun 2013",
      description:
        "Built digital asset management software used by Marvel, Toyota, and other major brands.",
      achievements: [
        "Engineered proprietary front-end extensible component-based JS framework",
        "Assisted in building a proprietary component-based PHP framework",
        "Maintained and extended custom ORM, including applying an optimization that reduced memory usage by ~85%",
        "Worked with the team to refine development processes, discuss development ideas, and encourage high morale and productivity",
        "Worked closely with management to set and achieve realistic goals and expectations",
        "Ensured code met and maintained high security standards, including security audits and penetration tests",
      ],
    },
  ],
};
