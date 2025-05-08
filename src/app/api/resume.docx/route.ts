import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { resumeData } from "~/data/resume";

export const dynamic = "force-static";

export async function GET() {
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
          new Paragraph({
            children: [new TextRun(`Website: ${contact.website}`)],
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

  const buffer = await Packer.toBuffer(doc);

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=brian-gates-resume.docx",
    },
  });
}
