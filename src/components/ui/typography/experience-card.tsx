import { cn } from "~/lib/utils";

export function ExperienceCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-8", className)} {...props} />;
}
