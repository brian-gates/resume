import { jsPDF } from "jspdf";
import { resumeData } from "~/data/resume";

export const dynamic = "force-static";

type Contact = {
  email: string;
  phone: string;
  github: string;
  website: string;
};

type HeaderData = {
  name: string;
  title: string;
  contact: Contact;
};

type SkillsData = {
  expert: string[];
  intermediate: string[];
};

type JobExperience = {
  company: string;
  position: string;
  period: string;
  achievements: string[];
};

export async function GET() {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const maxY = pageHeight - margin;

  pdf.setFont("helvetica");

  const { name, title, contact, summary, skills, experience } = resumeData;

  // Initial setup
  const initialY = margin;

  // Add content in a functional way
  const yAfterHeader = addHeader(
    pdf,
    { name, title, contact },
    margin,
    initialY
  );
  const yAfterSummary = addSummary(pdf, summary, margin, yAfterHeader);
  const yAfterSkills = addSkills(pdf, skills, margin, pageWidth, yAfterSummary);
  addExperience(pdf, experience, margin, pageWidth, maxY, yAfterSkills);

  const pdfBuffer = pdf.output();

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=brian-gates-resume.pdf",
    },
  });
}

// Pure function to add the header section
function addHeader(pdf: jsPDF, data: HeaderData, x: number, y: number): number {
  const { name, title, contact } = data;

  // Add name
  pdf.setFontSize(24);
  pdf.text(name, x, y);
  const yAfterName = y + 10;

  // Add title
  pdf.setFontSize(16);
  pdf.text(title, x, yAfterName);
  const yAfterTitle = yAfterName + 10;

  // Add contact info
  pdf.setFontSize(11);
  pdf.text(`Email: ${contact.email}`, x, yAfterTitle);
  const yAfterEmail = yAfterTitle + 6;

  pdf.text(`Phone: ${contact.phone}`, x, yAfterEmail);
  const yAfterPhone = yAfterEmail + 6;

  pdf.text(`GitHub: ${contact.github}`, x, yAfterPhone);
  const yAfterGithub = yAfterPhone + 6;

  pdf.text(`Website: ${contact.website}`, x, yAfterGithub);
  const yAfterContact = yAfterGithub + 12;

  return yAfterContact;
}

// Pure function to add the summary section
function addSummary(pdf: jsPDF, summary: string, x: number, y: number): number {
  pdf.setFontSize(14);
  pdf.text("Summary", x, y);
  const yAfterSummaryHeader = y + 6;

  pdf.setFontSize(11);
  pdf.text(summary, x, yAfterSummaryHeader);
  const yAfterSummaryText = yAfterSummaryHeader + 12;

  return yAfterSummaryText;
}

// Pure function to add the skills section
function addSkills(
  pdf: jsPDF,
  skills: SkillsData,
  x: number,
  pageWidth: number,
  y: number
): number {
  pdf.setFontSize(14);
  pdf.text("Skills", x, y);
  const yAfterSkillsHeader = y + 6;

  // Expert skills
  pdf.setFontSize(11);
  const expertText = `Expert: ${skills.expert.join(", ")}`;
  const expertLines = pdf.splitTextToSize(expertText, pageWidth - 2 * x);
  pdf.text(expertLines, x, yAfterSkillsHeader);
  const yAfterExpertSkills = yAfterSkillsHeader + expertLines.length * 6;

  // Intermediate skills
  const intermediateText = `Intermediate: ${skills.intermediate.join(", ")}`;
  const intermediateLines = pdf.splitTextToSize(
    intermediateText,
    pageWidth - 2 * x
  );
  pdf.text(intermediateLines, x, yAfterExpertSkills);
  const yAfterIntermediateSkills =
    yAfterExpertSkills + intermediateLines.length * 6 + 6;

  return yAfterIntermediateSkills;
}

// Pure function that handles a single job
function addJob(
  pdf: jsPDF,
  job: JobExperience,
  x: number,
  pageWidth: number,
  maxY: number,
  y: number
): number {
  // Check if we need a new page
  const updatedY = y > maxY - 20 ? startNewPage(pdf, x) : y;

  // Handle company and position
  pdf.setFontSize(12);
  pdf.text(`${job.company} - ${job.position}`, x, updatedY);
  const yAfterJobTitle = updatedY + 6;

  // Handle period
  const periodText = job.period.replace(/–/g, "-");
  pdf.setFontSize(10);
  pdf.text(periodText, x, yAfterJobTitle);
  const yAfterPeriod = yAfterJobTitle + 6;

  // Handle achievements (recursive)
  const yAfterAchievements = addAchievements(
    pdf,
    job.achievements,
    x,
    pageWidth,
    maxY,
    yAfterPeriod
  );

  return yAfterAchievements + 8;
}

// Recursive function to add all jobs
function addExperience(
  pdf: jsPDF,
  experience: JobExperience[],
  x: number,
  pageWidth: number,
  maxY: number,
  y: number
): number {
  pdf.setFontSize(14);
  pdf.text("Experience", x, y);
  const yAfterExperienceHeader = y + 10;

  // Use reduce to track y position through each job
  return experience.reduce(
    (currentY, job) => addJob(pdf, job, x, pageWidth, maxY, currentY),
    yAfterExperienceHeader
  );
}

// Helper to add a single achievement
function addAchievement(
  pdf: jsPDF,
  achievement: string,
  x: number,
  pageWidth: number,
  maxY: number,
  y: number
): number {
  // Check if we need a new page
  const updatedY = y > maxY - 10 ? startNewPage(pdf, x) : y;

  // Clean the text for PDF rendering
  const cleanAchievement = achievement
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/–/g, "-");

  // Split long text to handle proper wrapping
  const splitText = pdf.splitTextToSize(
    `- ${cleanAchievement}`,
    pageWidth - 2 * x - 5
  );

  pdf.text(splitText, x + 5, updatedY);
  return updatedY + splitText.length * 5;
}

// Recursive function to add all achievements
function addAchievements(
  pdf: jsPDF,
  achievements: string[],
  x: number,
  pageWidth: number,
  maxY: number,
  y: number
): number {
  return achievements.reduce(
    (currentY, achievement) =>
      addAchievement(pdf, achievement, x, pageWidth, maxY, currentY),
    y
  );
}

// Helper to start a new page and return the top margin
function startNewPage(pdf: jsPDF, margin: number): number {
  pdf.addPage();
  return margin;
}
