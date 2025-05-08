import { cn } from "~/lib/utils";

export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  );
}
