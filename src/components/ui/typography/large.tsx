import { cn } from "~/lib/utils";

export function Large({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}
