import { useFetcher, NavLink } from "@remix-run/react";
import { useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useGlobalContext } from "~/lib/global.context";
import { logout } from "~/lib/request";

const navList = [
  {
    title: "图库",
    to: "/",
  },
  {
    title: "相册",
    to: "/albums",
  },
  {
    title: "上传",
    to: "/upload",
  },
  {
    title: "设置",
    to: "/setting",
  },
];

export function UserNav() {
  const fetcher = useFetcher();
  const { userInfo } = useGlobalContext();

  const handleLogout = () => {
    logout();
    fetcher.submit(null, {
      method: "post",
      encType: "application/json",
      action: "/api/logout",
    });
  };

  const avatarUrl = useMemo(() => {
    return `https://source.boringavatars.com/beam/120/${userInfo.username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
  }, [userInfo]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={userInfo.username} />
            <AvatarFallback>{userInfo.username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userInfo.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navList.map((nav) => (
            <NavLink to={nav.to} key={nav.to}>
              <DropdownMenuItem>{nav.title}</DropdownMenuItem>
            </NavLink>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
