import { cn } from "~/lib/utils";

export function ListItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}
