import { cn } from "~/lib/utils";

export function JobTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-lg font-medium italic", className)} {...props} />
  );
}
