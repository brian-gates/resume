import { resumeData } from "~/data/resume";

export const dynamic = "force-static";

export async function GET() {
  const { name, title, contact, summary, skills, experience } = resumeData;

  const sections = [
    `${name}\n${title}\n`,
    `Contact Information:
Email: ${contact.email}
Phone: ${contact.phone}
GitHub: ${contact.github}\n`,
    `Summary:
${summary}\n`,
    `Skills:
Expert: ${skills.expert.join(", ")}
Intermediate: ${skills.intermediate.join(", ")}\n`,
    `Experience:\n${experience
      .map((job) => {
        const periodText = job.period.replace(/–/g, "-");
        const achievements = job.achievements
          .map((achievement) => `- ${achievement.replace(/–/g, "-")}`)
          .join("\n");

        return `${job.company} - ${job.position}
${periodText}
${achievements}\n`;
      })
      .join("\n")}`,
  ];

  const text = sections.join("\n");

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": "attachment; filename=brian-gates-resume.txt",
    },
  });
}
