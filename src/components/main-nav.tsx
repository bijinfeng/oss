import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export const MainNav = (props: React.HTMLAttributes<HTMLElement>) => {
  // const { t } = useTranslation();

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

  return (
    <nav
      {...props}
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        props.className
      )}
    >
      {navList.map((navItem) => (
        <Link
          key={navItem.to}
          to={navItem.to}
          // "text-sm font-medium transition-colors hover:text-primary"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {navItem.title}
        </Link>
      ))}
    </nav>
  );
};
