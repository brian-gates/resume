import { Resume as ResumeComponent } from "~/components/resume";
import type { Resume } from "../generated/graphql";
import { getResume } from "./api/get-resume";

export default async function HomePage() {
  const resume: Resume = await getResume();
  return <ResumeComponent {...resume} />;
}
