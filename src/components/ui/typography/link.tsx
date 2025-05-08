import NextLink from "next/link";
import { cn } from "~/lib/utils";

export function Link({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NextLink>) {
  return (
    <NextLink
      className={cn(
        "font-medium text-primary dark:text-primary underline underline-offset-4 hover:bg-primary/10 dark:hover:bg-primary/30 hover:text-primary dark:hover:text-white rounded px-1 -mx-1 transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
