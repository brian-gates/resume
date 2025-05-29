import { PrismaClient } from "@prisma/client";
import { resumeData } from "../src/data/resume";

const prisma = new PrismaClient();

async function main() {
  const resume = await prisma.resume.create({
    data: {
      name: resumeData.name,
      title: resumeData.title,
      email: resumeData.contact.email,
      phone: resumeData.contact.phone,
      github: resumeData.contact.github,
      website: resumeData.contact.website,
      summary: resumeData.summary,
    },
  });

  // Create skills and link to resume
  const skills = [];
  if (resumeData.skills?.expert) {
    for (const name of resumeData.skills.expert) {
      skills.push(
        prisma.skill.create({
          data: {
            name,
            level: "expert",
            resume: { connect: { id: resume.id } },
          },
        })
      );
    }
  }
  if (resumeData.skills?.intermediate) {
    for (const name of resumeData.skills.intermediate) {
      skills.push(
        prisma.skill.create({
          data: {
            name,
            level: "intermediate",
            resume: { connect: { id: resume.id } },
          },
        })
      );
    }
  }
  await Promise.all(skills);

  // Create experiences and achievements
  for (const exp of resumeData.experience) {
    const experience = await prisma.experience.create({
      data: {
        company: exp.company,
        position: exp.position,
        period: exp.period,
        description: exp.description,
        resume: { connect: { id: resume.id } },
      },
    });
    if (exp.achievements && exp.achievements.length > 0) {
      await Promise.all(
        exp.achievements.map((text) =>
          prisma.achievement.create({
            data: { text, experience: { connect: { id: experience.id } } },
          })
        )
      );
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
