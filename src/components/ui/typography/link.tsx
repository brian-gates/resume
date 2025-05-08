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
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
