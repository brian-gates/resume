import { cn } from "~/lib/utils";

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("mt-8", className)} {...props} />;
}
