import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import fs from "fs";
import { jsPDF } from "jspdf";
import path from "path";
import { fileURLToPath } from "url";

// Hard-code the resume data here to avoid TypeScript import issues
const resumeData = {
  name: "Brian Gates",
  title: "Staff Software Engineer",
  contact: {
    email: "brian.g.gates@gmail.com",
    phone: "(949)280-4708",
    github: "https://github.com/brian-gates",
  },
  summary:
    "Building mission critical software and tools with web technologies since 2006.",
  skills: {
    expert: [
      "TypeScript",
      "React",
      "JavaScript",
      "CSS",
      "HTML",
      "Node.js",
      "RESTful APIs",
      "Git",
      "UI",
      "UX",
      "A11y",
      "Express",
      "CI/CD",
      "Next.js",
    ],
    intermediate: [
      "C#",
      "C++",
      "Electron",
      "GraphQL",
      "MySQL",
      "Neo4j",
      "Nest.js",
      "OAuth",
      "PHP",
      "PostgreSQL",
      "Python",
    ],
  },
  experience: [
    {
      company: "Yardzen",
      position: "Staff Software Engineer",
      period: "March 2024 – present",
      achievements: [
        "Led the replatforming from WordPress to Next.js, integrated Contentful for seamless content updates, and developed key marketing projects, contributing to significant user engagement and conversion rates",
        "Replatformed from slow WordPress to blazing-fast Next.js, deploying on CloudRun via GitHub Actions and Nx",
        "Integrated Contentful, enabling non-engineering teams to create and update pages independently, reducing the release cycle from weeks to hours",
        "Developed Lowe's Partnership page for a 750k email blast campaign, resulting in 3.6k visitors and 109 add-to-carts in two weeks",
        "Created Contractor Connect marketing funnel, generating 200 leads and a 9% conversion rate in the first month",
        "Established a Design System with design and marketing, including Iconography and Colors pages, leading to a more consistent user experience",
        "Created a Storybook for documenting implemented components, leading to increased re-use by Product and Design teams",
        "Ensured accessibility compliance by implementing best practices and adhering to WCAG guidelines",
        "Trained junior team members and created extensive documentation for knowledge transfer",
      ],
    },
    {
      company: "Hadrian",
      position: "Senior Software Engineer",
      period: "Oct 2023 – Feb 2024",
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
      description: "Led the R&D team on various projects.",
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
        "Led the team in the development and maintenance of their Digital Asset Management software.",
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

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the downloads directory exists
const downloadsDir = path.join(__dirname, "../public/downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Generate JSON file
async function generateJSON() {
  const filePath = path.join(downloadsDir, "brian-gates-resume.json");
  fs.writeFileSync(filePath, JSON.stringify(resumeData, null, 2));
  console.log(`✅ JSON file created: ${filePath}`);
}

// Generate plain text file
async function generateTXT() {
  const { name, title, contact, summary, skills, experience } = resumeData;

  let text = `${name}\n${title}\n\n`;
  text += `Contact Information:\n`;
  text += `Email: ${contact.email}\n`;
  text += `Phone: ${contact.phone}\n`;
  text += `GitHub: ${contact.github}\n\n`;

  text += `Summary:\n${summary}\n\n`;

  text += `Skills:\n`;
  text += `Expert: ${skills.expert.join(", ")}\n`;
  text += `Intermediate: ${skills.intermediate.join(", ")}\n\n`;

  text += `Experience:\n\n`;
  experience.forEach((job) => {
    // Convert en dashes to regular hyphens for consistent output
    const periodText = job.period.replace(/–/g, "-");
    text += `${job.company} - ${job.position}\n`;
    text += `${periodText}\n`;
    job.achievements.forEach((achievement) => {
      // Replace en dashes and use consistent bullet format
      const cleanAchievement = achievement.replace(/–/g, "-");
      text += `- ${cleanAchievement}\n`;
    });
    text += `\n`;
  });

  const filePath = path.join(downloadsDir, "brian-gates-resume.txt");
  fs.writeFileSync(filePath, text);
  console.log(`✅ Text file created: ${filePath}`);
}

// Generate PDF file
async function generatePDF() {
  // Create PDF with Unicode font support
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add a standard font with Unicode support
  pdf.setFont("helvetica");

  const { name, title, contact, summary, skills, experience } = resumeData;

  // Add name and title
  pdf.setFontSize(24);
  pdf.text(name, 20, 20);
  pdf.setFontSize(16);
  pdf.text(title, 20, 30);

  // Add contact info
  pdf.setFontSize(11);
  pdf.text(`Email: ${contact.email}`, 20, 40);
  pdf.text(`Phone: ${contact.phone}`, 20, 46);
  pdf.text(`GitHub: ${contact.github}`, 20, 52);

  // Add summary
  pdf.setFontSize(14);
  pdf.text("Summary", 20, 64);
  pdf.setFontSize(11);
  pdf.text(summary, 20, 70);

  // Add skills
  pdf.setFontSize(14);
  pdf.text("Skills", 20, 82);
  pdf.setFontSize(11);
  pdf.text(`Expert: ${skills.expert.join(", ")}`, 20, 88, { maxWidth: 170 });
  pdf.text(`Intermediate: ${skills.intermediate.join(", ")}`, 20, 104, {
    maxWidth: 170,
  });

  // Add experience
  pdf.setFontSize(14);
  pdf.text("Experience", 20, 120);

  let yPosition = 126;
  experience.forEach((job) => {
    // Handle company and position
    pdf.setFontSize(12);
    pdf.text(`${job.company} - ${job.position}`, 20, yPosition);
    yPosition += 6;

    // Handle period (replace en dash with regular hyphen for PDF)
    const periodText = job.period.replace(/–/g, "-");
    pdf.setFontSize(10);
    pdf.text(periodText, 20, yPosition);
    yPosition += 6;

    // Handle achievements
    job.achievements.forEach((achievement) => {
      // Clean the text for PDF rendering
      const cleanAchievement = achievement
        .replace(/'/g, "'")
        .replace(/'/g, "'")
        .replace(/–/g, "-");

      // Split long text to handle proper wrapping
      const splitText = pdf.splitTextToSize(`- ${cleanAchievement}`, 165);
      pdf.text(splitText, 25, yPosition);
      yPosition += splitText.length * 5;
    });

    yPosition += 8;
  });

  const filePath = path.join(downloadsDir, "brian-gates-resume.pdf");
  fs.writeFileSync(filePath, pdf.output());
  console.log(`✅ PDF file created: ${filePath}`);
}

// Generate DOCX file
async function generateDOCX() {
  const { name, title, contact, summary, skills, experience } = resumeData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Name and title
          new Paragraph({
            text: name,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({}),

          // Contact info
          new Paragraph({
            text: "Contact Information",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun(`Email: ${contact.email}`)],
          }),
          new Paragraph({
            children: [new TextRun(`Phone: ${contact.phone}`)],
          }),
          new Paragraph({
            children: [new TextRun(`GitHub: ${contact.github}`)],
          }),
          new Paragraph({}),

          // Summary
          new Paragraph({
            text: "Summary",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun(summary)],
          }),
          new Paragraph({}),

          // Skills
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Expert: ", bold: true }),
              new TextRun(skills.expert.join(", ")),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Intermediate: ", bold: true }),
              new TextRun(skills.intermediate.join(", ")),
            ],
          }),
          new Paragraph({}),

          // Experience
          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_3,
          }),
          ...experience.flatMap((job) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${job.company} - ${job.position}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun({ text: job.period, italics: true })],
            }),
            ...job.achievements.map(
              (achievement) =>
                new Paragraph({
                  children: [new TextRun("• " + achievement)],
                  indent: { left: 360 }, // ~0.5 inch indent
                })
            ),
            new Paragraph({}),
          ]),
        ],
      },
    ],
  });

  // Generate document buffer
  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join(downloadsDir, "brian-gates-resume.docx");
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ DOCX file created: ${filePath}`);
}

// Generate all resume formats
async function generateAll() {
  console.log("📄 Generating resume files...");

  try {
    await generateJSON();
    await generateTXT();
    await generatePDF();
    await generateDOCX();

    console.log("✅ All resume files generated successfully!");
  } catch (error) {
    console.error("❌ Error generating resume files:", error);
    process.exit(1);
  }
}

// Run the script
generateAll();
