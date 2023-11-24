import { Link } from "react-router-dom";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import { Icons } from "./icons";

interface AccountLayoutProps {
  children: ReactNode;
  title: string;
  flotLink: {
    name: string;
    link: string;
  };
}

export const AccountLayout: FC<AccountLayoutProps> = (props) => {
  const { children, title, flotLink } = props;

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to={flotLink.link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        {flotLink.name}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight mb-6">
              {title}
            </h1>

            <div className="grid gap-4 text-left">
              {children}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" asChild>
                  <Link to={`${import.meta.env.VITE_SERVER_HOST}/connect/github`}>
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`${import.meta.env.VITE_SERVER_HOST}/connect/google`}>
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
