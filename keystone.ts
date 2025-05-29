import { config, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, select, text } from "@keystone-6/core/fields";

export default config({
  db: { provider: "sqlite", url: "file:./keystone.db" },
  lists: {
    User: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
        password: password(),
      },
      access: allowAll,
    }),
    Resume: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        title: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true } }),
        phone: text({ validation: { isRequired: true } }),
        github: text(),
        website: text({ validation: { isRequired: true } }),
        summary: text({ ui: { displayMode: "textarea" } }),
        skills: relationship({ ref: "Skill.resume", many: true }),
        experiences: relationship({ ref: "Experience.resume", many: true }),
      },
      access: allowAll,
    }),
    Skill: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        level: select({
          options: [
            { label: "Expert", value: "expert" },
            { label: "Intermediate", value: "intermediate" },
          ],
          validation: { isRequired: true },
        }),
        resume: relationship({ ref: "Resume.skills" }),
      },
      access: allowAll,
    }),
    Experience: list({
      fields: {
        company: text({ validation: { isRequired: true } }),
        position: text({ validation: { isRequired: true } }),
        period: text({ validation: { isRequired: true } }),
        description: text(),
        achievements: relationship({
          ref: "Achievement.experience",
          many: true,
        }),
        resume: relationship({ ref: "Resume.experiences" }),
      },
      access: allowAll,
    }),
    Achievement: list({
      fields: {
        text: text({ validation: { isRequired: true } }),
        experience: relationship({ ref: "Experience.achievements" }),
      },
      access: allowAll,
    }),
  },
});
