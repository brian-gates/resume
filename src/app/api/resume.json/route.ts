import { resumeData } from "~/data/resume";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(resumeData);
}
