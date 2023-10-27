import type { FC, ReactNode } from "react";
import { Link } from "@remix-run/react";

interface ForgetPasswordLayoutProps {
  heading: ReactNode;
  subheading: ReactNode;
  children: ReactNode;
}

export const ForgetPasswordLayout: FC<ForgetPasswordLayoutProps> = ({
  heading,
  subheading,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h3 className="font-semibold tracking-tight text-2xl">{heading}</h3>
        <p className="text-sm text-muted-foreground mb-6">{subheading}</p>

        {children}

        <div className="text-center text-sm text-muted-foreground">
          <span className="mr-1">Already have an account?</span>
          <Link className="underline" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
