import { Resume } from "~/components/resume";
import { resumeData } from "~/data/resume";

export default function HomePage() {
  return <Resume {...resumeData} />;
}
