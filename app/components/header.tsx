import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";
import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
