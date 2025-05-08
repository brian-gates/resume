import { cn } from "~/lib/utils";

export function Small({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}
