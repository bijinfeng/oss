import { Link } from "@remix-run/react";

import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";
import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" width={32} height={32} alt="logo" />
          <span className=" font-bold pl-2">OSS Web</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
