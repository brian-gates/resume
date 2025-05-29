"use server";
import { z } from "zod";
import type { Resume } from "../../generated/graphql";

const SkillSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
});
const AchievementSchema = z.object({
  id: z.string(),
  text: z.string().nullable().optional(),
});
const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  period: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  achievements: z.array(AchievementSchema).nullable().optional(),
});
const ResumeSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  skills: z.array(SkillSchema).nullable().optional(),
  experiences: z.array(ExperienceSchema).nullable().optional(),
});

// Type-level check: will error if not assignable
type _ZodResumeType = z.infer<typeof ResumeSchema>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _AssertResumeTypeIsEqual = _ZodResumeType extends Resume
  ? Resume extends _ZodResumeType
    ? true
    : never
  : never;

export async function getResume() {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        resumes(take: 1) {
          id
          name
          title
          email
          phone
          github
          website
          summary
          skills { id name level }
          experiences {
            id
            company
            position
            period
            description
            achievements { id text }
          }
        }
      }`,
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return ResumeSchema.parse(json?.data?.resumes?.[0]);
}
