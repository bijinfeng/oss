import { useState } from "react";

import { AccountLayout } from "~/components/account-layout";
import { SignupForm, type FormValue } from "~/components/signup-form";
import { register } from "~/lib/request";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const Register = () => {
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (value: FormValue) => {
    await register(value);
    setRegistered(true);
  };

  return (
    <AccountLayout
      title="Create new account"
      flotLink={{ name: "Login", link: "/login" }}
    >
      {registered ? (
        <Alert variant="success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <AlertTitle className="text-sm">
            Check your email to confirm
          </AlertTitle>
          <AlertDescription className="text-xs">
            You've successfully signed up. Please check your email to confirm
            your account before signing in to the Supabase dashboard
          </AlertDescription>
        </Alert>
      ) : (
        <SignupForm onSubmit={handleSubmit} />
      )}
    </AccountLayout>
  );
};

export default Register;
