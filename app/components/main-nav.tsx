import { NavLink } from "@remix-run/react";

import { cn } from "~/lib/utils";

const navList = [
  {
    title: "Overview",
    to: "/examples/dashboard",
  },
  {
    title: "Customers",
    to: "/examples/dashboard1",
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navList.map((navItem) => (
        <NavLink
          key={navItem.to}
          to={navItem.to}
          className={({ isActive }) =>
            isActive
              ? "text-sm font-medium transition-colors hover:text-primary"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          }
        >
          {navItem.title}
        </NavLink>
      ))}
    </nav>
  );
}
