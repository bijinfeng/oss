import { Link } from "@remix-run/react";

import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";
import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" width={36} height={36} alt="logo" />
          <span className="text-base pl-2">OSS Web</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
