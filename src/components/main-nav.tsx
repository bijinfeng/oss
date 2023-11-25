import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export const MainNav = (props: React.HTMLAttributes<HTMLElement>) => {
  const { t } = useTranslation();

  const navList = [
    {
      title: t("gallery"),
      to: "/",
    },
    {
      title: t("photo-album"),
      to: "/albums",
    },
    {
      title: t("upload"),
      to: "/upload",
    },
    {
      title: t("setting"),
      to: "/setting",
    },
  ];

  return (
    <nav
      {...props}
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        props.className
      )}
    >
      {navList.map((navItem) => (
        <NavLink
          key={navItem.to}
          to={navItem.to}
          className={({ isActive }) => {
            return cn("text-sm font-medium text-muted-foreground transition-colors hover:text-primary", { "text-primary": isActive })
          }}
        >
          {navItem.title}
        </NavLink>
      ))}
    </nav>
  );
};
