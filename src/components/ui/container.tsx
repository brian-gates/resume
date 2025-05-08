import { cn } from "~/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-4xl mx-auto p-8 sm:p-12", className)} {...props}>
      {children}
    </div>
  );
}
