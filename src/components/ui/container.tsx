import { cn } from "~/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background via-accent/5 dark:via-primary/5">
      <div
        className={cn("max-w-4xl mx-auto p-8 sm:p-12", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
