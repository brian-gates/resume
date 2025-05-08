import { cn } from "~/lib/utils";

export function HeaderContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between items-baseline mb-2",
        className
      )}
      {...props}
    />
  );
}
